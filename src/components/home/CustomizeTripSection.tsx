'use client';

import { Check, Calendar, Sliders, Compass, ShieldCheck } from 'lucide-react';
import { generateWhatsappLink } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface CustomizeTripSectionProps {
  whatsappNumber: string;
}

const customizationPoints = [
  {
    icon: Calendar,
    title: 'Choose Your Own Dates',
    desc: 'No fixed schedules. Travel whenever you and your family are ready.',
  },
  {
    icon: Sliders,
    title: 'Custom Duration & Pace',
    desc: 'Spend as few or as many days as you wish at each destination.',
  },
  {
    icon: Compass,
    title: 'Tailored Itineraries',
    desc: 'Sightseeing, adventure, relaxation, or private trails crafted to your preferences.',
  },
  {
    icon: ShieldCheck,
    title: 'Comfort & Budget Matching',
    desc: 'Handpicked hotels, private transport, and meal plans aligned with your budget.',
  },
];

export default function CustomizeTripSection({ whatsappNumber }: CustomizeTripSectionProps) {
  const whatsappHref = generateWhatsappLink(
    whatsappNumber,
    'Hi Majestic Voyages, I would like to design a bespoke customized journey.'
  );

  return (
    <section className="relative py-24 lg:py-32 bg-[#F7F8FA] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9B82E]/15 border border-[#F9B82E]/30 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F9B82E]" />
                <span className="text-xs uppercase tracking-wider text-[#26345C] font-semibold">
                  Bespoke Flexibility &bull; Erode
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#303D68] tracking-tight leading-[1.15]">
                YOUR JOURNEY, <br className="hidden sm:inline" />
                <span className="text-[#F9B82E]">YOUR WAY.</span>
              </h2>
              <p className="text-slate-600 font-normal leading-relaxed mt-5 text-sm sm:text-base max-w-xl">
                Every traveler is unique. At Majestic Voyages, you are never locked into a rigid group schedule or pre-set days. Tell us where you want to go, your preferred dates, duration, and comfort level—and our travel experts will design the perfect customized package for you.
              </p>

              {/* 4 Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                {customizationPoints.map((pt) => {
                  const Icon = pt.icon;
                  return (
                    <div key={pt.title} className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-[#303D68] shrink-0 shadow-xs">
                        <Icon className="w-5 h-5 text-[#303D68]" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#303D68]">
                          {pt.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Premium Navy Concierge Card */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="p-8 sm:p-10 rounded-3xl bg-[#26345C] text-white shadow-2xl relative border border-white/10">
                <span className="text-xs uppercase tracking-wider text-[#F9B82E] font-semibold block">
                  Direct From Erode &bull; Concierge
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  Tailor Your Journey
                </h3>

                <p className="text-sm text-white/80 font-normal mt-3 leading-relaxed">
                  Speak directly with our senior travel planners. Get customized itineraries, hotel recommendations, and best-value quotes for any destination.
                </p>

                <div className="mt-8 space-y-3.5 border-t border-white/15 pt-6 text-sm text-white/90 font-normal">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#F9B82E]/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#F9B82E]" />
                    </div>
                    <span>Zero obligation &amp; personalized curation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#F9B82E]/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#F9B82E]" />
                    </div>
                    <span>Domestic &amp; International destinations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#F9B82E]/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#F9B82E]" />
                    </div>
                    <span>Flights, stays, transfers &amp; sightseeing included</span>
                  </div>
                </div>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full inline-flex items-center justify-center py-4 px-6 rounded-xl bg-[#F9B82E] text-[#26345C] font-semibold text-sm hover:bg-white hover:text-[#26345C] shadow-lg transition-all duration-300 active:scale-[0.98]"
                >
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
