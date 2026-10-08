import React, { useState, useMemo } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, User, Eye, Search } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Modal } from '../common/Modal';
import type { BlogPost } from '../../types';

interface BlogSectionProps {
  selectedSlug?: string | null;
  onClearSlug?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ selectedSlug, onClearSlug }) => {
  const { data } = usePortfolio();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const blogPosts = data?.blogPosts || [];

  React.useEffect(() => {
    if (selectedSlug) {
      const match = blogPosts.find(b => b.slug === selectedSlug);
      if (match) setSelectedPost(match);
    }
  }, [selectedSlug, blogPosts]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    blogPosts.forEach(b => set.add(b.category));
    return ['All', ...Array.from(set)];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    if (activeCategory !== 'All') {
      posts = posts.filter(p => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return posts;
  }, [blogPosts, activeCategory, searchQuery]);

  return (
    <section id="blog" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono mb-2">
              09 / Technical Articles & Insights
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Network Engineering & Automation Logs
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              Technical breakdowns, protocol analyses, and automation experiments documenting real-world implementation discoveries.
            </p>
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg mb-8 max-w-fit border border-slate-200 dark:border-slate-700">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/9 overflow-hidden bg-slate-800">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-slate-900/80 text-[10px] font-mono text-white backdrop-blur-xs">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  {/* Quiet unboxed metadata */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Clean unboxed tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-x-2 text-[11px] font-mono text-blue-600 dark:text-blue-400 pt-1">
                      {post.tags.map((tag, idx) => (
                        <span key={idx}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-200/60 dark:border-slate-700/60 mt-3 flex items-center justify-between">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <Eye className="w-3 h-3" />
                  <span>{post.views || 0}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <Modal
          isOpen={!!selectedPost}
          onClose={() => {
            setSelectedPost(null);
            if (onClearSlug) onClearSlug();
          }}
          title={selectedPost.title}
          subtitle={`By ${selectedPost.author} · ${new Date(selectedPost.publishedAt).toLocaleDateString()} · ${selectedPost.readTimeMinutes} min read`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img
                src={selectedPost.coverImageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 italic border-l-2 border-blue-600 pl-3">
              {selectedPost.excerpt}
            </div>

            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed whitespace-pre-wrap font-sans">
              {selectedPost.content}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                {selectedPost.tags?.map((t, idx) => (
                  <span key={idx}>#{t}</span>
                ))}
              </div>
              <button
                onClick={() => {
                  setSelectedPost(null);
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
