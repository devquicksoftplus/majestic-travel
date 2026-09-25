'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';
import { Tour } from '@/types';
import ScrollReveal from '@/components/ui/ScrollReveal';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { generateWhatsappLink } from '@/lib/utils';

interface DestinationsSectionProps {
  tours: Tour[];
  whatsappNumber?: string;
}

const CARD_SPRING = { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 } as const;

function getCardState(idx: number, activeIdx: number) {
  const offset = idx - activeIdx;
  const absOffset = Math.abs(offset);
  if (absOffset === 0) {
    return { scale: 1, brightness: 1, zIndex: 30, opacity: 1, blur: 0, shadow: '0 0 0 2px #F9B82E, 0 0 32px 4px rgba(249,184,46,0.22), 0 24px 64px -12px rgba(38,52,92,0.55)' };
  }
  if (absOffset === 1) {
    return { scale: 0.88, brightness: 0.52, zIndex: 20, opacity: 0.85, blur: 1.5, shadow: '0 8px 32px -8px rgba(38,52,92,0.35)' };
  }
  if (absOffset === 2) {
    return { scale: 0.78, brightness: 0.35, zIndex: 10, opacity: 0.6, blur: 3, shadow: '0 4px 16px -4px rgba(38,52,92,0.2)' };
  }
  return { scale: 0.7, brightness: 0.22, zIndex: 5, opacity: 0.35, blur: 5, shadow: 'none' };
}

