'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryItem } from '@/types';

interface GalleryClientProps {
  initialGallery: GalleryItem[];
}

const categories = [
  'All',
  'Domestic',
  'International',
  'Group Expeditions',
  'Aerials',
  'Travel Moments',
];

export default function GalleryClient({ initialGallery }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const filteredItems = initialGallery.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handleNext = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-16 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveIdx(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#303D68] text-white shadow-sm'
                : 'bg-white border border-slate-200/80 text-slate-600 hover:text-[#303D68] hover:border-[#303D68]/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Visual Grid */}
      {filteredItems.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredItems.map((item, idx) => {
              const isFeature = idx % 5 === 0;
              const isTall = idx % 5 === 1 || idx % 5 === 4;
              const colSpan = isFeature ? 'lg:col-span-8' : isTall ? 'lg:col-span-4' : 'lg:col-span-6';
              const height = isFeature ? 'h-[400px] sm:h-[460px]' : isTall ? 'h-[400px] sm:h-[460px]' : 'h-[340px] sm:h-[380px]';

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative ${colSpan} ${height} w-full rounded-2xl overflow-hidden cursor-pointer bg-[#26345C] border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-500`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#26345C]/90 via-[#26345C]/20 to-transparent opacity-40 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Hover Details */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="self-end w-9 h-9 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center text-[#F9B82E]">
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
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 rounded-3xl border border-slate-200 bg-white shadow-xs">
          <Sparkles className="w-10 h-10 text-[#F9B82E] mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-[#303D68]">No Images In This Category</h3>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && filteredItems[activeIdx] && (
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

            {/* Content */}
            <div className="max-w-5xl w-full flex flex-col items-center">
              <div className="relative w-full h-[65vh] overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-black/40">
                <Image
                  src={filteredItems[activeIdx].imageUrl}
                  alt={filteredItems[activeIdx].title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="text-center mt-6">
                <span className="text-xs uppercase tracking-wider text-[#F9B82E] font-semibold">
                  {filteredItems[activeIdx].location} &bull; {filteredItems[activeIdx].category}
                </span>
                <h3 className="text-2xl sm:text-3xl text-white mt-1 font-bold">
                  {filteredItems[activeIdx].title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
