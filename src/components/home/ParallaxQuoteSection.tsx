'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ParallaxQuoteSection() {
  return (
    <section className="relative h-[440px] sm:h-[500px] w-full overflow-hidden flex items-center justify-center bg-[#26345C]">
      {/* Background Image with Fixed Pan */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat opacity-30 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2400&q=85')`,
        }}
      />

      {/* Deep Navy Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#26345C]/95 via-[#303D68]/85 to-[#26345C]/95" />

      {/* Quote Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal direction="up" duration={0.9}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9B82E]/15 border border-[#F9B82E]/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F9B82E]" />
            <span className="text-xs uppercase tracking-wider text-[#F9B82E] font-semibold">
              A Philosophy of Bespoke Voyaging
            </span>
          </div>

          <blockquote className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            “COLLECT MOMENTS, <br />
            <span className="text-[#F9B82E]">
              NOT THINGS.”
            </span>
          </blockquote>

          <p className="mt-5 text-white/85 text-sm sm:text-base font-normal max-w-lg mx-auto leading-relaxed">
            The world reveals its quiet wonders only to those who wander with curiosity, elegance, and unhurried steps.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
