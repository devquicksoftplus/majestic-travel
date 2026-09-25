'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import type { Transition } from 'framer-motion';
import { Tour } from '@/types';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { generateWhatsappLink } from '@/lib/utils';

interface ToursCatalogClientProps {
  initialTours: Tour[];
  whatsappNumber?: string;
}

// Predefined order — controls tab ordering when multiple categories are present.
// Do NOT add visibility logic here; visibility is derived from actual tour data.
const CATEGORY_ORDER = [
  'Domestic',
  'International',
  'Adventure',
  'Luxury',
  'Honeymoon',
  'Group',
] as const;

// Helper: normalise a string for case-insensitive comparison
const normalise = (s?: string | null) => (s ? s.trim().toLowerCase() : '');

const CARD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function cardTransition(i: number): Transition {
  return {
    duration: 0.5,
    delay: Math.min(i * 0.06, 0.4), // cap max delay so large grids don't stall
    ease: CARD_EASE,
  };
}

export default function ToursCatalogClient({
  initialTours,
  whatsappNumber = '9842801103',
}: ToursCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // ── Dynamic category tabs ─────────────────────────────────────────────────
  // Collect every category + theme value that actually exists in the tour data,
  // then intersect with CATEGORY_ORDER so the tabs appear in a fixed order.
  // "All" is always prepended. Only tabs with ≥1 tour are rendered.
  const visibleCategories = useMemo(() => {
    // Build a normalised set of all values present in the current tours
    const presentNormalised = new Set<string>();
    for (const tour of initialTours) {
      if (tour.category) presentNormalised.add(normalise(tour.category));
      if (tour.theme)    presentNormalised.add(normalise(tour.theme));
    }

    // Keep CATEGORY_ORDER entries that exist in the tour data
    const ordered = CATEGORY_ORDER.filter((cat) =>
      presentNormalised.has(normalise(cat))
    );

    // Also include any other categories/themes present in tours beyond the default order
    const seen = new Set(ordered.map(normalise));
    const extra: string[] = [];
    for (const tour of initialTours) {
      if (tour.category && !seen.has(normalise(tour.category))) {
        seen.add(normalise(tour.category));
        extra.push(tour.category);
      }
      if (tour.theme && !seen.has(normalise(tour.theme))) {
        seen.add(normalise(tour.theme));
        extra.push(tour.theme);
      }
    }

    // Always prepend "All"
    return ['All', ...ordered, ...extra];
  }, [initialTours]);

  // If the previously selected category tab no longer exists (e.g. after tour
  // deletion), fall back to "All" so the filter never gets stuck.
  const effectiveCategory = visibleCategories.includes(selectedCategory)
    ? selectedCategory
    : 'All';

  // ── Filter logic ──────────────────────────────────────────────────────────
  // Uses normalise() so casing differences in the DB never break matching.
  const filteredTours = initialTours.filter((tour) => {
    const matchesSearch =
      tour.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.overview.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (effectiveCategory === 'All') return true;

    const normSelected = normalise(effectiveCategory);
    // category field covers Domestic / International
    if (normalise(tour.category) === normSelected) return true;
    // theme field covers Adventure / Luxury / Honeymoon / Group / Cultural / Nature
    if (normalise(tour.theme) === normSelected) return true;
    return false;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      {/* ── Search & Category Filter ── */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-200/80">
        {/* Category pills — only rendered when ≥1 tour exists for that category */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full lg:w-auto">
          {visibleCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                effectiveCategory === cat
                  ? 'bg-[#303D68] text-white shadow-sm'
                  : 'bg-white border border-slate-200/80 text-slate-600 hover:text-[#303D68] hover:border-[#303D68]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search destination or tour..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-[#303D68] placeholder-slate-400 text-xs font-medium focus:outline-none focus:border-[#303D68] shadow-sm transition-colors"
          />
        </div>
      </div>

      {/* ── Responsive Tour Grid ── */}
      {filteredTours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {filteredTours.map((tour, idx) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={cardTransition(idx)}
              whileHover={{
                y: -7,
                transition: { duration: 0.28, ease: CARD_EASE },
              }}
              className="group flex flex-col rounded-[22px] overflow-hidden bg-white
                         border border-slate-200/80
                         shadow-[0_4px_20px_-4px_rgba(48,61,104,0.10)]
                         hover:shadow-[0_18px_44px_-8px_rgba(48,61,104,0.22)]
                         hover:border-[#F9B82E]/50
                         transition-shadow duration-500"
            >
              {/* ── Card Image ── */}
              <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0 bg-slate-100">
                <Image
                  src={tour.imageUrl}
                  alt={tour.destination}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  priority={idx < 6}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />

                {/* Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#26345C]/55 via-transparent to-transparent opacity-50 pointer-events-none" />

                {/* Category + Theme badge */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-[0.18em] font-bold text-[#303D68] shadow-sm border border-slate-100/60">
                    {[tour.category, tour.theme].filter(Boolean).join(' • ') || 'FEATURED'}
                  </span>
                </div>

                {/* WhatsApp Quick Icon Button */}
                <a
                  href={generateWhatsappLink(
                    whatsappNumber,
                    `Hello Majestic Voyages, I am interested in booking / planning the ${tour.destination} tour package. Please share details and pricing.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#25D366] text-white shadow-md hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all"
                  title={`Inquire about ${tour.destination} on WhatsApp`}
                  aria-label={`Inquire about ${tour.destination} on WhatsApp`}
                >
                  <WhatsAppIcon size={15} hasBackground={false} className="w-3.5 h-3.5 fill-white" />
                  <span className="text-[10px] font-bold tracking-wider">WhatsApp</span>
                </a>

                {/* Gold accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#F9B82E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* ── Card Content: name + short description + WhatsApp CTA ── */}
              <div className="flex flex-col p-5 flex-1 justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#303D68] uppercase tracking-tight leading-snug mb-2">
                    {tour.destination}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-3">
                    {tour.tagline || tour.overview}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <a
                    href={generateWhatsappLink(
                      whatsappNumber,
                      `Hello Majestic Voyages, I am interested in booking / planning the ${tour.destination} tour package. Please share itinerary, available dates, and pricing.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/30 hover:border-[#25D366] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm group/wa active:scale-[0.98]"
                  >
                    <WhatsAppIcon size={16} hasBackground={true} className="w-4 h-4 shrink-0 transition-transform group-hover/wa:scale-110" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* ── Empty state ── */
        <div className="text-center py-20 rounded-3xl border border-slate-200 bg-white shadow-sm">
          <Filter className="w-10 h-10 text-[#F9B82E] mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-[#303D68]">No Destinations Found</h3>
          <p className="text-sm text-slate-500 mt-2">
            Try adjusting your search query or category filter.
          </p>
        </div>
      )}
    </div>
  );
}
