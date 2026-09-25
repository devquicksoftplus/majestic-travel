'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { EventJourney } from '@/types';
import { formatDate, formatPrice } from '@/lib/utils';
import {
  X,
  Calendar,
  MapPin,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface EventModalPopupProps {
  events: EventJourney[];
}

export default function EventModalPopup({ events }: EventModalPopupProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter defensively to ensure only active, non-expired events are shown
  const todayStr = new Date().toISOString().split('T')[0];
  const activeEvents = (events || []).filter(
    (ev) => ev.status === 'active' && ev.eventDate >= todayStr
  );

  useEffect(() => {
    if (activeEvents.length === 0) {
      return;
    }

    try {
      // Check if user has already dismissed the popup in this browser session
      const dismissed = sessionStorage.getItem('majestic_event_popup_dismissed');
      if (dismissed === 'true') {
        return;
      }
    } catch {
      // Ignore sessionStorage errors in restricted environments
    }

    // Elegant entrance delay so the user sees the page first before the announcement appears
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 750);

    return () => clearTimeout(timer);
  }, [activeEvents.length]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('majestic_event_popup_dismissed', 'true');
    } catch {
      // Ignore
    }
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? activeEvents.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === activeEvents.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft' && activeEvents.length > 1) {
        setCurrentIndex((prev) => (prev === 0 ? activeEvents.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight' && activeEvents.length > 1) {
        setCurrentIndex((prev) => (prev === activeEvents.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, activeEvents.length]);

  if (!isOpen || activeEvents.length === 0) {
    return null;
  }

  const currentEvent = activeEvents[currentIndex] || activeEvents[0];
  const eventImageUrl = currentEvent.imageUrl || currentEvent.image;
  const hasMultiple = activeEvents.length > 1;

  const navigateToEvents = () => {
    handleClose();
    router.push('/events');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-popup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#0A101D]/75 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg md:max-w-xl bg-white text-[#303D68] rounded-3xl shadow-[0_25px_70px_rgba(38,52,92,0.35)] border border-[#F9B82E]/30 overflow-hidden flex flex-col max-h-[92vh] z-10 transition-all transform scale-100"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close event announcement"
          className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-white/90 md:bg-[#26345C]/80 md:text-white text-[#26345C] hover:bg-[#F9B82E] hover:text-[#26345C] backdrop-blur-md flex items-center justify-center shadow-md transition-all active:scale-95"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Clickable Image Header Container */}
        <div
          onClick={navigateToEvents}
          className="relative w-full aspect-[16/9] sm:aspect-[16/9] bg-slate-900 overflow-hidden cursor-pointer group shrink-0"
          title="Click to view departure details on the Events page"
        >
          {eventImageUrl ? (
            <Image
              src={eventImageUrl}
              alt={currentEvent.title}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#26345C] text-white">
              <Sparkles className="w-12 h-12 text-[#F9B82E]" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A101D]/90 via-[#0A101D]/30 to-transparent pointer-events-none" />

          {/* Badges on Image */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F9B82E] text-[#26345C] text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3 h-3" />
              Special Departure
            </span>
            {currentEvent.category && (
              <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                {currentEvent.category}
              </span>
            )}
          </div>

          {/* Destination & Title on Image for Rich Presentation */}
          <div className="absolute bottom-3 left-3.5 right-3.5 pointer-events-none">
            <div className="flex items-center gap-1.5 text-[#F9B82E] text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{currentEvent.destination}</span>
            </div>
            <h3
              id="event-popup-title"
              className="text-white text-base sm:text-xl font-bold leading-snug drop-shadow-md line-clamp-2"
            >
              {currentEvent.title}
            </h3>
          </div>

          {/* Prev / Next controls on image for multiple events */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous departure"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-[#F9B82E] text-white hover:text-[#26345C] backdrop-blur-sm flex items-center justify-center transition-all z-20 shadow-md active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next departure"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-[#F9B82E] text-white hover:text-[#26345C] backdrop-blur-sm flex items-center justify-center transition-all z-20 shadow-md active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Modal Body & Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col justify-between space-y-4">
          {/* Key Departure Meta Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <Calendar className="w-4 h-4 text-[#F9B82E] shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block leading-none">
                  Date
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#303D68] truncate block mt-0.5">
                  {formatDate(currentEvent.eventDate)}
                </span>
              </div>
            </div>

            {currentEvent.duration && (
              <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Clock className="w-4 h-4 text-[#F9B82E] shrink-0" />
                <div className="overflow-hidden">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block leading-none">
                    Duration
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#303D68] truncate block mt-0.5">
                    {currentEvent.duration}
                  </span>
                </div>
              </div>
            )}

            {currentEvent.seatsRemaining !== undefined && (
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Users className="w-4 h-4 text-[#F9B82E] shrink-0" />
                <div className="overflow-hidden">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block leading-none">
                    Availability
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#303D68] truncate block mt-0.5">
                    {currentEvent.seatsRemaining} of {currentEvent.seatsTotal} seats
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {currentEvent.description && (
            <p
              onClick={navigateToEvents}
              className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed line-clamp-3 cursor-pointer hover:text-slate-800 transition-colors"
            >
              {currentEvent.description}
            </p>
          )}

          {/* Footer Controls: Dots & Navigation Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
            {/* Multiple events counter & dots indicator */}
            {hasMultiple ? (
              <div className="flex items-center gap-2 order-2 sm:order-1">
                <span className="text-[11px] font-semibold text-slate-400">
                  {currentIndex + 1} of {activeEvents.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {activeEvents.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`Go to event ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentIndex
                          ? 'w-5 bg-[#F9B82E]'
                          : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <span className="text-[11px] font-medium text-slate-400 hidden sm:inline order-1">
                Curated by Majestic Voyages
              </span>
            )}

            {/* Actions: View Event & Dismiss */}
            <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                Dismiss
              </button>

              <Link
                href="/events"
                onClick={handleClose}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#26345C] hover:bg-[#1E2942] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span>View Event</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F9B82E]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
