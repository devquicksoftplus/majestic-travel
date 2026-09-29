'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, Globe } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function SplitExperienceSection() {
  const [activeSide, setActiveSide] = useState<'domestic' | 'international' | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-[#F8F3EA] overflow-hidden border-b border-[#C89B3C]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        <ScrollReveal direction="up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C89B3C]" />
            <span className="text-xs uppercase tracking-wider text-[#3A2315] font-semibold">
              Two Distinct Realms &bull; Curated Expeditions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3A2315] tracking-tight">
            Choose Your <span className="text-[#C89B3C]">Horizon</span>
          </h2>
        </ScrollReveal>
      </div>

      {/* Full-Width / Container Visual Composition */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[520px] lg:min-h-[580px]">
          {/* Domestic Half */}
          <Link
            href="/tours?category=Domestic"
            onMouseEnter={() => setActiveSide('domestic')}
            onMouseLeave={() => setActiveSide(null)}
            className={`group relative overflow-hidden rounded-3xl transition-all duration-700 flex flex-col justify-between p-8 sm:p-12 lg:p-14 border border-[#C89B3C]/20 shadow-lg hover:shadow-2xl bg-[#3A2315] ${
              activeSide === 'domestic' ? 'lg:scale-[1.02]' : activeSide === 'international' ? 'lg:opacity-85' : ''
            }`}
          >
            <Image
              src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85"
              alt="Domestic Luxury Tours - Kashmir & Himalayas"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3A2315] via-[#3A2315]/65 to-[#3A2315]/30 group-hover:via-[#3A2315]/50 transition-all duration-700" />

            {/* Top Marker */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#C89B3C] font-semibold">
                India &bull; Himalayas &amp; Coasts
              </span>
              <div className="w-10 h-10 rounded-full border border-white/30 bg-white/15 backdrop-blur-md flex items-center justify-center text-[#C89B3C] shadow-sm">
                <Compass className="w-5 h-5" />
              </div>
            </div>

            {/* Content Bottom */}
            <div className="relative z-10 max-w-lg mt-28 sm:mt-36">
              <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight group-hover:text-[#C89B3C] transition-colors">
                DOMESTIC
              </h3>
              <p className="text-lg sm:text-xl text-white/90 font-medium mt-2">
                From Srinagar houseboats to Andaman coral lagoons
              </p>
              <p className="text-sm text-white/75 mt-3 line-clamp-2 leading-relaxed font-normal">
                Kashmir valleys, Andaman turquoise coastlines, Assam wildlife &amp; tea sanctuaries, and Sikkim &amp; Darjeeling misty hills.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C89B3C] group-hover:translate-x-1 transition-transform">
                <span>Explore India Tours</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* International Half */}
          <Link
            href="/tours?category=International"
            onMouseEnter={() => setActiveSide('international')}
            onMouseLeave={() => setActiveSide(null)}
            className={`group relative overflow-hidden rounded-3xl transition-all duration-700 flex flex-col justify-between p-8 sm:p-12 lg:p-14 border border-[#C89B3C]/20 shadow-lg hover:shadow-2xl bg-[#3A2315] ${
              activeSide === 'international' ? 'lg:scale-[1.02]' : activeSide === 'domestic' ? 'lg:opacity-85' : ''
            }`}
          >
            <Image
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85"
              alt="International Luxury Tours - Bali & Vietnam"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3A2315] via-[#3A2315]/65 to-[#3A2315]/30 group-hover:via-[#3A2315]/50 transition-all duration-700" />

            {/* Top Marker */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#C89B3C] font-semibold">
                Beyond India &bull; Worldwide
              </span>
              <div className="w-10 h-10 rounded-full border border-white/30 bg-white/15 backdrop-blur-md flex items-center justify-center text-[#C89B3C] shadow-sm">
                <Globe className="w-5 h-5" />
              </div>
            </div>

            {/* Content Bottom */}
            <div className="relative z-10 max-w-lg mt-28 sm:mt-36">
              <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight group-hover:text-[#C89B3C] transition-colors">
                INTERNATIONAL
              </h3>
              <p className="text-lg sm:text-xl text-white/90 font-medium mt-2">
                Private retreats across Bangkok, Pattaya, Bali &amp; Vietnam
              </p>
              <p className="text-sm text-white/75 mt-3 line-clamp-2 leading-relaxed font-normal">
                Bali jungle infinity villas, Ha Long Bay yacht cruises in Vietnam, vibrant Bangkok metropolis, and sun-kissed Pattaya shores.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C89B3C] group-hover:translate-x-1 transition-transform">
                <span>Discover Worldwide Tours</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
