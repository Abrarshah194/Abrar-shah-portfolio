import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Cpu } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useToast } from '../common/Toast';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { api } from '../../services/api';
import type { Skill, SkillCategory } from '../../types';

export const AdminSkills: React.FC = () => {
  const { data, refreshPortfolio } = usePortfolio();
  const { showToast } = useToast();

  const skills = data?.skills || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Skill | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Networking' as SkillCategory,
    proficiency: 85,
    isFeatured: true
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'Networking',
      proficiency: 85,
      isFeatured: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Skill) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      proficiency: item.proficiency,
      isFeatured: item.isFeatured
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.updateSkill(editingItem.id, formData);
        showToast('Skill updated successfully', 'success');
      } else {
        await api.createSkill(formData);
        showToast('Skill created successfully', 'success');
      }
      setIsModalOpen(false);
      await refreshPortfolio();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await api.deleteSkill(deletingId);
      showToast('Skill deleted', 'success');
      setDeletingId(null);
      await refreshPortfolio();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Failed to delete skill', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Technical Skills Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Add or calibrate skills across Networking, Programming, Simulation Tools, Office, and Design.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs"
          >
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {skill.name}
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                {skill.category} · {skill.proficiency}%
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleOpenEdit(skill)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Edit"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeletingId(skill.id)}
                className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Skill' : 'Add Skill'}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. OSPF Routing Protocol"
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as SkillCategory })}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            >
              <option value="Networking">Networking</option>
              <option value="Programming">Programming</option>
              <option value="Tools">Tools</option>
              <option value="Office">Office</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Proficiency Level (%)</span>
              <span className="font-mono text-blue-600 dark:text-blue-400">{formData.proficiency}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={formData.proficiency}
              onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value, 10) })}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isFeaturedSkill"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="isFeaturedSkill" className="text-xs text-slate-700 dark:text-slate-300">
              Highlight as Featured Skill on Home/Hero
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
            >
              {editingItem ? 'Save Changes' : 'Create Skill'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Skill"
        message="Are you sure you want to remove this skill from your catalog?"
        confirmLabel="Delete"
      />
    </div>
  );
};
