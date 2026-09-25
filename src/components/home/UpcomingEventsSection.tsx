'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Sparkles, Calendar } from 'lucide-react';
import { EventJourney } from '@/types';
import { formatDate, generateWhatsappLink } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface UpcomingEventsSectionProps {
  events: EventJourney[];
  whatsappNumber: string;
}

export default function UpcomingEventsSection({
  events,
  whatsappNumber,
}: UpcomingEventsSectionProps) {
  return (
    <section className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <ScrollReveal direction="right">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#F9B82E]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#F9B82E] font-semibold">
                UPCOMING DEPARTURES
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26345C] leading-tight tracking-tight">
              Journeys <br />
              <span className="text-[#303D68]">On the Horizon.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#303D68] hover:text-[#F9B82E] transition-colors pb-1 border-b border-[#303D68]/30 hover:border-[#F9B82E]"
            >
              <span>View All Departure Dates</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Event List */}
        {events.length > 0 ? (
          <div className="divide-y divide-gray-100 border-y border-gray-100">
            {events.slice(0, 4).map((event, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const whatsappHref = generateWhatsappLink(
                whatsappNumber,
                `Hello Majestic Voyages, I would like to inquire about the upcoming journey to ${event.destination} (${event.title}) scheduled for ${formatDate(event.eventDate)}.`
              );

              return (
                <div
                  key={event.id}
                  className="group py-7 sm:py-9 transition-all duration-300 hover:bg-[#F7F8FA] px-2 rounded-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    {/* Index & Destination */}
                    <div className="md:col-span-3 flex items-center gap-4">
                      <span className="font-sans text-2xl font-bold text-gray-200 group-hover:text-[#F9B82E] transition-colors shrink-0">
                        {num}
                      </span>
                      <div>
                        <h3 className="font-sans text-lg sm:text-xl font-bold text-[#303D68] group-hover:text-[#26345C] transition-colors">
                          {event.destination}
                        </h3>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#4A4F5A] font-semibold">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-[#F9B82E]" />
                        <span className="text-xs font-bold text-[#F9B82E] uppercase tracking-wider">
                          {formatDate(event.eventDate)}
                        </span>
                      </div>
                      <span className="text-xs text-[#4A4F5A]">
                        {event.seatsRemaining} seats remaining
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="md:col-span-5">
                      <h4 className="font-sans text-base font-semibold text-[#303D68]">
                        {event.title}
                      </h4>
                      <p className="font-sans text-sm text-[#4A4F5A] mt-1 line-clamp-1 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="md:col-span-2 flex md:justify-end">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#303D68]/20 text-xs font-bold uppercase tracking-wider text-[#303D68] hover:bg-[#303D68] hover:text-white hover:border-[#303D68] transition-all duration-300"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="py-20 px-8 border border-gray-100 rounded-2xl text-center max-w-xl mx-auto bg-[#F7F8FA]">
            <div className="w-14 h-14 rounded-full bg-[#F9B82E]/10 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-6 h-6 text-[#F9B82E]" />
            </div>
            <h3 className="font-sans text-xl font-bold text-[#303D68]">No Active Group Dates</h3>
            <p className="text-sm text-[#4A4F5A] mt-2 leading-relaxed">
              All seasonal group departures have concluded or reached capacity. Our concierge can arrange bespoke private departure dates anytime.
            </p>
            <Link
              href="/tours"
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#F9B82E] hover:underline"
            >
              <span>Explore Private Expeditions &rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
