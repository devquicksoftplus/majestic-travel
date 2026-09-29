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
    <main className="min-h-screen bg-[#F8F3EA] text-[#5B4638]">
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
                  <div className="group rounded-3xl border border-[#C89B3C]/20 bg-[#FFFDF8] p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:border-[#C89B3C]/50 hover:-translate-y-1 transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Index & Destination */}
                      <div className="md:col-span-3 flex items-center gap-4">
                        <span className="text-2xl font-bold text-[#C89B3C]">
                          {num}
                        </span>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-[#3A2315] group-hover:text-[#C89B3C] transition-colors">
                            {event.destination}
                          </h3>
                          <span className="text-xs uppercase tracking-wider text-[#5B4638] font-semibold">
                            {event.category}
                          </span>
                        </div>
                      </div>

                      {/* Date & Seats */}
                      <div className="md:col-span-3">
                        <span className="text-sm font-bold text-[#3A2315] block">
                          {formatDate(event.eventDate)}
                        </span>
                        <span className="text-xs text-[#5B4638] font-normal block mt-0.5">
                          {event.seatsRemaining} of {event.seatsTotal} seats remaining
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="md:col-span-4">
                        <h4 className="text-base font-bold text-[#3A2315]">
                          {event.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#5B4638] font-normal mt-1 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Inquire Action */}
                      <div className="md:col-span-2 flex md:justify-end">
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3A2315] border border-[#C89B3C]/40 text-white hover:bg-[#5A3A22] hover:shadow-[0_0_15px_rgba(200,155,60,0.3)] text-xs font-semibold uppercase tracking-wider shadow-xs transition-all active:scale-[0.98]"
                        >
                          <span>Reserve</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#C89B3C]" />
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
          <div className="py-20 px-8 rounded-3xl border border-slate-200 text-center max-w-xl mx-auto bg-[#FFFDF8] shadow-xs">
            <Sparkles className="w-10 h-10 text-[#C89B3C] mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-[#3A2315]">NO ACTIVE GROUP DATES</h3>
            <p className="text-sm text-[#5B4638] mt-2 font-normal leading-relaxed">
              All currently scheduled fixed departure journeys have concluded or reached capacity. New seasonal journeys are coming soon.
            </p>
            <p className="text-xs text-slate-400 mt-2 font-normal">
              Our concierge can curate a private bespoke departure for your private group anytime.
            </p>
            <Link
              href="/tours"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3A2315] border border-[#C89B3C]/40 text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#5A3A22] hover:shadow-[0_0_15px_rgba(200,155,60,0.3)] transition-all duration-300 shadow-sm"
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
