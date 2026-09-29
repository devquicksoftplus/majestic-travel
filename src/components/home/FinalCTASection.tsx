'use client';

import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { generateWhatsappLink } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface FinalCTASectionProps {
  whatsappNumber: string;
}

export default function FinalCTASection({ whatsappNumber }: FinalCTASectionProps) {
  const whatsappHref = generateWhatsappLink(
    whatsappNumber,
    'Hi Majestic Voyages, I would like to plan a bespoke customized journey.'
  );

  return (
    <section className="relative py-24 lg:py-32 bg-[#3A2315] overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3A2315] via-[#3A2315] to-[#3A2315]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C89B3C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal direction="up">
          <div className="w-14 h-14 rounded-2xl border border-[#C89B3C]/30 bg-white/10 backdrop-blur-md flex items-center justify-center text-[#C89B3C] mx-auto mb-6 shadow-sm">
            <Compass className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C89B3C]" />
            <span className="text-xs uppercase tracking-wider text-[#C89B3C] font-semibold">
              Where Will You Go Next?
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mt-2 leading-tight tracking-tight">
            YOUR NEXT CHAPTER <br />
            <span className="text-[#C89B3C]">BEGINS HERE.</span>
          </h2>

          <p className="text-white/80 font-normal text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Every itinerary is personalized to your comfort, schedule, and dreams. Reach out directly to our senior travel planners in Erode to start designing.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tours"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#5A3A22] border border-[#C89B3C]/60 text-white font-semibold text-sm hover:bg-[#3A2315] hover:border-[#C89B3C] hover:shadow-[0_0_25px_rgba(200,155,60,0.4)] transition-all duration-300 shadow-lg active:scale-[0.98]"
            >
              <span>Explore All Tours</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#C89B3C] bg-white/5 backdrop-blur-sm text-white font-semibold text-sm hover:bg-[#C89B3C]/20 transition-all duration-300 active:scale-[0.98]"
            >
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
