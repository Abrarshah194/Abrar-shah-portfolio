import React from 'react';
import { Briefcase, Calendar, MapPin, Check } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();
  const experience = data?.experience || [];

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono mb-2">
            06 / Applied Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Practical Experience & Hands-On Roles
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Real-world lab infrastructure experiments, network diagnostics, and field mobility capabilities.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {experience.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.jobTitle}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{item.company}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>{item.startDate} – {item.endDate}</span>
                  {item.isCurrent && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">(Active)</span>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {item.description}
              </p>

              {item.skills && item.skills.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                  {item.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80"
                    >
                      <Check className="w-3 h-3 text-blue-500" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