export default function DestinationsSection({ tours, whatsappNumber = '9842801103' }: DestinationsSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const goTo = useCallback(
    (idx: number) => { setActiveIdx(Math.max(0, Math.min(tours.length - 1, idx))); },
    [tours.length]
  );

  const goPrev = () => goTo(activeIdx - 1);
  const goNext = () => goTo(activeIdx + 1);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 48) delta < 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  };

  const activeTour = tours[activeIdx];
  const CARD_W = 340;
  const CARD_GAP = 24;

  if (!tours || tours.length === 0 || !activeTour) {
    return null;
  }

  return (
    <section
      className="relative py-24 lg:py-32 bg-[#F7F8FA] overflow-hidden"
      aria-label="Choose Your Journey"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 80%, rgba(249,184,46,0.07) 0%, transparent 80%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <ScrollReveal direction="right">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#F9B82E]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#F9B82E] font-semibold">DESTINATIONS</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26345C] leading-tight tracking-tight">
              Choose Your <br /><span className="text-[#303D68]">Journey</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="left">
            <Link
              href="/tours"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#303D68] hover:text-[#F9B82E] transition-colors pb-1 border-b border-[#303D68]/30 hover:border-[#F9B82E]"
            >
              <span>View All Destinations</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Active tour info panel */}
        <div className="relative mb-8 min-h-[80px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTour.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F9B82E]" />
                  <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#F9B82E]">
                    {[activeTour.category, activeTour.theme].filter(Boolean).join(' · ') || 'FEATURED VOYAGE'}
                  </span>
                </div>
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#26345C] leading-snug">
                  {activeTour.destination}
                </h3>
                <p className="text-sm text-[#4A4F5A] mt-1 line-clamp-1 max-w-xl">
                  {activeTour.tagline || activeTour.overview}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">

                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#303D68] bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 shadow-sm">
                  <Star className="w-3 h-3 text-[#F9B82E] fill-[#F9B82E]" />
                  {activeTour.rating || 5.0} ({activeTour.reviewsCount || 1})
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cinematic card gallery */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: 'clamp(360px, 50vw, 520px)' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Tour gallery. Use left and right arrow keys to navigate."
        >
          {tours.map((tour, idx) => {
            const state = getCardState(idx, activeIdx);
            const offset = idx - activeIdx;
            const isActive = idx === activeIdx;
            const translateX = offset * (CARD_W + CARD_GAP);

            return (
              <motion.div
                key={tour.id}
                className="absolute top-0 bottom-0 cursor-pointer select-none rounded-2xl overflow-hidden"
                style={{
                  width: CARD_W,
                  zIndex: state.zIndex,
                  boxShadow: state.shadow,
                  outline: isActive ? '2px solid #F9B82E' : '2px solid transparent',
                }}
                animate={
                  prefersReducedMotion
                    ? { x: translateX, opacity: state.opacity }
                    : { x: translateX, scale: state.scale, opacity: state.opacity, filter: `brightness(${state.brightness}) blur(${state.blur}px)` }
                }
                transition={prefersReducedMotion ? { duration: 0 } : CARD_SPRING}
                onClick={() => !isActive && goTo(idx)}
                whileHover={
                  !isActive && !prefersReducedMotion
                    ? { filter: `brightness(${Math.min(state.brightness + 0.12, 0.75)}) blur(0px)` }
                    : undefined
                }
                aria-label={`${isActive ? 'Currently selected: ' : 'Select: '}${tour.destination}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(idx); }
                }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={tour.imageUrl}
                    alt={`Luxury voyage to ${tour.destination}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 340px"
                    className="object-cover"
                    priority={idx < 3}
                    draggable={false}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424]/95 via-[#18233d]/55 to-black/20 pointer-events-none" aria-hidden="true" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" aria-hidden="true" />

                {isActive && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F9B82E]/0 via-[#F9B82E] to-[#F9B82E]/0 pointer-events-none"
                    layoutId="active-accent-bar"
                    transition={CARD_SPRING}
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10 p-5 flex items-start justify-between">
                  <span className="font-sans text-[11px] font-bold tracking-[0.22em] text-[#F9B82E] bg-[#26345C]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#F9B82E]/30">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {tour.category || tour.theme || 'VOYAGE'}
                    </span>
                    <a
                      href={generateWhatsappLink(
                        whatsappNumber,
                        `Hello Majestic Voyages, I am interested in planning a tour to ${tour.destination}. Please share package itinerary and pricing.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow-md active:scale-95 pointer-events-auto"
                      title={`Inquire about ${tour.destination} on WhatsApp`}
                      aria-label={`Inquire about ${tour.destination} on WhatsApp`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <WhatsAppIcon size={14} hasBackground={false} className="w-3.5 h-3.5 fill-white" />
                    </a>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 pt-12">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-3.5 h-[1.5px] bg-[#F9B82E]" />
                    <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#F9B82E]">{tour.destination}</span>
                  </div>
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight leading-snug drop-shadow-md line-clamp-2 mb-3">
                    {tour.title}
                  </h3>

                  <a
                    href={generateWhatsappLink(
                      whatsappNumber,
                      `Hello Majestic Voyages, I am interested in planning a tour to ${tour.destination}. Please share package itinerary and pricing.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366] text-white text-[11px] font-bold tracking-wide hover:bg-[#20ba59] transition-all shadow-md active:scale-95 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <WhatsAppIcon size={14} hasBackground={false} className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation: arrows + dots */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={goPrev}
            disabled={activeIdx === 0}
            className="group flex items-center justify-center w-10 h-10 rounded-full border border-[#303D68]/25 bg-white shadow-sm hover:bg-[#26345C] hover:border-[#26345C] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous destination"
          >
            <ChevronLeft className="w-4 h-4 text-[#303D68] group-hover:text-white transition-colors" />
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Select destination">
            {tours.map((tour, idx) => (
              <button
                key={tour.id}
                onClick={() => goTo(idx)}
                role="tab"
                aria-selected={idx === activeIdx}
                aria-label={`Select ${tour.destination}`}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F9B82E] rounded-full"
              >
                <motion.span
                  className="block rounded-full"
                  animate={
                    idx === activeIdx
                      ? { width: 28, height: 8, backgroundColor: '#F9B82E' }
                      : { width: 8, height: 8, backgroundColor: 'rgba(48,61,104,0.25)' }
                  }
                  transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 28 }}
                />
              </button>
            ))}
          </div>
          <button
            onClick={goNext}
            disabled={activeIdx === tours.length - 1}
            className="group flex items-center justify-center w-10 h-10 rounded-full border border-[#303D68]/25 bg-white shadow-sm hover:bg-[#26345C] hover:border-[#26345C] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next destination"
          >
            <ChevronRight className="w-4 h-4 text-[#303D68] group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Mobile: destination quick-select pills */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:hidden -mx-4 px-4">
          {tours.map((tour, idx) => (
            <button
              key={tour.id}
              onClick={() => goTo(idx)}
              className={`flex-shrink-0 text-xs font-semibold tracking-wide px-3.5 py-2 rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F9B82E] ${
                idx === activeIdx
                  ? 'bg-[#26345C] text-white border-[#26345C] shadow-md'
                  : 'bg-white text-[#303D68] border-[#E5E7EB] hover:border-[#303D68]/50'
              }`}
              aria-current={idx === activeIdx ? 'true' : undefined}
            >
              {tour.destination}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}