import React, { useEffect, useState } from 'react';
import {
  FolderGit2,
  BookOpen,
  Award,
  Mail,
  Cpu,
  Wrench,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { api } from '../../services/api';
import type { AdminTab } from './AdminLayout';
import type { ContactMessage } from '../../types';

interface AdminDashboardProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const [stats, setStats] = useState<{
    totalProjects: number;
    publishedBlogPosts: number;
    totalCertificates: number;
    totalSkills: number;
    totalServices: number;
    totalMessages: number;
    unreadMessages: number;
    recentMessages: ContactMessage[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await api.getAdminStats();
        if (res.success && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xs font-mono text-slate-500">
        Loading dashboard metrics...
      </div>
    );
  }

  const kpis = [
    { label: 'Total Projects', value: stats?.totalProjects || 0, icon: <FolderGit2 className="w-5 h-5" />, tab: 'projects' as AdminTab, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/50' },
    { label: 'Published Articles', value: stats?.publishedBlogPosts || 0, icon: <BookOpen className="w-5 h-5" />, tab: 'blog' as AdminTab, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50' },
    { label: 'Certificates & Diplomas', value: stats?.totalCertificates || 0, icon: <Award className="w-5 h-5" />, tab: 'certificates' as AdminTab, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50' },
    { label: 'Inbound Messages', value: stats?.totalMessages || 0, icon: <Mail className="w-5 h-5" />, badge: stats?.unreadMessages ? `${stats.unreadMessages} New` : null, tab: 'messages' as AdminTab, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50' },
    { label: 'Technical Skills', value: stats?.totalSkills || 0, icon: <Cpu className="w-5 h-5" />, tab: 'skills' as AdminTab, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50' },
    { label: 'Configured Services', value: stats?.totalServices || 0, icon: <Wrench className="w-5 h-5" />, tab: 'services' as AdminTab, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/50' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl border border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-600 text-[10px] font-mono uppercase tracking-wider font-bold">
            EXPORTON NETWORKS · CMS READY
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Administrator Control Center
          </h2>
          <p className="text-xs text-slate-300">
            All updates made across these modules reflect live in the public portfolio instantaneously.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/exporton-networks-portfolio.tar.gz"
            download="exporton-networks-portfolio.tar.gz"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            title="Download full project folder package to push to GitHub"
          >
            <span>Download GitHub Code (tar.gz)</span>
          </a>
          <button
            onClick={() => onNavigateTab('projects')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
          <button
            onClick={() => onNavigateTab('blog')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Blog Post</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {kpis.map((kpi, idx) => (
          <button
            key={idx}
            onClick={() => onNavigateTab(kpi.tab)}
            className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all shadow-xs group cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className={`p-2.5 rounded-lg ${kpi.color}`}>
                {kpi.icon}
              </div>
              {kpi.badge && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-[10px] text-white font-bold font-mono">
                  {kpi.badge}
                </span>
              )}
            </div>

            <div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                {kpi.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 flex items-center justify-between">
                <span>{kpi.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform group-hover:text-blue-600" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Messages & System Quick Check */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Messages */}
        <div className="lg:col-span-7 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Recent Inbound Contact Messages</span>
            </h3>
            <button
              onClick={() => onNavigateTab('messages')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          {stats?.recentMessages && stats.recentMessages.length > 0 ? (
            <div className="space-y-3">
              {stats.recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-lg border text-xs space-y-1.5 transition-colors ${
                    msg.isRead
                      ? 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800'
                      : 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-medium">
                    {msg.subject}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 line-clamp-1">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No inbound messages yet. They will appear here once visitors contact you.
            </div>
          )}
        </div>

        {/* Verification Status */}
        <div className="lg:col-span-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Academic & Profile Status Check</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold block text-slate-800 dark:text-slate-200">AWKUM BS CS Degree</span>
                <span className="text-slate-500 text-[11px]">2023–2027 · CGPA 3.87</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold block text-slate-800 dark:text-slate-200">Technical Diploma (DIT)</span>
                <span className="text-slate-500 text-[11px]">KP Board · Grade A (753 Marks)</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold block text-slate-800 dark:text-slate-200">LTV Driving License</span>
                <span className="text-slate-500 text-[11px]">Official License · 2 Yrs Verified</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold block text-slate-800 dark:text-slate-200">FSc Pre-Medical</span>
                <span className="text-slate-500 text-[11px]">Essar College · 918/1100 (Grade A1)</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
