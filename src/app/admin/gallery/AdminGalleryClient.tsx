'use client';

import { useState } from 'react';
import { GalleryItem } from '@/types';
import { addGalleryItemAction, deleteGalleryItemAction } from '@/actions/adminActions';
import { Plus, Trash2, X } from 'lucide-react';
import AdminImageUpload from '@/components/admin/AdminImageUpload';

interface Props {
  initialGallery: GalleryItem[];
}

export default function AdminGalleryClient({ initialGallery }: Props) {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('Domestic');
  const [imageUrl, setImageUrl] = useState('');
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'tall' | 'wide' | 'square'>('wide');

  const resetForm = () => {
    setTitle('');
    setLocation('');
    setCategory('Domestic');
    setImageUrl('');
    setCloudinaryPublicId('');
    setAspectRatio('wide');
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Please upload an image before saving.');
      return;
    }
    setSaving(true);
    const res = await addGalleryItemAction({
      title,
      location,
      category,
      imageUrl,
      cloudinaryPublicId: cloudinaryPublicId || undefined,
      aspectRatio,
      featured: true,
    });
    if (res.item) {
      setGallery([res.item, ...gallery]);
    }
    resetForm();
    setSaving(false);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this gallery photo? It will also be removed from Cloudinary permanently.')) {
      await deleteGalleryItemAction(id);
      setGallery(gallery.filter((g) => g.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B38F1E] font-bold">
            Visual Media
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#26345C] mt-1 tracking-tight">
            MANAGE GALLERY
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            All images are uploaded directly to Cloudinary and auto-removed on deletion.
          </p>
        </div>

        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26345C] hover:bg-[#1E2942] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Image</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
          >
            <div className="relative h-48 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 p-2 rounded-lg bg-black/60 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                title="Delete Image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              <span className="text-[10px] text-[#B38F1E] font-bold uppercase tracking-wider block">
                {item.location} &bull; {item.category}
              </span>
              <h3 className="font-sans text-sm text-[#26345C] font-bold truncate mt-1">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A101D]/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="font-sans text-xl text-[#26345C] font-bold">Add Gallery Photo</h2>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                    <option value="Group Expeditions">Group Expeditions</option>
                    <option value="Aerials">Aerials</option>
                    <option value="Travel Moments">Travel Moments</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">Aspect Ratio</label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as typeof aspectRatio)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="wide">Wide</option>
                    <option value="tall">Tall</option>
                    <option value="square">Square</option>
                  </select>
                </div>
              </div>

              {/* Cloudinary image upload — replaces manual URL input */}
              <AdminImageUpload
                value={imageUrl}
                label="Gallery Photo"
                folder="gallery"
                titleHint={title}
                onChange={(url, publicId) => {
                  setImageUrl(url);
                  setCloudinaryPublicId(publicId || '');
                }}
              />

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
                  disabled={saving || !imageUrl}
                  className="px-6 py-2.5 rounded-xl bg-[#26345C] hover:bg-[#1E2942] text-white font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving…' : 'Add Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

