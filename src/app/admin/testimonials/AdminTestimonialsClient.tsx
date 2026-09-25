'use client';

import { useState } from 'react';
import { Testimonial } from '@/types';
import { addTestimonialAction, deleteTestimonialAction } from '@/actions/adminActions';
import { Star, Plus, Trash2, X, CheckCircle2 } from 'lucide-react';

interface Props {
  initialTestimonials: Testimonial[];
}

export default function AdminTestimonialsClient({ initialTestimonials }: Props) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [destination, setDestination] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
  const [tourDate, setTourDate] = useState('September 2026');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addTestimonialAction({
      name,
      role,
      destination,
      rating,
      review,
      avatarUrl,
      tourDate,
      verified: true,
    });

    if (res.testimonial) {
      setTestimonials([res.testimonial, ...testimonials]);
    }
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this testimonial?')) {
      await deleteTestimonialAction(id);
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B38F1E] font-bold">
            Client Stories
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#26345C] mt-1 tracking-tight">
            MANAGE TESTIMONIALS
          </h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26345C] hover:bg-[#1E2942] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-2xl bg-white border border-slate-200/80 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="font-sans text-sm text-slate-600 italic leading-relaxed">
                “{t.review}”
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37]" />
              <div>
                <h4 className="font-sans text-sm font-bold text-[#26345C]">{t.name}</h4>
                <p className="text-[11px] text-slate-500">{t.role} • {t.destination} ({t.tourDate})</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A101D]/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="font-sans text-xl text-[#26345C] font-bold">Add Testimonial</h2>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">Traveler Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">Role / Location</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">Destination</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">Tour Date</label>
                  <input
                    type="text"
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">Review</label>
                <textarea
                  rows={3}
                  required
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#26345C] hover:bg-[#1E2942] text-white font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
