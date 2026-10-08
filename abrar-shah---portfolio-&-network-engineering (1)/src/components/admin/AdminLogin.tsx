import React, { useState } from 'react';
import { Network, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, User, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToSite }) => {
  const { login, register } = useAuth();
  const { showToast } = useToast();

  // Mode: 'login' or 'register'
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Input states - strictly empty (no default username or password)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (activeTab === 'register') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        setIsLoading(false);
        return;
      }
      if (!email.trim()) {
        setError('Please enter your email address.');
        setIsLoading(false);
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('Password and Confirm Password do not match.');
        setIsLoading(false);
        return;
      }

      try {
        await register({ name: name.trim(), email: email.trim(), password });
        showToast(`Registration successful! Welcome to your CMS, ${name.trim()}.`, 'success');
        onSuccess();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Registration failed. Please try again.';
        setError(msg);
        showToast(msg, 'error');
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!email.trim() || !password) {
        setError('Please enter both email and password.');
        setIsLoading(false);
        return;
      }

      try {
        await login({ email: email.trim(), password });
        showToast('Login successful! Welcome back.', 'success');
        onSuccess();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Invalid credentials. If you have not created an account yet, click "Register New Admin".';
        setError(msg);
        showToast(msg, 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand identity */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-blue-600 text-white items-center justify-center shadow-lg shadow-blue-500/20 mb-2">
            <Network className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase font-mono">
            EXPORTON NETWORKS
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Admin CMS & Content Control Center
          </p>
        </div>

        {/* Auth Container Card */}
        <div className="rounded-2xl bg-slate-800/90 border border-slate-700/80 p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-md">
          {/* Top Segmented Tab Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-900/90 border border-slate-700/70">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setError(null);
              }}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Admin Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setError(null);
              }}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register Admin</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-300 pb-2 border-b border-slate-700/60">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              {activeTab === 'login'
                ? 'Enter your private credentials to sign in'
                : 'Create your private administrator account'}
            </span>
          </div>

          {error && (
            <div className="p-3.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email / Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                  autoComplete={activeTab === 'register' ? 'new-email' : 'email'}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  placeholder={activeTab === 'register' ? 'Minimum 8 characters' : 'Enter your password'}
                  autoComplete={activeTab === 'register' ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {activeTab === 'register' ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>{isLoading ? 'Creating Account...' : 'Register & Open CMS'}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{isLoading ? 'Signing In...' : 'Sign In to Dashboard'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              {activeTab === 'login'
                ? 'Only registered administrators can sign in.'
                : 'Your password is encrypted and securely hashed.'}
            </span>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onBackToSite}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Return to Public Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
