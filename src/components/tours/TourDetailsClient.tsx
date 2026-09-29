'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Check,
  X,
  CloudSun,
  ShieldCheck,
} from 'lucide-react';
import { Tour, SiteSettings } from '@/types';
import { generateWhatsappLink } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface TourDetailsClientProps {
  tour: Tour;
  settings: SiteSettings;
}

export default function TourDetailsClient({ tour, settings }: TourDetailsClientProps) {
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const whatsappHref = generateWhatsappLink(
    settings.whatsappNumber,
    `Hi Majestic Voyages, I am interested in customizing a trip to ${tour.destination}: "${tour.title}". Please help me with customized package details.`
  );

  return (
    <div className="bg-[#F8F3EA] text-[#3A2315]">
      {/* Destination Hero */}
      <section className="relative min-h-[70vh] w-full overflow-hidden flex items-end pb-16 pt-36 bg-[#3A2315] border-b border-slate-200/20">
        <Image
          src={tour.galleryImages?.[activeImageIdx] || tour.imageUrl}
          alt={tour.title}
          fill
          sizes="100vw"
          priority
          className="object-cover transition-all duration-1000 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2315] via-[#3A2315]/60 to-[#3A2315]/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-4xl">
            {/* Meta Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B3C]/10 border border-[#C89B3C]/25 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#C89B3C]" />
              <span className="text-xs uppercase tracking-wider text-[#C89B3C] font-semibold">
                {[tour.category, tour.theme].filter(Boolean).join(' • ') || 'Curated Voyage'}
              </span>
            </div>

            {/* Dominant Destination Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05]">
              {tour.destination.toUpperCase()}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white/90 mt-2">
              {tour.tagline || tour.overview}
            </p>

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 mt-8 pt-6 border-t border-white/15 text-xs text-white/80">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C89B3C] font-semibold block">Duration</span>
                <span className="text-white font-medium text-sm mt-0.5 block">{tour.duration || 'Customized Duration'}</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C89B3C] font-semibold block">Sanctuary</span>
                <span className="text-white font-medium text-sm mt-0.5 block">{tour.destination}</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C89B3C] font-semibold block">Departures</span>
                <span className="text-white font-medium text-sm mt-0.5 block">Choose Your Dates</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C89B3C] font-semibold block">Reviews</span>
                <span className="text-white font-medium text-sm mt-0.5 block">
                  {tour.rating ? `${tour.rating} • ${tour.reviewsCount || 1} Travelers` : 'Exclusive Private Voyage'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sticky Sidebar Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            {/* Overview */}
            <ScrollReveal direction="up">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/10 border border-[#C89B3C]/25 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#C89B3C]" />
                  <span className="text-xs uppercase tracking-wider text-[#3A2315] font-semibold">
                    The Experience
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#3A2315]">
                  OVERVIEW
                </h2>
                <p className="text-[#5B4638] font-normal text-sm sm:text-base leading-relaxed mt-4">
                  {tour.overview}
                </p>
              </div>
            </ScrollReveal>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <ScrollReveal direction="up">
                <div className="p-8 sm:p-10 rounded-3xl border border-[#C89B3C]/20 bg-[#FFFDF8] shadow-sm">
                  <span className="text-xs uppercase tracking-wider text-[#C89B3C] font-semibold block">
                    Exclusive Privileges
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#3A2315] mt-1.5 mb-6">
                    JOURNEY HIGHLIGHTS
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tour.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-[#5B4638] font-normal">
                        <span className="w-2 h-2 rounded-full bg-[#C89B3C] mt-2 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Itinerary Accordion */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <ScrollReveal direction="up">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/10 border border-[#C89B3C]/25 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#C89B3C]" />
                    <span className="text-xs uppercase tracking-wider text-[#3A2315] font-semibold">
                      Curated Schedule
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#3A2315] mb-8">
                    DAY-BY-DAY ITINERARY
                  </h2>

                  <div className="space-y-4">
                    {tour.itinerary.map((day) => {
                      const isOpen = activeDay === day.day;
                      const num = String(day.day).padStart(2, '0');

                      return (
                        <div
                          key={day.day}
                          className="rounded-2xl border border-[#C89B3C]/20 bg-[#FFFDF8] p-6 shadow-xs transition-all duration-300"
                        >
                          <button
                            onClick={() => setActiveDay(isOpen ? null : day.day)}
                            className="w-full text-left flex items-center justify-between gap-4 focus:outline-none"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-xl font-bold text-[#C89B3C]">
                                {num}
                              </span>
                              <h3 className="text-lg sm:text-xl font-bold text-[#3A2315]">
                                {day.title}
                              </h3>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-[#3A2315] transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="pt-4 text-[#5B4638] text-sm font-normal leading-relaxed pl-9"
                              >
                                <p>{day.description}</p>
                                {(day.meals || day.hotel) && (
                                 <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-slate-100 text-xs text-[#5B4638]">
                                    {day.meals && <span className="font-medium">Dining: {day.meals}</span>}
                                    {day.hotel && <span className="font-medium">Sanctuary: {day.hotel}</span>}
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Inclusions & Exclusions */}
            {((tour.inclusions && tour.inclusions.length > 0) || (tour.exclusions && tour.exclusions.length > 0)) && (
              <ScrollReveal direction="up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Inclusions */}
                  {tour.inclusions && tour.inclusions.length > 0 && (
                    <div className="p-8 rounded-3xl border border-[#C89B3C]/20 bg-[#FFFDF8] shadow-xs">
                      <h3 className="text-lg font-bold text-[#3A2315] mb-5 flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-600" />
                        <span>Inclusions</span>
                      </h3>
                      <ul className="space-y-3 text-xs sm:text-sm text-[#5B4638] font-normal">
                        {tour.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] mt-2 shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Exclusions */}
                  {tour.exclusions && tour.exclusions.length > 0 && (
                    <div className="p-8 rounded-3xl border border-[#C89B3C]/20 bg-[#FFFDF8] shadow-xs">
                      <h3 className="text-lg font-bold text-[#5B4638] mb-5 flex items-center gap-2">
                        <X className="w-5 h-5 text-rose-500" />
                        <span>Exclusions</span>
                      </h3>
                      <ul className="space-y-3 text-xs sm:text-sm text-[#5B4638] font-normal">
                        {tour.exclusions.map((exc, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* Climate & Best Time */}
            <ScrollReveal direction="up">
              <div className="p-8 rounded-3xl border border-[#C89B3C]/20 bg-[#FFFDF8] shadow-xs flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#C89B3C]/10 flex items-center justify-center text-[#3A2315] shrink-0">
                  <CloudSun className="w-6 h-6 text-[#3A2315]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#3A2315]">
                    Climate &amp; Seasonality
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B4638] font-normal mt-2 leading-relaxed">
                    {tour.weatherInfo}
                  </p>
                  <p className="text-[#3A2315] text-xs font-semibold mt-3">
                    Recommended Season: {tour.bestTimeToVisit}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Sticky Navy Booking Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-3xl bg-[#3A2315] text-white p-8 sm:p-10 shadow-2xl border border-[#C89B3C]/30">
              <div className="border-b border-[#C89B3C]/20 pb-6 mb-6">
                <span className="text-xs uppercase tracking-wider text-[#C89B3C] font-semibold block">
                  Bespoke Curation
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-white block mt-1">
                  Customized Package
                </span>
                <p className="text-xs text-white/80 font-normal mt-2 leading-relaxed">
                  Tailored around your dates, comfort, and private requirements.
                </p>
              </div>

              <div className="space-y-3 mb-8 text-xs font-normal text-white/85">
                <div className="flex items-center justify-between py-2 border-b border-[#C89B3C]/15">
                  <span className="text-white/70">Travel Dates:</span>
                  <span className="font-semibold text-white">Choose Your Dates</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#C89B3C]/15">
                  <span className="text-white/70">Duration:</span>
                  <span className="font-semibold text-white">Flexible Pace</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#C89B3C]/15">
                  <span className="text-white/70">Group Type:</span>
                  <span className="font-semibold text-white">Private &amp; Family / Group</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#C89B3C]/15">
                  <span className="text-white/70">Concierge:</span>
                  <span className="font-semibold text-[#C89B3C]">Senior Travel Planner</span>
                </div>
              </div>

              {/* WhatsApp Trigger */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-4 px-6 rounded-xl bg-[#3A2315] border border-[#C89B3C] text-white font-semibold text-sm hover:bg-[#5A3A22] hover:shadow-[0_0_20px_rgba(200,155,60,0.35)] transition-all duration-300 shadow-lg active:scale-[0.98]"
              >
                <span>Inquire on WhatsApp</span>
              </a>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/70">
                <ShieldCheck className="w-4 h-4 text-[#C89B3C]" />
                <span>100% Bespoke Private Itinerary</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
