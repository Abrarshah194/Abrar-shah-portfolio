import React, { useEffect, useState } from 'react';
import { Mail, Check, Trash2, Archive, Reply, Eye, Search, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../common/Toast';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import type { ContactMessage } from '../../types';

export const AdminMessages: React.FC = () => {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

  const loadMessages = async () => {
    try {
      const res = await api.getMessages();
      if (res.success && res.data) {
        setMessages(res.data);
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Failed to load messages', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleRead = async (id: string) => {
    try {
      const res = await api.toggleMessageRead(id);
      if (res.success && res.data) {
        setMessages(prev => prev.map(m => (m.id === id ? res.data! : m)));
        if (selectedMessage?.id === id) {
          setSelectedMessage(res.data);
        }
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Failed to update message', 'error');
    }
  };

  const handleToggleArchive = async (id: string) => {
    try {
      const res = await api.toggleMessageArchive(id);
      if (res.success && res.data) {
        setMessages(prev => prev.map(m => (m.id === id ? res.data! : m)));
        showToast('Message archive status updated', 'info');
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Failed to archive message', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await api.deleteMessage(deletingId);
      setMessages(prev => prev.filter(m => m.id !== deletingId));
      if (selectedMessage?.id === deletingId) {
        setSelectedMessage(null);
      }
      setDeletingId(null);
      showToast('Message deleted permanently', 'success');
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Failed to delete message', 'error');
    }
  };

  const filtered = messages.filter(m => {
    if (filter === 'unread' && m.isRead) return false;
    if (filter === 'archived' && !m.isArchived) return false;
    if (filter === 'all' && m.isArchived) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Inbound Messages & Inquiries
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Review and respond to submissions from your contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter tabs */}
          <div className="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-md cursor-pointer ${filter === 'all' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Inbox
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-md cursor-pointer ${filter === 'unread' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter('archived')}
              className={`px-3 py-1.5 rounded-md cursor-pointer ${filter === 'archived' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Archive
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter messages by sender, email, or subject..."
          className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
        />
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs font-mono text-slate-500">
          Loading messages...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
          <Mail className="w-8 h-8 mx-auto text-slate-400 mb-2 opacity-50" />
          <p className="font-semibold text-slate-700 dark:text-slate-300">No messages in this folder.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${
                msg.isRead
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  : 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900'
              }`}
            >
              <div
                className="space-y-1 cursor-pointer flex-1"
                onClick={() => {
                  if (!msg.isRead) handleToggleRead(msg.id);
                  setSelectedMessage(msg);
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {msg.name}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    &lt;{msg.email}&gt;
                  </span>
                  {!msg.isRead && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  )}
                </div>

                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {msg.subject}
                </div>

                <p className="text-xs text-slate-500 line-clamp-1">
                  {msg.message}
                </p>

                <div className="text-[10px] font-mono text-slate-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                  className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
                  title="Reply via Email"
                >
                  <Reply className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => handleToggleRead(msg.id)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                >
                  <Check className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleToggleArchive(msg.id)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  title={msg.isArchived ? 'Unarchive' : 'Archive'}
                >
                  <Archive className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setDeletingId(msg.id)}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message View Modal */}
      {selectedMessage && (
        <Modal
          isOpen={!!selectedMessage}
          onClose={() => setSelectedMessage(null)}
          title={selectedMessage.subject}
          subtitle={`From: ${selectedMessage.name} (${selectedMessage.email}) · ${new Date(selectedMessage.createdAt).toLocaleString()}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            {selectedMessage.phone && (
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono">
                <strong>Phone Number:</strong> {selectedMessage.phone}
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
              {selectedMessage.message}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
              >
                <Reply className="w-4 h-4" />
                <span>Send Email Reply</span>
              </a>

              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Message"
        message="Are you sure you want to permanently delete this message?"
        confirmLabel="Delete Message"
      />
    </div>
  );
};
