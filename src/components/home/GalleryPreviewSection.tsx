'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { GalleryItem } from '@/types';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface GalleryPreviewSectionProps {
  gallery: GalleryItem[];
}

export default function GalleryPreviewSection({ gallery }: GalleryPreviewSectionProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const displayItems = gallery.slice(0, 6);

  const handleNext = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % displayItems.length);
    }
  };

  const handlePrev = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + displayItems.length) % displayItems.length);
    }
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[#F7F8FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-16 gap-6">
          <ScrollReveal direction="right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9B82E]/15 border border-[#F9B82E]/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F9B82E]" />
              <span className="text-xs uppercase tracking-wider text-[#26345C] font-semibold">
                Visual Chronicles &bull; Archive
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#303D68] tracking-tight leading-[1.15]">
              MOMENTS <br className="hidden sm:inline" />
              <span className="text-[#F9B82E]">WORTH REMEMBERING.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-[#303D68] hover:text-[#F9B82E] transition-colors pb-1.5 border-b-2 border-[#303D68]/20 hover:border-[#F9B82E]"
            >
              <span>View Full Gallery</span>
              <ArrowUpRight className="w-4 h-4 text-[#F9B82E] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Artistic Editorial Gallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {displayItems.map((item, idx) => {
            let colSpan = 'md:col-span-6';
            let height = 'h-[360px] sm:h-[400px]';

            if (idx === 0) {
              colSpan = 'md:col-span-4';
              height = 'h-[420px] sm:h-[480px]';
            } else if (idx === 1) {
              colSpan = 'md:col-span-8';
              height = 'h-[420px] sm:h-[480px]';
            } else if (idx === 2) {
              colSpan = 'md:col-span-7';
              height = 'h-[380px] sm:h-[440px]';
            } else if (idx === 3) {
              colSpan = 'md:col-span-5';
              height = 'h-[380px] sm:h-[440px]';
            }

            return (
              <ScrollReveal key={item.id} delay={idx * 0.07} direction="up" className={colSpan}>
                <div
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative ${height} w-full rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl border border-slate-200/80 bg-[#26345C] transition-all duration-500`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#26345C]/90 via-[#26345C]/20 to-transparent opacity-40 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Caption on Hover */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="self-end w-9 h-9 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center text-[#F9B82E] shadow-sm">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#F9B82E] font-semibold block mb-1">
                        {item.location} &bull; {item.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl text-white font-bold tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#26345C]/95 backdrop-blur-md p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:border-[#F9B82E] hover:text-[#F9B82E] hover:bg-white/20 transition-all"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 w-11 h-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:border-[#F9B82E] hover:text-[#F9B82E] hover:bg-white/20 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 w-11 h-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:border-[#F9B82E] hover:text-[#F9B82E] hover:bg-white/20 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="max-w-5xl w-full flex flex-col items-center">
              <div className="relative w-full h-[65vh] overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-black/40">
                <Image
                  src={displayItems[activeIdx].imageUrl}
                  alt={displayItems[activeIdx].title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="text-center mt-6">
                <span className="text-xs uppercase tracking-wider text-[#F9B82E] font-semibold">
                  {displayItems[activeIdx].location} &bull; {displayItems[activeIdx].category}
                </span>
                <h3 className="text-2xl sm:text-3xl text-white mt-1 font-bold">
                  {displayItems[activeIdx].title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
