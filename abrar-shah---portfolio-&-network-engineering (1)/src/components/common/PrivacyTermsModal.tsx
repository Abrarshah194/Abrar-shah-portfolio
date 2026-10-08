import React, { useState } from 'react';
import { Modal } from './Modal';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyTermsModal: React.FC<PrivacyTermsModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tab === 'privacy' ? 'Privacy Policy' : 'Terms & Disclaimer'}
      subtitle="Abrar Shah · Exporton Networks"
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-sm">
          <button
            onClick={() => setTab('privacy')}
            className={`pb-2 px-3 font-medium transition-colors ${
              tab === 'privacy'
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setTab('terms')}
            className={`pb-2 px-3 font-medium transition-colors ${
              tab === 'terms'
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Terms of Use & Disclaimer
          </button>
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed max-h-96 overflow-y-auto pr-1">
          {tab === 'privacy' ? (
            <>
              <p>
                <strong>Information Collection:</strong> This portfolio website collects personal details (such as your name, email address, phone number, and message content) strictly when you submit them via the contact form.
              </p>
              <p>
                <strong>Usage of Data:</strong> Information submitted via the contact form is stored securely and used solely for communication between you and Abrar Shah regarding networking projects, professional inquiries, and technical collaborations.
              </p>
              <p>
                <strong>Cookies & Local Storage:</strong> This website utilizes browser local storage to preserve your selected theme preference (dark/light mode) and session tokens when authenticated to the administrative dashboard.
              </p>
              <p>
                <strong>Data Protection:</strong> Data is not shared with or sold to third parties. Security practices including password hashing, CORS policies, rate limiting, and parameter validation are enforced.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Professional Disclaimer:</strong> The projects, lab configurations, and technical posts presented on this platform (Exporton Networks) represent educational, experimental, and simulation work carried out by Abrar Shah (BS Computer Science, AWKUM).
              </p>
              <p>
                <strong>Accuracy:</strong> While all technical information, routing commands, and topology architectures are tested in simulated environments (Packet Tracer, GNS3, physical labs), implementations in live production infrastructures should always be verified against official vendor documentation (Cisco, Huawei, etc.).
              </p>
              <p>
                <strong>Intellectual Property:</strong> Portfolio content, custom project code, and visual identities are copyrighted by Abrar Shah (Exporton Networks). All trademarks referenced (Cisco, Huawei, Microsoft, etc.) belong to their respective owners.
              </p>
            </>
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
