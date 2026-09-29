'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import { Promotion } from '@/types';
import { generateWhatsappLink } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PromotionSectionProps {
  promotion: Promotion;
  whatsappNumber: string;
}

export default function PromotionSection({ promotion, whatsappNumber }: PromotionSectionProps) {
  const whatsappHref = generateWhatsappLink(
    whatsappNumber,
    `Hi Majestic Voyages, I would like to explore the featured journey to ${promotion.destination}: "${promotion.tagline}".`
  );

  return (
    <section className="relative py-10 sm:py-16 lg:py-24 xl:py-32 bg-[#F8F3EA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-2 mb-6 lg:mb-10">
            <span className="w-6 h-[2px] bg-[#C89B3C]" />
            <span className="text-xs uppercase tracking-[0.12em] text-[#C89B3C] font-semibold">
              THIS MONTH&apos;S FEATURED JOURNEY
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Large Feature Image */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="right">
              <div className="relative min-h-[220px] aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-2xl bg-[#FFFDF8] border border-[#C89B3C]/20">
                <Image
                  src={promotion.imageUrl}
                  alt={promotion.destination}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A2315]/90 via-[#3A2315]/40 to-transparent" />

                {/* Overlaid Label */}
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-8">
                  <span className="text-xs uppercase tracking-[0.15em] text-[#C89B3C] font-semibold block mb-1">
                    DESTINATION SPOTLIGHT
                  </span>
                  <h3 className="font-sans text-2xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                    {promotion.destination}
                  </h3>
                  <p className="font-sans text-sm sm:text-lg text-white/90 mt-1 font-medium">
                    {promotion.tagline}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Detail Card */}
          <div className="lg:col-span-4 lg:-ml-6 relative z-10">
            <ScrollReveal direction="left" delay={0.15}>
              <div className="p-7 sm:p-9 bg-[#FFFDF8] rounded-3xl border border-[#C89B3C]/20 shadow-xl">
                <div className="border-b border-[#C89B3C]/15 pb-6 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-[#C89B3C] font-semibold block">
                    Departures &bull; Personalized
                  </span>
                  <h4 className="font-sans text-xl sm:text-2xl font-bold text-[#3A2315] mt-2">
                    TRAVEL YOUR WAY
                  </h4>
                  <p className="font-sans text-sm text-[#5B4638] mt-3 leading-relaxed">
                    {promotion.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-xs uppercase tracking-[0.1em] text-[#3A2315] font-bold block">
                    Curated Experiences:
                  </span>
                  {promotion.highlights.slice(0, 4).map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-[#5B4638]">
                      <Check className="w-4 h-4 text-[#C89B3C] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-3 rounded-xl border border-[#C89B3C] text-xs font-semibold text-[#3A2315] hover:bg-[#3A2315] hover:text-white hover:shadow-[0_0_15px_rgba(200,155,60,0.3)] transition-colors"
                  >
                    Inquire via WhatsApp &rarr;
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
