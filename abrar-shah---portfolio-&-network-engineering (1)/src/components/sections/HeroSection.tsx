import React from 'react';
import { ArrowRight, FileText, Mail, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { NetworkCanvas } from '../common/NetworkCanvas';
import { usePortfolio } from '../../context/PortfolioContext';

export const HeroSection: React.FC = () => {
  const { data } = usePortfolio();

  const profile = data?.profile;
  const brandName = profile?.brandName || 'EXPORTON NETWORKS';
  const ownerName = profile?.name || 'Abrar Shah';
  const headline = profile?.headline || 'BS Computer Science student passionate about computer networking, network infrastructure, troubleshooting, automation and modern IT technologies.';
  const title = profile?.title || 'Computer Science Student & Networking Enthusiast';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalSkills = data?.skills.length || 27;
  const totalProjects = data?.projects.length || 3;

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Network Canvas Background */}
      <NetworkCanvas />

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-transparent to-slate-50 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Domain Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-xs font-semibold text-blue-700 dark:text-blue-300">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-mono uppercase tracking-wider">{brandName}</span>
              <span className="text-slate-400">·</span>
              <span>AWKUM BS CS (3.87 CGPA)</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Hi, I'm <span className="text-blue-600 dark:text-blue-400">{ownerName}</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 font-mono">
                {title}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {headline}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all hover:gap-3 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('resume')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-sm transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Key Verified Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-xs">
                <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                  {profile?.cgpa || '3.87'}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  BS CS CGPA
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-xs">
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                  Grade A1
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  FSc (918/1100)
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-xs">
                <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                  {totalSkills}+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Technical Skills
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-xs">
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {totalProjects}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Hands-on Projects
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Console & Identity Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Decorative blur backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-lg opacity-25 dark:opacity-35" />

              {/* Terminal / Tech Card */}
              <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                {/* Profile Header with Photo */}
                <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg shrink-0 bg-slate-800">
                    <img
                      src={profile?.avatarUrl || "/abrar-shah.jpg"}
                      alt={ownerName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <span>{ownerName}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for projects" />
                    </div>
                    <div className="text-[11px] text-blue-400 font-mono font-semibold">
                      {brandName} · Network Engineer
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      AWKUM BS CS · CGPA {profile?.cgpa || '3.87'}
                    </div>
                  </div>
                </div>

                {/* Console Header */}
                <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono font-semibold text-slate-400 ml-2">
                      exporton-router#
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>LINK UP (0310-1905776)</span>
                  </div>
                </div>

                {/* Console Body */}
                <div className="p-5 font-mono text-xs space-y-3.5 bg-slate-950 text-slate-200">
                  <div className="text-slate-400">
                    # show network-identity status
                  </div>

                  <div className="space-y-1.5 pl-2 border-l-2 border-blue-500 text-slate-300">
                    <div>
                      <span className="text-blue-400">HOST:</span> {ownerName}
                    </div>
                    <div>
                      <span className="text-blue-400">NETWORK:</span> {brandName}
                    </div>
                    <div>
                      <span className="text-blue-400">DEGREE:</span> BS Computer Science (2023-2027)
                    </div>
                    <div>
                      <span className="text-blue-400">ACADEMIC_CGPA:</span> {profile?.cgpa || '3.87'} / 4.00
                    </div>
                    <div>
                      <span className="text-blue-400">FOCUS:</span> Routing (OSPF), Switching, VLANs, Automation
                    </div>
                  </div>

                  <div className="text-slate-400 pt-1">
                    # verify credentials
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-emerald-400">✓ DIT Diploma</span>
                      <div className="text-slate-400 text-[10px]">753 Marks (Grade A)</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-emerald-400">✓ Driving License</span>
                      <div className="text-slate-400 text-[10px]">LTV Licensed (2 yrs)</div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      <span>Ready for infrastructure tasks</span>
                    </span>
                    <span className="text-blue-400">Area 0.0.0.0</span>
                  </div>
                </div>

                {/* Card Footer Info */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Verified Credentials
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    Babuzai, Katlang, Mardan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
