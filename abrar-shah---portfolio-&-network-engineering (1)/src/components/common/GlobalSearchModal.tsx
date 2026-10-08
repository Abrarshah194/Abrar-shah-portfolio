import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { Search, FolderGit2, BookOpen, Award, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (slug: string) => void;
  onSelectBlog?: (slug: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onSelectBlog
}) => {
  const { data } = usePortfolio();
  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (!data || !query.trim()) return { projects: [], blogPosts: [], certificates: [] };
    const q = query.toLowerCase();

    const projects = data.projects.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
    );

    const blogPosts = data.blogPosts.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q))
    );

    const certificates = data.certificates.filter(
      c =>
        c.title.toLowerCase().includes(q) ||
        c.issuingOrg.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );

    return { projects, blogPosts, certificates };
  }, [data, query]);

  const totalResults =
    filteredResults.projects.length +
    filteredResults.blogPosts.length +
    filteredResults.certificates.length;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Search Portfolio" maxWidth="2xl">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, network labs, articles, certifications..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
            autoFocus
          />
        </div>

        {query.trim() === '' ? (
          <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Type keywords like <span className="text-blue-600 dark:text-blue-400 font-mono">OSPF</span>,{' '}
            <span className="text-blue-600 dark:text-blue-400 font-mono">VLAN</span>,{' '}
            <span className="text-blue-600 dark:text-blue-400 font-mono">Python</span>, or{' '}
            <span className="text-blue-600 dark:text-blue-400 font-mono">Packet Tracer</span>.
          </div>
        ) : totalResults === 0 ? (
          <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            No matching items found for "{query}".
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {filteredResults.projects.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5" /> Projects ({filteredResults.projects.length})
                </p>
                <div className="space-y-1.5">
                  {filteredResults.projects.map(proj => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        onClose();
                        if (onSelectProject) onSelectProject(proj.slug);
                        else {
                          const el = document.getElementById('projects');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {proj.title}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {proj.shortDescription}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredResults.blogPosts.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Blog Articles ({filteredResults.blogPosts.length})
                </p>
                <div className="space-y-1.5">
                  {filteredResults.blogPosts.map(post => (
                    <button
                      key={post.id}
                      onClick={() => {
                        onClose();
                        if (onSelectBlog) onSelectBlog(post.slug);
                        else {
                          const el = document.getElementById('blog');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {post.excerpt}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredResults.certificates.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Certificates ({filteredResults.certificates.length})
                </p>
                <div className="space-y-1.5">
                  {filteredResults.certificates.map(cert => (
                    <div
                      key={cert.id}
                      className="p-3 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-left"
                    >
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {cert.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {cert.issuingOrg} · {cert.issueDate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
