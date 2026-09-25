'use client';

import { useState } from 'react';
import { EventJourney } from '@/types';
import { addEventAction, updateEventAction, deleteEventAction } from '@/actions/adminActions';
import { formatPrice, formatDate } from '@/lib/utils';
import { Plus, Trash2, Edit2, Calendar, Clock, X, Check } from 'lucide-react';
import AdminImageUpload from '@/components/admin/AdminImageUpload';

interface Props {
  initialUpcoming: EventJourney[];
  initialExpired: EventJourney[];
}

export default function AdminEventsClient({ initialUpcoming, initialExpired }: Props) {
  const [upcoming, setUpcoming] = useState<EventJourney[]>(initialUpcoming);
  const [expired, setExpired] = useState<EventJourney[]>(initialExpired);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'expired'>('upcoming');

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventJourney | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [eventDate, setEventDate] = useState('2026-10-01');
  const [image, setImage] = useState('');
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState<string>('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(1500);
  const [duration, setDuration] = useState('7 Days');
  const [seatsTotal, setSeatsTotal] = useState(12);
  const [seatsRemaining, setSeatsRemaining] = useState(6);
  const [category, setCategory] = useState<'Domestic' | 'International'>('Domestic');

  const openCreate = () => {
    setEditingEvent(null);
    setTitle('');
    setDestination('');
    setEventDate('2026-10-15');
    setImage('');
    setCloudinaryPublicId('');
    setDescription('Small-group curated expedition.');
    setPrice(1450);
    setDuration('7 Days');
    setSeatsTotal(12);
    setSeatsRemaining(6);
    setCategory('Domestic');
    setShowModal(true);
  };

  const openEdit = (ev: EventJourney) => {
    setEditingEvent(ev);
    setTitle(ev.title);
    setDestination(ev.destination);
    setEventDate(ev.eventDate);
    setImage(ev.imageUrl || ev.image);
    setCloudinaryPublicId(ev.cloudinaryPublicId || '');
    setDescription(ev.description);
    setPrice(ev.price);
    setDuration(ev.duration);
    setSeatsTotal(ev.seatsTotal);
    setSeatsRemaining(ev.seatsRemaining);
    setCategory(ev.category);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an event image before saving.');
      return;
    }
    setSaving(true);

    if (editingEvent) {
      const res = await updateEventAction(editingEvent.id, {
        title,
        destination,
        eventDate,
        image,
        cloudinaryPublicId: cloudinaryPublicId || undefined,
        description,
        price,
        duration,
        seatsTotal,
        seatsRemaining,
        category,
      });
      if (res.event) {
        const today = new Date().toISOString().split('T')[0];
        const isUp = res.event.eventDate >= today;
        if (isUp) {
          setUpcoming((prev) => [res.event!, ...prev.filter((e) => e.id !== editingEvent.id)]);
          setExpired((prev) => prev.filter((e) => e.id !== editingEvent.id));
        } else {
          setExpired((prev) => [res.event!, ...prev.filter((e) => e.id !== editingEvent.id)]);
          setUpcoming((prev) => prev.filter((e) => e.id !== editingEvent.id));
        }
      }
    } else {
      const res = await addEventAction({
        title,
        destination,
        eventDate,
        image,
        cloudinaryPublicId: cloudinaryPublicId || undefined,
        description,
        price,
        duration,
        seatsTotal,
        seatsRemaining,
        status: 'active',
        category,
        highlights: ['VIP Hotel Stays', 'Private Sightseeing', 'Certified Guide'],
      });
      if (res.event) {
        const today = new Date().toISOString().split('T')[0];
        const isUp = res.event.eventDate >= today;
        if (isUp) {
          setUpcoming([res.event, ...upcoming]);
        } else {
          setExpired([res.event, ...expired]);
        }
      }
    }

    setSaving(false);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this event? Its Cloudinary image will also be permanently removed.')) {
      await deleteEventAction(id);
      setUpcoming(upcoming.filter((e) => e.id !== id));
      setExpired(expired.filter((e) => e.id !== id));
    }
  };

  const currentList = activeTab === 'upcoming' ? upcoming : expired;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B38F1E] font-bold">
            Departure Intelligence
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#26345C] mt-1 tracking-tight">
            MANAGE EVENTS &amp; EXPIRY
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Events with <span className="font-mono text-[#26345C] font-semibold">eventDate &lt; Today</span> automatically expire and disappear from the public website &amp; Home popup.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#26345C] hover:bg-[#1E2942] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 text-[#F9B82E]" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-2xs ${
            activeTab === 'upcoming'
              ? 'bg-[#26345C] text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#F9B82E]" />
          <span>Active Upcoming ({upcoming.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('expired')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-2xs ${
            activeTab === 'expired'
              ? 'bg-rose-600 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Auto-Expired / Past ({expired.length})</span>
        </button>
      </div>

      {/* Events Table */}
      <div className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">Event / Destination</th>
                <th className="p-4">Departure Date</th>
                <th className="p-4">Seats Status</th>
                <th className="p-4">Price</th>
                <th className="p-4">Expiry State</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentList.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-slate-200 bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ev.imageUrl || ev.image}
                          alt={ev.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-sans font-bold text-[#26345C] text-sm block">
                          {ev.title}
                        </span>
                        <span className="text-[10px] text-[#B38F1E] font-semibold uppercase tracking-wider">
                          {ev.destination} ({ev.category})
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-700 font-mono font-medium">
                    {formatDate(ev.eventDate)}
                  </td>
                  <td className="p-4">
                    <span className="text-slate-600 font-semibold">
                      {ev.seatsRemaining} / {ev.seatsTotal} Available
                    </span>
                  </td>
                  <td className="p-4 font-sans text-[#26345C] font-bold text-sm">
                    {formatPrice(ev.price)}
                  </td>
                  <td className="p-4">
                    {activeTab === 'upcoming' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                        <Check className="w-3 h-3" /> Live on Public &amp; Popup
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-1 text-[10px] text-rose-700 font-bold uppercase tracking-wider">
                        <Clock className="w-3 h-3" /> Auto-Hidden (Past)
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(ev)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-[#F9B82E] text-slate-600 hover:text-[#26345C] transition-colors"
                        title="Edit Event"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(ev.id)}
                        className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A101D]/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="font-sans text-xl text-[#26345C] font-bold">
                {editingEvent ? 'Edit Fixed Departure Event' : 'Add Fixed Departure Event'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as 'Domestic' | 'International')}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 7 Days"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    Total Seats
                  </label>
                  <input
                    type="number"
                    value={seatsTotal}
                    onChange={(e) => setSeatsTotal(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
                    Seats Left
                  </label>
                  <input
                    type="number"
                    value={seatsRemaining}
                    onChange={(e) => setSeatsRemaining(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Cloudinary image upload — replaces manual URL input */}
              <AdminImageUpload
                value={image}
                label="Event Image"
                folder="fixed-departure-events"
                titleHint={title}
                onChange={(url, publicId) => {
                  setImage(url);
                  setCloudinaryPublicId(publicId || '');
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
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
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
                  disabled={saving || !image}
                  className="px-6 py-2.5 rounded-xl bg-[#26345C] hover:bg-[#1E2942] text-white font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving…' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
