import React from 'react';
import { GraduationCap, Award, Calendar, Building2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const EducationSection: React.FC = () => {
  const { data } = usePortfolio();
  const education = data?.education || [];

  return (
    <section id="education" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono mb-2">
            05 / Academic Timeline
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education & Technical Qualifications
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            A proven record of academic rigor in Computer Science, natural sciences, and verified technical diplomas.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-blue-500/30 dark:border-blue-500/20 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-8">
          {education.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-4 border-blue-600 dark:border-blue-500 group-hover:scale-125 transition-transform" />

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 p-6 hover:shadow-md transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.degree}
                    </h3>
                  </div>

                  {/* Clean unboxed duration */}
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>{item.startYear} – {item.endYear}</span>
                    {item.isCurrent && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">(In Progress)</span>
                    )}
                  </div>
                </div>

                {/* Institution & Field */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium mb-3">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.institution}</span>
                  </span>
                  {item.fieldOfStudy && (
                    <>
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                      <span>{item.fieldOfStudy}</span>
                    </>
                  )}
                </div>

                {/* Academic Achievement Stats */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-700/60 text-xs">
                  {item.cgpa && (
                    <div className="flex items-center gap-1.5 font-mono text-blue-600 dark:text-blue-400 font-bold">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>CGPA: {item.cgpa} / 4.00</span>
                    </div>
                  )}

                  {item.marks && (
                    <div className="flex items-center gap-1.5 font-mono text-slate-700 dark:text-slate-300">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span>
                        Marks: {item.marks} {item.totalMarks ? `/ ${item.totalMarks}` : ''}
                      </span>
                    </div>
                  )}

                  {item.grade && (
                    <div className="flex items-center gap-1.5 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>{item.grade}</span>
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
