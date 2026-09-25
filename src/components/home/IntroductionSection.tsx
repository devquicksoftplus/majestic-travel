'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SiteSettings } from '@/types';

interface IntroductionSectionProps {
  settings?: SiteSettings;
}

export default function IntroductionSection({ settings }: IntroductionSectionProps) {
  const expYears = settings?.experienceYears ?? 9;
  const travelers = settings?.happyTravelers ?? 5000;
  const destinations = settings?.destinationsCount ?? 14;
  const satisfaction = settings?.satisfactionRate ?? 99;

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with subtle gold badge */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="right">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden border border-gray-100 shadow-xl bg-gray-50">
                <Image
                  src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=85"
                  alt="Majestic Voyages Journey"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Floating Experience Badge */}
                <div className="absolute bottom-6 left-6 rounded-xl bg-white/95 backdrop-blur-md px-5 py-3 border border-gray-200/80 shadow-lg">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#F9B82E] block">
                    Majestic Voyages
                  </span>
                  <span className="font-sans text-sm font-bold text-[#303D68]">
                    Established 2016
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-[2px] bg-[#F9B82E]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#F9B82E] font-bold">
                  ABOUT MAJESTIC VOYAGES
                </span>
              </div>

              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-[#303D68] tracking-tight leading-tight">
                YOUR JOURNEY <br />
                <span className="text-[#303D68]">STARTS HERE</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-[#4A4F5A] mt-6 leading-relaxed font-normal">
                Established in 2016 in Erode, Tamil Nadu, Majestic Voyages crafts personalized travel packages for families, couples, and groups. We believe every trip should be customized around your dates, comfort, and schedule—never locked into rigid timetables.
              </p>

              {/* 3 bullet points */}
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#303D68] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#F9B82E] shrink-0" />
                  <span>Handcrafted itineraries for domestic & international destinations</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#303D68] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#F9B82E] shrink-0" />
                  <span>Handpicked hotels, vetted stays & premium local guidance</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#303D68] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#F9B82E] shrink-0" />
                  <span>24/7 dedicated personal support from our Erode concierge team</span>
                </div>
              </div>

              {/* Statistics Counters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-gray-100">
                <div>
                  <span className="font-sans text-3xl sm:text-4xl font-bold text-[#303D68] block">
                    {expYears}+
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#4A4F5A] mt-1 block font-medium">
                    Years Experience
                  </span>
                </div>

                <div>
                  <span className="font-sans text-3xl sm:text-4xl font-bold text-[#F9B82E] block">
                    {travelers.toLocaleString()}+
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#4A4F5A] mt-1 block font-medium">
                    Happy Travelers
                  </span>
                </div>

                <div>
                  <span className="font-sans text-3xl sm:text-4xl font-bold text-[#303D68] block">
                    {destinations}+
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#4A4F5A] mt-1 block font-medium">
                    Destinations
                  </span>
                </div>

                <div>
                  <span className="font-sans text-3xl sm:text-4xl font-bold text-[#F9B82E] block">
                    {satisfaction}%
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#4A4F5A] mt-1 block font-medium">
                    Satisfaction
                  </span>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#303D68] hover:text-[#F9B82E] transition-colors"
                >
                  <span>DISCOVER OUR FULL STORY</span>
                  <ArrowRight className="w-4 h-4 text-[#F9B82E]" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
