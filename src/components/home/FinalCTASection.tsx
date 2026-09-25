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
    <section className="relative py-24 lg:py-32 bg-[#26345C] overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#26345C] via-[#303D68] to-[#26345C]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F9B82E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal direction="up">
          <div className="w-14 h-14 rounded-2xl border border-[#F9B82E]/30 bg-white/10 backdrop-blur-md flex items-center justify-center text-[#F9B82E] mx-auto mb-6 shadow-sm">
            <Compass className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9B82E]/15 border border-[#F9B82E]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#F9B82E]" />
            <span className="text-xs uppercase tracking-wider text-[#F9B82E] font-semibold">
              Where Will You Go Next?
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mt-2 leading-tight tracking-tight">
            YOUR NEXT CHAPTER <br />
            <span className="text-[#F9B82E]">BEGINS HERE.</span>
          </h2>

          <p className="text-white/80 font-normal text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Every itinerary is personalized to your comfort, schedule, and dreams. Reach out directly to our senior travel planners in Erode to start designing.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tours"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#F9B82E] text-[#26345C] font-semibold text-sm hover:bg-white transition-all duration-300 shadow-lg active:scale-[0.98]"
            >
              <span>Explore All Tours</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold text-sm hover:border-[#F9B82E] hover:text-[#F9B82E] hover:bg-white/10 transition-all duration-300 active:scale-[0.98]"
            >
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
