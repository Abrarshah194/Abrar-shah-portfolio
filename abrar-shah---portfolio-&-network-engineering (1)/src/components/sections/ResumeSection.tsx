import React from 'react';
import { Printer, Download, Mail, Phone, MapPin, Award, CheckCircle2, GraduationCap, Briefcase, Network, Code, Wrench, Shield } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ResumeSection: React.FC = () => {
  const { data } = usePortfolio();

  const profile = data?.profile;
  const education = data?.education || [];
  const experience = data?.experience || [];
  const skills = data?.skills || [];
  const projects = data?.projects || [];
  const certificates = data?.certificates || [];

  const handlePrint = () => {
    window.print();
  };

  const ownerName = profile?.name || 'Abrar Shah';
  const brandName = profile?.brandName || 'EXPORTON NETWORKS';

  const networkingSkills = skills.filter(s => s.category === 'Networking');
  const softwareSkills = skills.filter(s => s.category === 'Programming');
  const toolSkills = skills.filter(s => s.category === 'Tools');
  const officeSkills = skills.filter(s => s.category === 'Office');

  return (
    <section id="resume" className="py-20 bg-slate-100 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Print Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 print:hidden">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono mb-1">
              08 / Official Curriculum Vitae
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interactive & Printable Resume
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Formatted according to modern enterprise technology standards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF (A4)</span>
            </button>
          </div>
        </div>

        {/* The Printable A4 Sheet Container */}
        <div
          id="printable-cv"
          className="bg-white text-slate-900 shadow-2xl rounded-2xl border border-slate-200 overflow-hidden print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:rounded-none"
        >
          {/* Header Banner - Inspired by the CV's Navy / Dark Blue & Royal Blue theme */}
          <div className="bg-slate-900 text-white p-8 sm:p-10 border-b-4 border-blue-600">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-blue-500 shadow-md shrink-0 bg-slate-800">
                  <img
                    src={profile?.avatarUrl || "/abrar-shah.jpg"}
                    alt={ownerName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-1">
                  <div className="inline-block px-2.5 py-0.5 rounded bg-blue-600 text-[10px] font-mono uppercase tracking-widest font-bold">
                    {brandName}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase font-mono">
                    {ownerName}
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-blue-400 font-mono tracking-wide">
                    {profile?.title || 'Computer Science Student & Networking Enthusiast'}
                  </p>
                </div>
              </div>

              {/* Direct Contact Bar */}
              <div className="text-xs space-y-1.5 text-slate-300 font-mono">
                {profile?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{profile.email}</span>
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Body Columns */}
          <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (8 cols): Summary, Education, Experience, Projects */}
            <div className="lg:col-span-8 space-y-8">
              {/* Executive Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b-2 border-slate-200 pb-1 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Professional Summary</span>
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed pt-1">
                  {profile?.fullBio || profile?.shortBio}
                </p>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b-2 border-slate-200 pb-1 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Academic Education</span>
                </h3>
                <div className="space-y-3.5 pt-1">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs space-y-1">
                      <div className="flex justify-between items-center font-bold text-slate-900">
                        <span className="text-sm">{edu.degree}</span>
                        <span className="font-mono text-slate-500 font-medium">
                          {edu.startYear} – {edu.endYear}
                        </span>
                      </div>
                      <div className="text-slate-600 font-medium">
                        {edu.institution} {edu.fieldOfStudy ? `· ${edu.fieldOfStudy}` : ''}
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px] text-blue-700">
                        {edu.cgpa && <span className="font-bold">CGPA: {edu.cgpa} / 4.00</span>}
                        {edu.marks && <span>Marks: {edu.marks} {edu.totalMarks ? `/ ${edu.totalMarks}` : ''}</span>}
                        {edu.grade && <span className="font-semibold text-emerald-700">{edu.grade}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b-2 border-slate-200 pb-1 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Practical Experience & Roles</span>
                </h3>
                <div className="space-y-3.5 pt-1">
                  {experience.map((exp) => (
                    <div key={exp.id} className="text-xs space-y-1">
                      <div className="flex justify-between items-center font-bold text-slate-900">
                        <span className="text-sm">{exp.jobTitle}</span>
                        <span className="font-mono text-slate-500 font-medium">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>
                      <div className="text-slate-600">
                        {exp.company} · {exp.location}
                      </div>
                      <p className="text-slate-700 text-[11px] leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Project */}
              {projects.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b-2 border-slate-200 pb-1 flex items-center gap-2">
                    <Network className="w-4 h-4 text-blue-600" />
                    <span>Key Engineering Projects</span>
                  </h3>
                  <div className="space-y-3 pt-1">
                    {projects.slice(0, 2).map((proj) => (
                      <div key={proj.id} className="text-xs space-y-1">
                        <div className="flex justify-between items-center font-bold text-slate-900">
                          <span>{proj.title}</span>
                          <span className="font-mono text-slate-500 text-[11px]">{proj.status}</span>
                        </div>
                        <p className="text-slate-700 text-[11px] leading-relaxed">
                          {proj.shortDescription}
                        </p>
                        <div className="text-[10px] font-mono text-blue-700">
                          {proj.technologies.join(' · ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (4 cols): Skills, Certifications, Credentials, Interests */}
            <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-slate-200 lg:pl-6">
              {/* Networking Core */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1">
                  Networking Competencies
                </h4>
                <div className="space-y-1 text-xs text-slate-800">
                  {networkingSkills.slice(0, 10).map((s) => (
                    <div key={s.id} className="flex justify-between items-center py-0.5">
                      <span>{s.name}</span>
                      <span className="font-mono text-[10px] text-slate-500">{s.proficiency}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Software & Tools */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1">
                  Tools & Simulation
                </h4>
                <div className="flex flex-wrap gap-1 text-[11px] font-mono text-slate-700">
                  {toolSkills.map((t) => (
                    <span key={t.id} className="bg-slate-100 px-2 py-0.5 rounded">
                      {t.name}
                    </span>
                  ))}
                  {softwareSkills.slice(0, 4).map((s) => (
                    <span key={s.id} className="bg-slate-100 px-2 py-0.5 rounded">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Office & CAD */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1">
                  Productivity & Design
                </h4>
                <div className="text-xs text-slate-700 space-y-1">
                  <div>MS Office (Word, Excel, PowerPoint)</div>
                  <div>Adobe Photoshop · AutoCAD</div>
                </div>
              </div>

              {/* Accreditations & Licenses */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1">
                  Licenses & Diplomas
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900">DIT Diploma (2024)</div>
                    <div className="text-[11px] text-slate-600">KP Board · 753 Marks (Grade A)</div>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900">LTV Driving License</div>
                    <div className="text-[11px] text-slate-600">Official License · 2 Yrs Exp</div>
                  </div>
                </div>
              </div>

              {/* Personal Interests */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1">
                  Personal Interests
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enterprise Networking, Technical Reading, Vlog Creation, Traveling & Infrastructure Automation.
                </p>
              </div>
            </div>
          </div>

          {/* Footer of CV */}
          <div className="bg-slate-100 p-4 border-t border-slate-200 text-center text-[10px] text-slate-500 font-mono">
            Generated from {brandName} Official Portfolio Platform · Verified Academic Records
          </div>
        </div>
      </div>
    </section>
  );
};
