'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { ServiceItem } from '@/types';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface ServicesSectionProps {
  services: ServiceItem[];
}

// Rich travel photos mapped per service category
const servicePhotos: Record<string, string> = {
  Schools: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  Colleges: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80',
  Companies: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  Associations: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
  'Family Trips': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=800&q=80',
  'Senior Citizens': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
  Honeymoon: 'https://images.unsplash.com/photo-1510414842594-a61782153c5b?auto=format&fit=crop&w=800&q=80',
};

// Fallback photo gallery for any service not in the map
const fallbackPhotos = [
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
];

function getServicePhoto(srv: ServiceItem, idx: number): string {
  if (srv.imageUrl) return srv.imageUrl;
  // Try to match by title keyword
  for (const [key, url] of Object.entries(servicePhotos)) {
    if (srv.title.toLowerCase().includes(key.toLowerCase())) return url;
  }
  return fallbackPhotos[idx % fallbackPhotos.length];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const displayServices = services.slice(0, 8);

  return (
    <section className="relative py-24 lg:py-32 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <ScrollReveal direction="right">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#C89B3C]" />
              <span className="text-xs uppercase tracking-[0.12em] text-[#C89B3C] font-semibold">
                OUR EXPERTISE
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3A2315] leading-tight tracking-tight">
              Every Detail.{' '}
              <span className="text-[#C89B3C]">Taken Care Of.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] font-semibold text-[#3A2315] hover:text-[#C89B3C] transition-colors pb-1 border-b border-[#3A2315]/30 hover:border-[#C89B3C]"
            >
              <span>Explore All Services</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Premium Photo Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((srv, idx) => {
            const photo = getServicePhoto(srv, idx);
            return (
              <ScrollReveal key={srv.id} delay={idx * 0.06} direction="up">
                <Link
                  href="/services"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="group relative overflow-hidden rounded-3xl border border-[#C89B3C]/20 bg-[#3A2315] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-[340px] sm:h-[360px] cursor-pointer"
                  aria-label={`View ${srv.title}`}
                >
                  {/* Background Photo */}
                  <Image
                    src={photo}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A2315]/95 via-[#3A2315]/45 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A2315]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Gold top label */}
                  <div className="relative z-10 p-5">
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[#C89B3C] font-semibold bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 border border-[#C89B3C]/30">
                      {srv.category || 'Premium'}
                    </span>
                  </div>

                  {/* Content at bottom */}
                  <div className="relative z-10 mt-auto p-5 pt-0">
                    <h3 className="font-sans text-lg font-bold text-white leading-tight tracking-tight group-hover:text-[#C89B3C] transition-colors duration-300">
                      {srv.title}
                    </h3>
                    <p className="font-sans text-xs text-white/75 mt-2 leading-relaxed line-clamp-2 font-normal">
                      {srv.shortDesc}
                    </p>

                    {/* CTA Row */}
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-[10px] uppercase tracking-wider text-[#C89B3C] font-semibold">
                        Learn More
                      </span>
                      <div className="w-7 h-7 rounded-full border border-[#C89B3C]/50 flex items-center justify-center text-[#C89B3C] group-hover:bg-[#C89B3C] group-hover:text-white group-hover:border-[#C89B3C] transition-all duration-300">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
