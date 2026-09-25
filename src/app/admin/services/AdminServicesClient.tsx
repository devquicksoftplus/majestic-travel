'use client';

import { useState } from 'react';
import { ServiceItem } from '@/types';
import { addServiceAction, updateServiceAction, deleteServiceAction } from '@/actions/adminActions';
import { Plus, Edit2, Trash2, X, Check, Eye, EyeOff, Sparkles, Layers } from 'lucide-react';
import AdminImageUpload from '@/components/admin/AdminImageUpload';

interface Props {
  initialServices: ServiceItem[];
}

const CATEGORY_OPTIONS: Array<ServiceItem['category']> = [
  'Travel Logistics',
  'Tours',
  'Special Travel',
];

export default function AdminServicesClient({ initialServices }: Props) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ServiceItem['category']>('Travel Logistics');
  const [tag, setTag] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [isActive, setIsActive] = useState(true);

  const openCreate = () => {
    setEditingService(null);
    setIsCreating(true);
    setTitle('');
    setCategory('Travel Logistics');
    setTag('Concierge');
    setShortDesc('');
    setFullDesc('');
    setImageUrl('');
    setFeaturesText('');
    setIsActive(true);
  };

  const openEdit = (srv: ServiceItem) => {
    setIsCreating(false);
    setEditingService(srv);
    setTitle(srv.title);
    setCategory(srv.category || 'Travel Logistics');
    setTag(srv.tag || '');
    setShortDesc(srv.shortDesc || '');
    setFullDesc(srv.fullDesc || '');
    setImageUrl(srv.imageUrl || '');
    setFeaturesText(Array.isArray(srv.features) ? srv.features.join('\n') : '');
    setIsActive(srv.isActive !== false);
  };

  const closeModal = () => {
    setEditingService(null);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please provide a service title.');
      return;
    }
    setSaving(true);

    const parsedFeatures = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      if (editingService) {
        // Update existing service
        const res = await updateServiceAction(editingService.id, {
          title: title.trim(),
          category,
          tag: tag.trim() || 'Service',
          shortDesc: shortDesc.trim(),
          fullDesc: fullDesc.trim(),
          imageUrl: imageUrl.trim(),
          features: parsedFeatures,
          isActive,
        });

        if (res.service) {
          setServices((prev) =>
            prev.map((s) => (s.id === editingService.id ? res.service! : s))
          );
        }
      } else {
        // Create new service
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        const res = await addServiceAction({
          title: title.trim(),
          slug,
          category,
          tag: tag.trim() || 'Service',
          shortDesc: shortDesc.trim(),
          fullDesc: fullDesc.trim(),
          iconName: 'Compass',
          imageUrl: imageUrl.trim(),
          features: parsedFeatures,
          isActive,
        });

        if (res.service) {
          setServices((prev) => [res.service!, ...prev]);
        }
      }

      closeModal();
    } catch (err) {
      console.error('Error saving service:', err);
      alert('An error occurred while saving the service. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      const res = await deleteServiceAction(id);
      if (res.success) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert('Failed to delete service.');
      }
    }
  };

  const handleToggleActive = async (srv: ServiceItem) => {
    const nextStatus = !srv.isActive;
    const res = await updateServiceAction(srv.id, { isActive: nextStatus });
    if (res.service) {
      setServices((prev) =>
        prev.map((s) => (s.id === srv.id ? { ...s, isActive: nextStatus } : s))
      );
    }
  };

  const filteredServices = services.filter((s) => {
    if (filterCategory === 'All') return true;
    return s.category === filterCategory;
  });

  return (
    <div className="space-y-8">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B38F1E] font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Concierge Offerings
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#26345C] tracking-tight mt-1">
            MANAGE SERVICES
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, edit, or toggle travel concierge services including Foreign Exchange, flight bookings, and visas.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26345C] hover:bg-[#1E2942] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:shadow active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* ── Category Filter Tabs ── */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4 overflow-x-auto">
        {['All', ...CATEGORY_OPTIONS].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              filterCategory === cat
                ? 'bg-[#26345C] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            {cat} ({cat === 'All' ? services.length : services.filter((s) => s.category === cat).length})
          </button>
        ))}
      </div>

      {/* ── Services Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-300 transition-all group"
          >
            {/* Image Banner if available */}
            {srv.imageUrl && (
              <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={srv.imageUrl}
                  alt={srv.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-slate-200/60">
                  <span className="text-[10px] text-[#26345C] font-bold uppercase tracking-wider">
                    {srv.category}
                  </span>
                </div>
                {srv.tag && (
                  <div className="absolute top-3 right-3 bg-[#D4AF37] text-[#26345C] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {srv.tag}
                  </div>
                )}
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {!srv.imageUrl && (
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#B38F1E] font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                      {srv.category} {srv.tag ? `• ${srv.tag}` : ''}
                    </span>
                  </div>
                )}

                <h3 className="text-lg font-bold text-[#26345C] mb-1.5 group-hover:text-[#B38F1E] transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-3 mb-4">
                  {srv.shortDesc || srv.fullDesc}
                </p>

                {srv.features && srv.features.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-4">
                    {srv.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                        <Check className="w-3.5 h-3.5 text-[#B38F1E] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                    {srv.features.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-medium">
                        +{srv.features.length - 3} more highlights
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                <button
                  type="button"
                  onClick={() => handleToggleActive(srv)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                    srv.isActive !== false
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
                  }`}
                  title="Click to toggle visibility"
                >
                  {srv.isActive !== false ? (
                    <>
                      <Eye className="w-3 h-3" /> Live
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3" /> Hidden
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(srv)}
                    className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-[#26345C] hover:text-white transition-colors"
                    title="Edit Service"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv.id, srv.title)}
                    className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors border border-rose-100"
                    title="Delete Service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Modal for Add New Service & Edit Service ── */}
      {(isCreating || editingService) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A101D]/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-xl font-bold text-[#26345C]">
                {isCreating ? 'Add New Concierge Service' : `Edit "${editingService?.title}"`}
              </h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Foreign Exchange, Helicopter Charters"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ServiceItem['category'])}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Tag / Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Forex, Essential, Premium, Popular"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Cloudinary Image Upload */}
              <AdminImageUpload
                value={imageUrl}
                label="Service Photograph (Cloudinary)"
                folder="services"
                titleHint={title}
                onChange={(url) => setImageUrl(url)}
              />

              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                  Short Description (Card Teaser)
                </label>
                <textarea
                  rows={2}
                  placeholder="Concise 1-2 sentence overview shown on overview cards..."
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                  Full Detailed Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Comprehensive description of the service and value proposition..."
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                  Key Features / Inclusions (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g.&#10;Multi-currency travel forex cards&#10;Live transparent rates&#10;Doorstep currency delivery"
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-50 border-slate-300 text-[#26345C] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isActiveToggle" className="text-slate-700 font-semibold cursor-pointer">
                  Service is Active &amp; Visible on Public Website
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !title.trim()}
                  className="px-6 py-2.5 rounded-xl bg-[#26345C] hover:bg-[#1E2942] text-white font-bold uppercase tracking-wider shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {saving ? 'Saving…' : isCreating ? 'Create Service' : 'Update Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
