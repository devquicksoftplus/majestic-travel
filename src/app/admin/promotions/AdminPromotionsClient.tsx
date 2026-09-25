'use client';

import { useState } from 'react';
import { Promotion } from '@/types';
import {
  addPromotionAction,
  activatePromotionAction,
  deletePromotionAction,
} from '@/actions/adminActions';
import { formatPrice } from '@/lib/utils';
import { Sparkles, Check, Trash2, Plus, X } from 'lucide-react';
import AdminImageUpload from '@/components/admin/AdminImageUpload';

interface Props {
  initialPromotions: Promotion[];
}

export default function AdminPromotionsClient({ initialPromotions }: Props) {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [destination, setDestination] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [travelDate, setTravelDate] = useState('October 30');
  const [duration, setDuration] = useState('7 Days / 6 Nights');
  const [price, setPrice] = useState(1899);
  const [originalPrice, setOriginalPrice] = useState(2450);
  const [imageUrl, setImageUrl] = useState('');
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState('');
  const [badge, setBadge] = useState('Featured Voyage of the Month');
  const [formError, setFormError] = useState<string | null>(null);

  const resetForm = () => {
    setDestination('');
    setTagline('');
    setDescription('');
    setTravelDate('October 30');
    setDuration('7 Days / 6 Nights');
    setPrice(1899);
    setOriginalPrice(2450);
    setImageUrl('');
    setCloudinaryPublicId('');
    setBadge('Featured Voyage of the Month');
    setFormError(null);
  };

  const handleActivate = async (id: string) => {
    await activatePromotionAction(id);
    setPromotions(
      promotions.map((p) => ({
        ...p,
        isActive: p.id === id,
      }))
    );
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this promotion? The Cloudinary image will also be removed.')) {
      await deletePromotionAction(id);
      setPromotions(promotions.filter((p) => p.id !== id));
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!imageUrl) {
      setFormError('Please upload an image before saving.');
      return;
    }

    const slug = destination.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    const res = await addPromotionAction({
      destination,
      tagline,
      description,
      travelDate,
      duration,
      price,
      originalPrice,
      imageUrl,
      cloudinaryPublicId: cloudinaryPublicId || null,
      highlights: [
        'VIP Luxury Villa Stay',
        'Private Yacht Charter Excursion',
        'Complimentary 5-Star Dinners',
      ],
      isActive: false,
      slug,
      badge,
    });

    if (res.promo) {
      setPromotions([res.promo, ...promotions]);
    }
    setShowModal(false);
    resetForm();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B38F1E] font-bold">
            Home Page Spotlight
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#26345C] mt-1 tracking-tight">
            MANAGE FEATURED PROMOTIONS
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Click &quot;Set as Active Spotlight&quot; on any promotion below to immediately update the Home Page Section 3.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26345C] hover:bg-[#1E2942] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Create Promotion</span>
        </button>
      </div>

      {/* Grid of promotions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className={`rounded-2xl bg-white border p-6 flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
              promo.isActive
                ? 'border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                : 'border-slate-200/80 hover:border-[#D4AF37]/50'
            }`}
          >
            <div>
              <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={promo.imageUrl} alt={promo.destination} className="w-full h-full object-cover" />
                {promo.isActive && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-3 py-1 text-[10px] font-bold text-[#26345C] uppercase tracking-wider shadow-lg">
                    <Sparkles className="w-3 h-3 fill-[#26345C]" />
                    <span>Active on Home Page</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>{promo.duration}</span>
                <span className="font-sans text-[#B38F1E] font-bold text-sm">
                  {formatPrice(promo.price)}
                </span>
              </div>

              <h3 className="font-sans text-xl text-[#26345C] font-bold">
                {promo.destination}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {promo.tagline}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-2">
              {promo.isActive ? (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Check className="w-3.5 h-3.5" /> Current Spotlight
                </span>
              ) : (
                <button
                  onClick={() => handleActivate(promo.id)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#F9B82E] text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#26345C] transition-all border border-slate-200/80"
                >
                  Set as Active Spotlight
                </button>
              )}

              <button
                onClick={() => handleDelete(promo.id)}
                className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors"
                title="Delete Promotion"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A101D]/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="font-sans text-xl text-[#26345C] font-bold">
                Create Monthly Spotlight Promotion
              </h2>
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                  Destination Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kashmir Paradise Valley"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Experience the beauty of the Himalayas"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Travel Date Label
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. September 30"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Cloudinary image upload – uses folder="monthly-spotlight" */}
              <AdminImageUpload
                value={imageUrl}
                label="Spotlight Image"
                folder="monthly-spotlight"
                titleHint={destination}
                onChange={(url, publicId) => {
                  setImageUrl(url);
                  setCloudinaryPublicId(publicId || '');
                  setFormError(null);
                }}
              />

              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              {formError && (
                <p className="text-rose-700 text-[11px] bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#26345C] hover:bg-[#1E2942] text-white font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  Create Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
