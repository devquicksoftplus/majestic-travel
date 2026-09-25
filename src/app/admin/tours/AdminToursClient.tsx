'use client';

import { useState } from 'react';
import { Tour } from '@/types';
import { addTourAction, updateTourAction, deleteTourAction } from '@/actions/adminActions';
import { Plus, Trash2, Edit2, X, Loader2, AlertCircle } from 'lucide-react';
import TourImageUpload from '@/components/admin/TourImageUpload';

interface Props {
  initialTours: Tour[];
}

export default function AdminToursClient({ initialTours }: Props) {
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [showModal, setShowModal] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);

  // Simplified Form state — ONLY:
  // 1. Tour Name / Tour Title (required)
  // 2. Destination Name (required)
  // 3. Category (optional)
  // 4. Theme (optional)
  // 5. Tour Image / Photos (Cloudinary upload)
  // 6. Description / Overview (optional / text)
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState<string>('');
  const [theme, setTheme] = useState<string>('');
  const [imageUrl, setImageUrl] = useState('');
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState<string | null>(null);
  const [overview, setOverview] = useState('');

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const openCreate = () => {
    setEditingTour(null);
    setTitle('');
    setDestination('');
    setCategory('');
    setTheme('');
    setImageUrl('');
    setCloudinaryPublicId(null);
    setOverview('');
    setFormError(null);
    setShowModal(true);
  };

  const openEdit = (tour: Tour) => {
    setEditingTour(tour);
    setTitle(tour.title || '');
    setDestination(tour.destination || '');
    setCategory(tour.category || '');
    setTheme(tour.theme || '');
    setImageUrl(tour.imageUrl || '');
    setCloudinaryPublicId(tour.cloudinaryPublicId || null);
    setOverview(tour.overview || '');
    setFormError(null);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 1. Tour Name is required
    if (!title.trim()) {
      setFormError('Tour Name / Title is required.');
      return;
    }

    // 2. Destination Name is required
    if (!destination.trim()) {
      setFormError('Destination Name is required.');
      return;
    }

    // 3. Image validation
    if (!imageUrl) {
      setFormError('Please upload a tour image before saving.');
      return;
    }

    setIsSaving(true);
    try {
      const slug =
        destination.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

      if (editingTour) {
        const res = await updateTourAction(editingTour.id, {
          title: title.trim(),
          destination: destination.trim(),
          category: category.trim() || null,
          theme: theme.trim() || null,
          imageUrl,
          cloudinaryPublicId,
          overview: overview.trim(),
        });

        if (res.success && res.tour) {
          setTours(tours.map((t) => (t.id === editingTour.id ? res.tour! : t)));
        } else {
          setFormError(res.error || 'Failed to update the tour. Please try again.');
          return;
        }
      } else {
        const res = await addTourAction({
          slug,
          title: title.trim(),
          destination: destination.trim(),
          category: category.trim() || null,
          theme: theme.trim() || null,
          imageUrl,
          cloudinaryPublicId,
          overview: overview.trim(),
          currency: 'USD',
          featured: true,
          isActive: true,
          galleryImages: [imageUrl],
          highlights: ['Private Guided Tours', 'Curated Accommodations'],
          itinerary: [
            {
              day: 1,
              title: 'Arrival & Welcome',
              description: 'Private transfer to luxury accommodation and welcome orientation.',
            },
          ],
          inclusions: ['Premium Accommodations', 'Private Chauffeur Transfers'],
          exclusions: ['Personal Expenses', 'Gratuities'],
          weatherInfo: 'Pleasant year-round conditions.',
          bestTimeToVisit: 'All year round',
        });

        if (res.success && res.tour) {
          setTours([res.tour, ...tours]);
        } else {
          setFormError(res.error || 'Failed to create the tour. Please try again.');
          return;
        }
      }

      setShowModal(false);
    } catch {
      setFormError('An unexpected error occurred while saving. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (tour: Tour) => {
    const confirmMessage = tour.cloudinaryPublicId
      ? `Are you sure you want to delete "${tour.title}"?\n\nThis will remove the tour and delete its image from Cloudinary.`
      : `Are you sure you want to delete "${tour.title}"?`;

    if (!confirm(confirmMessage)) {
      return;
    }

    setGeneralError(null);
    setDeletingId(tour.id);

    try {
      const res = await deleteTourAction(tour.id);

      if (!res.success) {
        const errMsg = res.error || 'Failed to delete tour from Cloudinary or database.';
        setGeneralError(errMsg);
        alert(errMsg);
        return;
      }

      // Successfully removed from Cloudinary and database
      setTours(tours.filter((t) => t.id !== tour.id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during deletion.';
      setGeneralError(msg);
      alert(msg);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B38F1E] font-bold">
            Catalog Management
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#26345C] mt-1 tracking-tight">
            MANAGE TOURS
          </h1>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26345C] hover:bg-[#1E2942] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Tour</span>
        </button>
      </div>

      {generalError && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">Tour / Destination</th>
                <th className="p-4">Category</th>
                <th className="p-4">Theme</th>
                <th className="p-4">Media Asset</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tours.length > 0 ? (
                tours.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-slate-200 bg-slate-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={t.imageUrl}
                            alt={t.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-sans font-bold text-[#26345C] text-sm block">
                            {t.title}
                          </span>
                          <span className="text-[10px] text-[#B38F1E] font-semibold uppercase tracking-wider">
                            {t.destination}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {t.category ? (
                        <span className="rounded-full bg-slate-100 border border-slate-200/80 px-2.5 py-1 text-[10px] font-semibold text-slate-700 uppercase">
                          {t.category}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px] italic">None</span>
                      )}
                    </td>
                    <td className="p-4">
                      {t.theme ? (
                        <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[10px] font-semibold text-[#B38F1E] uppercase">
                          {t.theme}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px] italic">None</span>
                      )}
                    </td>
                    <td className="p-4">
                      {t.cloudinaryPublicId || t.imageUrl?.includes('res.cloudinary.com') ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Cloudinary
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Standard</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(t)}
                          disabled={deletingId === t.id}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-[#F9B82E] text-slate-600 hover:text-[#26345C] transition-colors disabled:opacity-50"
                          title="Edit Tour"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(t)}
                          disabled={deletingId === t.id}
                          className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors disabled:opacity-50"
                          title="Delete Tour"
                        >
                          {deletingId === t.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 text-xs">
                    No tour packages in database. Click &ldquo;Add New Tour&rdquo; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simplified Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A101D]/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="font-sans text-xl text-[#26345C] font-bold">
                {editingTour ? 'Edit Tour Package' : 'Add New Tour Package'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* 1. TOUR TITLE & DESTINATION NAME */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Tour Name <span className="text-[#B38F1E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Assam Wildlife Escape"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Destination Name <span className="text-[#B38F1E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Assam"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              {/* 2. CATEGORY (OPTIONAL) & THEME (OPTIONAL) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Category (Optional)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="">Select Category (Optional)</option>
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Theme (Optional)
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="">Select Theme (Optional)</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Group">Group</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Nature">Nature</option>
                  </select>
                </div>
              </div>

              {/* 3. TOUR PHOTOS / CLOUDINARY IMAGE */}
              <TourImageUpload
                value={imageUrl}
                titleHint={title || destination}
                onChange={(url, publicId) => {
                  setImageUrl(url);
                  if (publicId) {
                    setCloudinaryPublicId(publicId);
                  }
                }}
              />

              {/* 4. DESCRIPTION / OVERVIEW */}
              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                  Description / Overview
                </label>
                <textarea
                  rows={4}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  placeholder="Describe the voyage highlights, sanctuary setting, and guest experience..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              {formError && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px]">
                  <span>⚠ {formError}</span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#26345C] hover:bg-[#1E2942] text-white font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-60"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {isSaving ? 'Saving…' : 'Save Tour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
