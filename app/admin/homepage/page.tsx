'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore, HomeSectionConfig, HomeSectionId } from '@/context/StoreContext';

export default function AdminHomepageManager() {
  const { sections, moveSection, toggleSection, updateSection, resetSections } = useStore();
  const [editingSection, setEditingSection] = useState<HomeSectionConfig | null>(null);
  const [saveToast, setSaveToast] = useState(false);

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;
    updateSection(editingSection.id, editingSection);
    setEditingSection(null);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const getSectionIcon = (id: HomeSectionId) => {
    switch (id) {
      case 'hero':
        return { icon: 'fa-star', bg: 'bg-[#FEF7EE]', text: 'text-[#B45309]', border: 'border-[#FED7AA]/40' };
      case 'featured_interests':
        return { icon: 'fa-circle-nodes', bg: 'bg-[#F0F5FA]', text: 'text-[#475569]', border: 'border-slate-200/50' };
      case 'auspicious_collections':
        return { icon: 'fa-gem', bg: 'bg-[#F6F2FC]', text: 'text-[#6B21A8]', border: 'border-purple-200/40' };
      case 'prosperity_gifts':
        return { icon: 'fa-gift', bg: 'bg-[#FDF4F0]', text: 'text-[#9A3412]', border: 'border-[#FDBA74]/40' };
      case 'special_gifts':
        return { icon: 'fa-hand-holding-heart', bg: 'bg-[#FAF0F4]', text: 'text-[#9D174D]', border: 'border-rose-200/40' };
      case 'todays_deals':
        return { icon: 'fa-bolt', bg: 'bg-[#FEF7EE]', text: 'text-[#B45309]', border: 'border-[#FED7AA]/40' };
      case 'fashion_guide':
        return { icon: 'fa-video', bg: 'bg-[#F0F7F5]', text: 'text-[#115E59]', border: 'border-teal-200/40' };
      case 'sacred_knowledge':
        return { icon: 'fa-book-open', bg: 'bg-[#F3F4F9]', text: 'text-[#4338CA]', border: 'border-indigo-200/40' };
      default:
        return { icon: 'fa-layer-group', bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200/50' };
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#170E22] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/20 animate-bounce">
          <i className="fa-solid fa-circle-check text-emerald-400 text-lg" />
          <span className="text-sm font-semibold">Homepage section updated successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#A84218] uppercase tracking-wider">
            <i className="fa-solid fa-arrows-up-down" />
            <span>Layout &amp; Position Manager</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Homepage Sections</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Reorder section positions, toggle visibility, and customize titles and banners on the live storefront.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all homepage sections to original positions and titles?')) {
                resetSections();
              }
            }}
            className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-xl border border-gray-200 transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-rotate-left mr-1.5" />
            Reset Layout
          </button>
          <Link
            href="/"
            target="_blank"
            style={{ color: '#ffffff' }}
            className="bg-[#3A1F62] hover:bg-[#2B154C] !text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm no-underline inline-flex items-center gap-2 border border-white/20"
          >
            <i className="fa-solid fa-eye text-amber-300" style={{ color: '#ffffff' }} />
            <span style={{ color: '#ffffff' }}>View Changes Live</span>
          </Link>
        </div>
      </div>

      {/* Sections List with Move Up / Move Down Controls */}
      <div className="flex flex-col gap-3">
        {sections.map((section, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === sections.length - 1;
          const secStyle = getSectionIcon(section.id);

          return (
            <div
              key={section.id}
              className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                section.enabled
                  ? 'border-gray-200 hover:border-gray-300'
                  : 'border-dashed border-gray-300 bg-gray-50/70 opacity-60'
              }`}
            >
              {/* Left Info with Position Badge */}
              <div className="flex items-start sm:items-center gap-3.5">
                {/* Position Badge */}
                <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm shrink-0 border border-gray-200">
                  <span className="text-[9px] text-gray-400 font-normal leading-none uppercase">Pos</span>
                  <span>#{idx + 1}</span>
                </div>

                {/* Section Icon with Very Light Pastel Pill */}
                <div className={`w-10 h-10 rounded-xl ${secStyle.bg} ${secStyle.text} flex items-center justify-center text-base shrink-0 border ${secStyle.border} shadow-2xs`}>
                  <i className={`fa-solid ${secStyle.icon}`} />
                </div>

                {/* Section Titles */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                      {section.name}
                    </h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        section.enabled
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {section.enabled ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate max-w-md sm:max-w-xl mt-0.5">
                    <span className="font-medium text-gray-700">Display Title:</span> &ldquo;{section.title}&rdquo;
                  </p>
                  {section.subtitle && (
                    <p className="text-[11px] text-gray-400 truncate max-w-md sm:max-w-xl">
                      {section.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                {/* Move Up */}
                <button
                  type="button"
                  disabled={isFirst}
                  onClick={() => moveSection(idx, 'up')}
                  title="Move section up"
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                    isFirst
                      ? 'text-gray-300 border-gray-100 cursor-not-allowed bg-gray-50'
                      : 'text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-black cursor-pointer shadow-2xs'
                  }`}
                >
                  <i className="fa-solid fa-arrow-up text-xs" />
                </button>

                {/* Move Down */}
                <button
                  type="button"
                  disabled={isLast}
                  onClick={() => moveSection(idx, 'down')}
                  title="Move section down"
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                    isLast
                      ? 'text-gray-300 border-gray-100 cursor-not-allowed bg-gray-50'
                      : 'text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-black cursor-pointer shadow-2xs'
                  }`}
                >
                  <i className="fa-solid fa-arrow-down text-xs" />
                </button>

                {/* Toggle Show/Hide */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  title={section.enabled ? 'Hide from storefront' : 'Show on storefront'}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                    section.enabled
                      ? 'text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
                      : 'text-gray-400 border-gray-200 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <i
                    className={`fa-solid ${
                      section.enabled ? 'fa-eye' : 'fa-eye-slash'
                    } text-xs`}
                  />
                </button>

                {/* Edit Content */}
                <button
                  type="button"
                  onClick={() => setEditingSection(section)}
                  style={{ color: '#ffffff' }}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#3A1F62] hover:bg-[#2B154C] !text-white shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5 border border-white/15"
                >
                  <i className="fa-solid fa-pen text-[11px]" style={{ color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Edit Content</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Section Modal */}
      {editingSection && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F6F2FC] text-[#6B21A8] flex items-center justify-center border border-purple-200/40 shadow-2xs">
                  <i className="fa-solid fa-sliders text-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    Edit: {editingSection.name}
                  </h3>
                  <span className="text-xs text-gray-400">
                    Customize headlines and CTA targets
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingSection(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-base" />
              </button>
            </div>

            <form onSubmit={handleEditSave} className="flex flex-col gap-4">
              {/* Display Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Section Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingSection.title}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#3A1F62] focus:ring-2 focus:ring-[#3A1F62]/10"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subtitle / Description
                </label>
                <textarea
                  rows={2}
                  value={editingSection.subtitle || ''}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, subtitle: e.target.value })
                  }
                  placeholder="Optional supportive subtext"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#3A1F62] focus:ring-2 focus:ring-[#3A1F62]/10"
                />
              </div>

              {/* CTA Text & Link (Optional for sections that support it) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Button / CTA Text
                  </label>
                  <input
                    type="text"
                    value={editingSection.ctaText || ''}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, ctaText: e.target.value })
                    }
                    placeholder="e.g. Shop Now"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#3A1F62] focus:ring-2 focus:ring-[#3A1F62]/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Button Target Link
                  </label>
                  <input
                    type="text"
                    value={editingSection.ctaLink || ''}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, ctaLink: e.target.value })
                    }
                    placeholder="e.g. /shop?category=..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#3A1F62] focus:ring-2 focus:ring-[#3A1F62]/10"
                  />
                </div>
              </div>

              {/* Visibility Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="section-enabled"
                  checked={editingSection.enabled}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, enabled: e.target.checked })
                  }
                  className="w-4 h-4 text-[#3A1F62] rounded-md border-gray-300 focus:ring-[#3A1F62]"
                />
                <label htmlFor="section-enabled" className="text-xs font-medium text-gray-700 cursor-pointer">
                  Display this section on the live storefront
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ color: '#ffffff' }}
                  className="px-5 py-2 text-xs font-bold bg-[#3A1F62] hover:bg-[#2B154C] !text-white rounded-xl shadow-xs transition-all cursor-pointer border border-white/10"
                >
                  <span style={{ color: '#ffffff' }}>Save Section Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
