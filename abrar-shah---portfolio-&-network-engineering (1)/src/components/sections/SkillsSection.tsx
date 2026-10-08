import React, { useState, useMemo } from 'react';
import { Network, Code, Terminal, FileSpreadsheet, Palette, Check } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { SkillCategory } from '../../types';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const skills = data?.skills || [];

  const categories: { key: string; label: string; icon: React.ReactNode }[] = [
    { key: 'All', label: 'All Domains', icon: null },
    { key: 'Networking', label: 'Networking & Protocols', icon: <Network className="w-3.5 h-3.5" /> },
    { key: 'Programming', label: 'Software & Scripting', icon: <Code className="w-3.5 h-3.5" /> },
    { key: 'Tools', label: 'Network Tools & Simulation', icon: <Terminal className="w-3.5 h-3.5" /> },
    { key: 'Office', label: 'Office Productivity', icon: <FileSpreadsheet className="w-3.5 h-3.5" /> },
    { key: 'Design', label: 'Design & CAD', icon: <Palette className="w-3.5 h-3.5" /> }
  ];

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return skills;
    return skills.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());
  }, [skills, activeCategory]);

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono mb-2">
            02 / Technical Skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical Stack & Applied Disciplines
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Specialized in enterprise computer networking, packet analysis, multi-vendor switching/routing paradigms, and software automation.
          </p>
        </div>

        {/* Category Segmented Tabs (Functional Buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/70 dark:bg-slate-900 rounded-xl mb-10 max-w-fit border border-slate-300/60 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all shadow-xs group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {skill.name}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Quiet unboxed metadata: category and status */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-3 font-mono">
                <span>{skill.category}</span>
                <span aria-hidden="true">·</span>
                <span>{skill.proficiency >= 85 ? 'Advanced Mastery' : skill.proficiency >= 75 ? 'Proficient' : 'Active Learning'}</span>
              </div>

              {/* Progress track */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Networking Study Track Note */}
        <div className="mt-12 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Network className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Cisco & Huawei Certification Curriculum Alignment</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Curriculum focus mirrors Cisco CCNA/CCNP Enterprise and Huawei HCIA routing & switching core topics.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> CCNA Track
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-blue-500" /> CCNP Learning
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-indigo-500" /> Huawei HCIA Path
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
