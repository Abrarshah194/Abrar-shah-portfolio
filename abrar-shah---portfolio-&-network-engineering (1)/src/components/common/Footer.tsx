import React from 'react';
import { Network, ArrowUp, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, MessageSquare, Facebook, Instagram } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const TikTokIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.28 8.28 0 0 0 4.84 1.54V6.84a4.84 4.84 0 0 1-1.07-.15z"/>
  </svg>
);

interface FooterProps {
  onOpenPrivacyTerms: () => void;
  onNavigateAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyTerms, onNavigateAdmin }) => {
  const { data } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const profile = data?.profile;
  const brandName = profile?.brandName || 'EXPORTON NETWORKS';
  const ownerName = profile?.name || 'Abrar Shah';
  const socialLinks = data?.socialLinks || [];

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'mail':
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'whatsapp':
      case 'messagesquare':
        return <MessageSquare className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'tiktok':
        return <TikTokIcon />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-base font-extrabold tracking-tight text-white uppercase font-mono">
                  {ownerName}
                </span>
                <span className="block text-xs font-semibold tracking-wider text-blue-400 uppercase">
                  {brandName}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Computer Science undergraduate at AWKUM and networking practitioner. Dedicated to resilient enterprise network design, routing protocols, and automated IT infrastructure.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2 pt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors text-slate-400"
                    title={link.label}
                    aria-label={link.label}
                  >
                    {getSocialIcon(link.iconName)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore Portfolio
            </h4>
            <ul className="space-y-2 text-xs">
              {['Home', 'About', 'Skills', 'Services', 'Projects', 'Education', 'Certificates', 'Resume', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-blue-400 transition-colors inline-block py-0.5"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs">
              {profile?.email && (
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors break-all">
                    {profile.email}
                  </a>
                </li>
              )}
              {profile?.phone && (
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <a href={`tel:${profile.phone}`} className="hover:text-white transition-colors">
                    {profile.phone}
                  </a>
                </li>
              )}
              {profile?.location && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{profile.location}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Academic & Professional Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Credentials Summary
            </h4>
            <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs space-y-1.5">
              <div className="text-white font-medium">BS Computer Science (AWKUM)</div>
              <div className="text-blue-400 font-mono font-semibold">CGPA: {profile?.cgpa || '3.87'} · 2023–2027</div>
              <div className="text-slate-400">DIT 2024 (Grade A · 753 Marks)</div>
              <div className="text-slate-400">FSc Pre-Medical (Grade A1 · 918/1100)</div>
              <div className="text-slate-400">Motor Car Driving (LTV Licensed)</div>
            </div>
            <button
              onClick={onNavigateAdmin}
              className="text-[11px] text-blue-400 hover:text-white transition-colors underline block cursor-pointer font-medium"
            >
              CMS Administrator & Portfolio Editor →
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} {ownerName} · {brandName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacyTerms}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy & Legal
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
