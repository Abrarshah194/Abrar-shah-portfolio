import React, { useState, useMemo } from 'react';
import { Award, ExternalLink, Calendar, Search, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Modal } from '../common/Modal';
import type { Certificate } from '../../types';

export const CertificatesSection: React.FC = () => {
  const { data } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const certificates = data?.certificates || [];

  const filteredCerts = useMemo(() => {
    if (!searchQuery.trim()) return certificates;
    const q = searchQuery.toLowerCase();
    return certificates.filter(
      c =>
        c.title.toLowerCase().includes(q) ||
        c.issuingOrg.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [certificates, searchQuery]);

  return (
    <section id="certificates" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono mb-2">
              07 / Verified Certifications
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Certificates & Diplomas
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              Accredited technical credentials affirming domain competency and government-issued qualifications.
            </p>
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certificates..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/9 overflow-hidden bg-slate-900">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-900/80 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {cert.issuingOrg}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Issued: {cert.issueDate}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 pt-1 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-200/60 dark:border-slate-700/60 mt-3 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  View Credential Details
                </button>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-white transition-colors"
                    title="External Verification"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title={selectedCert.title}
          subtitle={`${selectedCert.issuingOrg} · ${selectedCert.issueDate}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Credential Description & Significance
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedCert.description}
              </p>
            </div>

            {selectedCert.credentialId && (
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Credential ID:</span>
                <span className="font-bold text-slate-800 dark:text-white">{selectedCert.credentialId}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {selectedCert.credentialUrl ? (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Verify at Issuing Body</span>
                </a>
              ) : (
                <span className="text-xs text-slate-400">Physical document on record</span>
              )}
              <button
                onClick={() => setSelectedCert(null)}
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
