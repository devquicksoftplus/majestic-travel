'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '@/types';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const next = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIdx];

  return (
    <section className="relative py-24 lg:py-32 bg-[#F7F8FA] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <ScrollReveal direction="up" className="mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-6 h-[2px] bg-[#F9B82E]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#F9B82E] font-semibold">
              TRAVELER STORIES
            </span>
            <span className="w-6 h-[2px] bg-[#F9B82E]" />
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26345C] leading-tight tracking-tight">
            Travelers Who <br />
            <span className="text-[#303D68]">Went Further.</span>
          </h2>
        </ScrollReveal>

        {/* Quote Card */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Big Quote Icon */}
              <Quote className="w-10 h-10 text-[#F9B82E] mb-6 opacity-60" />

              <blockquote className="font-sans text-xl sm:text-2xl md:text-3xl font-medium text-[#26345C] leading-relaxed max-w-3xl tracking-tight">
                "{current.review}"
              </blockquote>

              {/* Attribution */}
              <div className="mt-10 flex items-center gap-4">
                {current.avatarUrl && (
                  <div className="relative w-14 h-14 overflow-hidden rounded-full border-2 border-[#F9B82E]/40 shadow-md">
                    <Image
                      src={current.avatarUrl}
                      alt={current.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-left">
                  <h4 className="font-sans text-base font-bold text-[#303D68]">
                    {current.name}
                  </h4>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#F9B82E] font-semibold mt-0.5">
                    {current.destination} &bull; {current.tourDate}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-[#303D68] hover:bg-[#303D68] hover:text-white hover:border-[#303D68] transition-all duration-300 shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="font-sans text-sm font-semibold text-[#4A4F5A] tracking-[0.15em]">
            {String(currentIdx + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>

          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-[#303D68] hover:bg-[#303D68] hover:text-white hover:border-[#303D68] transition-all duration-300 shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIdx ? 'w-8 bg-[#F9B82E]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
