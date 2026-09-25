'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '@/types';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface ServicesSectionProps {
  services: ServiceItem[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const displayServices = services.slice(0, 8);

  return (
    <section className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <ScrollReveal direction="right">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#F9B82E]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#F9B82E] font-semibold">
                OUR EXPERTISE
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26345C] leading-tight tracking-tight">
              Every Detail. <br />
              <span className="text-[#303D68]">Taken Care Of.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#303D68] hover:text-[#F9B82E] transition-colors pb-1 border-b border-[#303D68]/30 hover:border-[#F9B82E]"
            >
              <span>Explore All Services</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Vertical Editorial List */}
        <div className="divide-y divide-gray-100 border-y border-gray-100">
          {displayServices.map((srv, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={srv.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative py-7 sm:py-9 transition-all duration-300 hover:bg-[#F7F8FA] px-2 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Number */}
                  <div className="md:col-span-2">
                    <span className="font-sans text-2xl sm:text-3xl font-bold text-gray-200 group-hover:text-[#F9B82E] transition-colors duration-300">
                      {num}
                    </span>
                  </div>

                  {/* Title & Tag */}
                  <div className="md:col-span-4">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#F9B82E] font-semibold block mb-1">
                      {srv.category}
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#303D68] group-hover:text-[#26345C] transition-colors">
                      {srv.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-5">
                    <p className="font-sans text-sm text-[#4A4F5A] leading-relaxed">
                      {srv.shortDesc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="md:col-span-1 flex justify-end">
                    <Link
                      href="/services"
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#303D68] group-hover:bg-[#303D68] group-hover:text-white group-hover:border-[#303D68] transition-all duration-300"
                      aria-label={`View ${srv.title} details`}
                    >
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Hover Image Preview */}
                {srv.imageUrl && isHovered && (
                  <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 w-48 h-28 pointer-events-none z-20 overflow-hidden rounded-xl border border-[#F9B82E]/30 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                    <Image
                      src={srv.imageUrl}
                      alt={srv.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
