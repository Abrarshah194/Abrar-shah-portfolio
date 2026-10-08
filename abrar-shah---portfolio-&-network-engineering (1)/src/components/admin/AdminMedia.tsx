import React, { useEffect, useState, useRef } from 'react';
import { Upload, Copy, Check, Trash2, Image as ImageIcon, FileText, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../common/Toast';
import { ConfirmDialog } from '../common/ConfirmDialog';
import type { MediaItem } from '../../types';

export const AdminMedia: React.FC = () => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadMedia = async () => {
    try {
      const res = await api.getMedia();
      if (res.success && res.data) {
        setMediaList(res.data);
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Failed to load media items', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('File size exceeds 10MB limit.', 'error');
      return;
    }

    setIsUploading(true);
    try {
      const res = await api.uploadMedia(file);
      if (res.success && res.data) {
        setMediaList(prev => [res.data!, ...prev]);
        showToast('File uploaded successfully to media storage!', 'success');
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Upload failed', 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyUrl = (item: MediaItem) => {
    const fullUrl = window.location.origin + item.url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(item.id);
    showToast('File URL copied to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await api.deleteMedia(deletingId);
      setMediaList(prev => prev.filter(m => m.id !== deletingId));
      showToast('Media file deleted', 'success');
      setDeletingId(null);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Delete failed', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Media & Asset Storage Library
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Upload images, diagrams, topology screenshots, and PDF documents for your projects.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,.pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading File...' : 'Upload File to Server'}</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs font-mono text-slate-500">
          Loading media library...
        </div>
      ) : mediaList.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 space-y-2">
          <ImageIcon className="w-8 h-8 mx-auto text-slate-400 opacity-50" />
          <p className="font-semibold text-slate-700 dark:text-slate-300">No custom files uploaded yet.</p>
          <p className="text-slate-500">Click 'Upload File to Server' above to upload images or PDF documents.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {mediaList.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between shadow-xs group"
            >
              <div className="relative aspect-video bg-slate-800 flex items-center justify-center overflow-hidden">
                {item.mimeType.startsWith('image/') ? (
                  <img src={item.url} alt={item.originalName} className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-8 h-8 text-slate-400" />
                )}
              </div>

              <div className="p-3 space-y-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate" title={item.originalName}>
                  {item.originalName}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {(item.size / 1024).toFixed(1)} KB
                </div>
              </div>

              <div className="p-3 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-1 flex items-center justify-between">
                <button
                  onClick={() => handleCopyUrl(item)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setDeletingId(item.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded"
                  title="Delete file"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Media File"
        message="Are you sure you want to permanently delete this media file from disk?"
        confirmLabel="Delete File"
      />
    </div>
  );
};
