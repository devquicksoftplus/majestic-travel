import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getUpcomingEvents, getSiteSettings } from '@/lib/dataService';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import PageHero from '@/components/ui/PageHero';
import { formatDate, generateWhatsappLink } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Upcoming Expeditions & Departures | Majestic Voyages',
  description: 'Join small-group departures and customized journeys from Erode with Majestic Voyages. Preserved departure dates.',
};

export const revalidate = 0;

export default async function EventsPage() {
  const [upcomingEvents, settings] = await Promise.all([
    getUpcomingEvents(),
    getSiteSettings(),
  ]);

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#303D68]">
      <Navbar settings={settings} />

      <PageHero
        title="JOURNEYS ON THE HORIZON"
        subtitle="Curated departure dates and private group journeys crafted by Majestic Voyages, Erode since 2016."
        tag="Expedition Calendar"
        breadcrumbs={[{ name: 'Events', href: '/events' }]}
        bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        {upcomingEvents.length > 0 ? (
          <div className="space-y-4">
            {upcomingEvents.map((event, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const whatsappHref = generateWhatsappLink(
                settings.whatsappNumber,
                `Hi Majestic Voyages, I would like to enquire about the journey: "${event.title}" on ${formatDate(event.eventDate)}.`
              );

              return (
                <ScrollReveal key={event.id} delay={idx * 0.05} direction="up">
                  <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Index & Destination */}
                      <div className="md:col-span-3 flex items-center gap-4">
                        <span className="text-2xl font-bold text-[#F9B82E]">
                          {num}
                        </span>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-[#303D68] group-hover:text-[#F9B82E] transition-colors">
                            {event.destination}
                          </h3>
                          <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                            {event.category}
                          </span>
                        </div>
                      </div>

                      {/* Date & Seats */}
                      <div className="md:col-span-3">
                        <span className="text-sm font-bold text-[#303D68] block">
                          {formatDate(event.eventDate)}
                        </span>
                        <span className="text-xs text-slate-500 font-normal block mt-0.5">
                          {event.seatsRemaining} of {event.seatsTotal} seats remaining
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="md:col-span-4">
                        <h4 className="text-base font-bold text-[#303D68]">
                          {event.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Inquire Action */}
                      <div className="md:col-span-2 flex md:justify-end">
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#303D68] text-white hover:bg-[#26345C] text-xs font-semibold uppercase tracking-wider shadow-xs transition-all active:scale-[0.98]"
                        >
                          <span>Reserve</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#F9B82E]" />
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          /* Automatic Date Expiry Empty State */
          <div className="py-20 px-8 rounded-3xl border border-slate-200 text-center max-w-xl mx-auto bg-white shadow-xs">
            <Sparkles className="w-10 h-10 text-[#F9B82E] mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-[#303D68]">NO ACTIVE GROUP DATES</h3>
            <p className="text-sm text-slate-500 mt-2 font-normal leading-relaxed">
              All currently scheduled fixed departure journeys have concluded or reached capacity. New seasonal journeys are coming soon.
            </p>
            <p className="text-xs text-slate-400 mt-2 font-normal">
              Our concierge can curate a private bespoke departure for your private group anytime.
            </p>
            <Link
              href="/tours"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F9B82E] text-[#26345C] text-xs font-semibold uppercase tracking-wider hover:bg-[#303D68] hover:text-white transition-all duration-300 shadow-sm"
            >
              <span>Explore Private Tours</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      <Footer settings={settings} />
    </main>
  );
}
