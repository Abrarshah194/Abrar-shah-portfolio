import React, { useState } from 'react';
import { User, Target, Compass, Car, BookOpen, Video, Map, Download, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const [showFullBio, setShowFullBio] = useState(false);

  const profile = data?.profile;
  const brandName = profile?.brandName || 'EXPORTON NETWORKS';
  const ownerName = profile?.name || 'Abrar Shah';

  const scrollToResume = () => {
    const el = document.getElementById('resume');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono mb-2">
            01 / Professional Background
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About Me & Professional Vision
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            A strong balance of computer science foundations, rigorous academic excellence, practical networking exploration, and hands-on operational capability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-blue-600 shadow-md shrink-0 bg-slate-800">
                  <img
                    src={profile?.avatarUrl || "/abrar-shah.jpg"}
                    alt={ownerName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {ownerName}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-mono">
                    {brandName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {profile?.location || 'Village Babuzai, Tehsil Katlang, District Mardan, KPK'}
                  </p>
                </div>
              </div>

              {/* Verified Key Highlights */}
              <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Current Program</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">BS Computer Science</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">University</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">AWKUM (2023–2027)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Current CGPA</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{profile?.cgpa || '3.87'} / 4.00</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <span className="text-slate-500 dark:text-slate-400">Technical Diploma</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">DIT 2024 (Grade A · 753)</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">Driving Qualification</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">LTV Licensed (2 Years)</span>
                </div>
              </div>

              {/* Download CV CTA */}
              <button
                onClick={scrollToResume}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>View & Print Official Resume</span>
              </button>
            </div>

            {/* Personal Interests Box */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Personal Interests & Activities</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                  <span>Reading</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <Video className="w-3.5 h-3.5 text-blue-500" />
                  <span>Vlogging & Video</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <Map className="w-3.5 h-3.5 text-blue-500" />
                  <span>Traveling</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Strategic Goals */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                {profile?.shortBio}
              </p>

              {showFullBio && (
                <div className="space-y-3 pt-2 text-slate-600 dark:text-slate-300 text-sm animate-in fade-in duration-200">
                  <p>
                    {profile?.fullBio}
                  </p>
                  <p>
                    My educational timeline is anchored by rigorous STEM performance: achieving <strong>918/1100 (Grade A1)</strong> in FSc Pre-Medical from Essar College of Sciences Katlang and <strong>868/1100 (Grade A)</strong> in Matriculation from BISE Mardan. Coupled with an intensive 1-year Diploma in Information Technology (DIT 2024, Grade A with 753 marks), I bridge foundational computing principles with enterprise networking architecture.
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{showFullBio ? 'Read Less' : 'Read Full Biography'}</span>
              </button>
            </div>

            {/* Strategic Career Goal Card */}
            <div className="p-5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                <Target className="w-4 h-4" />
                <span>Primary Professional Goal</span>
              </div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-normal">
                {profile?.primaryGoal || 'Build a career in networking, network engineering, IT infrastructure and automation.'}
              </p>
            </div>

            {/* Personal Strengths Grid */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Core Competencies & Personal Strengths
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">Analytical Problem Solver</span>
                    <span className="text-slate-500 dark:text-slate-400">Structured debugging of subnetting, routing tables, and interface connectivity.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">Academic Dedication</span>
                    <span className="text-slate-500 dark:text-slate-400">Consistently top academic tier (3.87 CGPA at AWKUM, Grade A1 in FSc).</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">Real-World Practical Learning</span>
                    <span className="text-slate-500 dark:text-slate-400">Simulation in Packet Tracer and GNS3 with active CCNA/CCNP study tracks.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
                  <Car className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">Reliable Field Mobility</span>
                    <span className="text-slate-500 dark:text-slate-400">Licensed LTV driver (2 years experience) ready for on-site client dispatch.</span>
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
