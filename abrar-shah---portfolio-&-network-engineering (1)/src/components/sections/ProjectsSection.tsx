import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, ArrowRight, Eye, CheckCircle2, Layers } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Modal } from '../common/Modal';
import type { Project } from '../../types';

interface ProjectsSectionProps {
  selectedSlug?: string | null;
  onClearSlug?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ selectedSlug, onClearSlug }) => {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = data?.projects || [];

  // If a slug was passed (e.g. from global search), open it automatically
  React.useEffect(() => {
    if (selectedSlug) {
      const match = projects.find(p => p.slug === selectedSlug);
      if (match) setSelectedProject(match);
    }
  }, [selectedSlug, projects]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => set.add(p.category));
    return ['All', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [projects, activeCategory]);

  const featuredProject = projects.find(p => p.isFeatured && p.slug === 'automated-network-config-monitoring') || projects[0];

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono mb-2">
            04 / Applied Projects & Labs
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Network Architecture & Software Deployments
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Engineered simulations, automation scripts, and full-stack software built to solve real infrastructure bottlenecks.
          </p>
        </div>

        {/* Featured Project Spotlight */}
        {featuredProject && (
          <div className="mb-14 rounded-2xl bg-white dark:bg-slate-900 border border-blue-500/30 dark:border-blue-500/20 shadow-xl overflow-hidden">
            <div className="p-4 sm:p-6 bg-blue-600/5 dark:bg-blue-500/10 border-b border-blue-500/20 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 dark:text-blue-300">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>FEATURED SPOTLIGHT PROJECT</span>
                <span className="text-slate-400">·</span>
                <span className="font-normal text-slate-500 dark:text-slate-400">{featuredProject.status}</span>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {featuredProject.category}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {featuredProject.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {featuredProject.shortDescription}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Key Architectural Capabilities:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                    {featuredProject.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges / Plain typography separated */}
                <div className="pt-3">
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-blue-600 dark:text-blue-400">
                    {featuredProject.technologies.map((t, idx) => (
                      <span key={idx}>
                        {t}{idx < featuredProject.technologies.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedProject(featuredProject)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Project Architecture</span>
                  </button>
                  {featuredProject.githubUrl && (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-video bg-slate-900">
                  <img
                    src={featuredProject.imageUrl}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Tabs (Interactive buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-900 rounded-lg mb-8 max-w-fit border border-slate-300/60 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-800">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-900/80 backdrop-blur-xs text-[10px] font-mono text-white">
                    {project.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                    {project.category}
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {project.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Clean unboxed tech list */}
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i}>
                        {tech}{i < Math.min(project.technologies.length, 4) - 1 ? ' ·' : ''}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-blue-600 dark:text-blue-400">+{project.technologies.length - 4} more</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => {
            setSelectedProject(null);
            if (onClearSlug) onClearSlug();
          }}
          title={selectedProject.title}
          subtitle={`${selectedProject.category} · ${selectedProject.status}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Project Overview & Architecture
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedProject.fullDescription || selectedProject.shortDescription}
              </p>
            </div>

            {selectedProject.features && selectedProject.features.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Technical Features & Deliverables
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Technologies & Tools Applied
              </h4>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                {selectedProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links footer (Hidden if links not configured) */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-800 text-xs font-semibold"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Simulation</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedProject(null);
                  if (onClearSlug) onClearSlug();
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
