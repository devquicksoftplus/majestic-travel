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
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-2 mb-12">
            <span className="w-6 h-[2px] bg-[#F9B82E]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#F9B82E] font-semibold">
              THIS MONTH&apos;S FEATURED JOURNEY
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Large Feature Image */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="right">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-2xl bg-gray-100">
                <Image
                  src={promotion.imageUrl}
                  alt={promotion.destination}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#26345C]/75 via-transparent to-transparent" />

                {/* Overlaid Label */}
                <div className="absolute bottom-8 left-8 sm:bottom-10 sm:left-10 right-8">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#F9B82E] font-semibold block mb-1">
                    DESTINATION SPOTLIGHT
                  </span>
                  <h3 className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                    {promotion.destination}
                  </h3>
                  <p className="font-sans text-base sm:text-lg text-white/85 mt-1 font-medium">
                    {promotion.tagline}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Detail Card */}
          <div className="lg:col-span-4 lg:-ml-6 relative z-10">
            <ScrollReveal direction="left" delay={0.15}>
              <div className="p-7 sm:p-9 bg-white rounded-2xl border border-gray-100 shadow-xl">
                <div className="border-b border-gray-100 pb-6 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#F9B82E] font-semibold block">
                    Departures &bull; Personalized
                  </span>
                  <h4 className="font-sans text-xl sm:text-2xl font-bold text-[#26345C] mt-2">
                    TRAVEL YOUR WAY
                  </h4>
                  <p className="font-sans text-sm text-[#4A4F5A] mt-3 leading-relaxed">
                    {promotion.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#303D68] font-bold block">
                    Curated Experiences:
                  </span>
                  {promotion.highlights.slice(0, 4).map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-[#4A4F5A]">
                      <Check className="w-4 h-4 text-[#F9B82E] shrink-0 mt-0.5" />
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
                    className="w-full text-center py-3 rounded-lg border border-gray-200 text-xs font-semibold text-[#303D68] hover:border-[#F9B82E] hover:text-[#F9B82E] transition-colors"
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
