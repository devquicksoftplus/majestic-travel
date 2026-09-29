'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';

const benefits = [
  {
    title: 'Connection',
    subtitle: 'Meaningful Bonds',
    description:
      'Build meaningful connections with people, places, and diverse cultures that broaden your worldview and enrich your life.',
    highlight: 'Deep Cultural Roots',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'People & Experience',
    subtitle: 'Cherished Memories',
    description:
      'Meet new people, experience heartfelt hospitality, and create unforgettable shared memories that stay with you forever.',
    highlight: 'Life-Long Stories',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Change',
    subtitle: 'Fresh Perspectives',
    description:
      'Travel brings a fresh perspective and helps us embrace positive change, stepping outside the ordinary to find renewal.',
    highlight: 'Personal Renewal',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Problem-Solving Mindset',
    subtitle: 'Adaptability & Growth',
    description:
      'Navigating new environments develops real-world adaptability, self-reliance, confidence, and a creative problem-solving mindset.',
    highlight: 'Inner Confidence',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
  },
];

export default function BenefitsSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#F8F3EA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <ScrollReveal direction="right">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#C89B3C]" />
              <span className="text-xs uppercase tracking-[0.12em] text-[#C89B3C] font-semibold">
                PHILOSOPHY
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3A2315] leading-tight tracking-tight">
              Benefits of{' '}
              <span className="text-[#C89B3C]">Journeying.</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* 4-column premium photo cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            return (
              <ScrollReveal key={item.title} delay={idx * 0.08} direction="up">
                <div className="group overflow-hidden rounded-3xl border border-[#C89B3C]/20 bg-[#FFFDF8] shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-[#C89B3C]/50 transition-all duration-500 flex flex-col h-full">
                  {/* Photo top */}
                  <div className="relative h-48 overflow-hidden rounded-t-3xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Number badge */}
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#3A2315]/80 backdrop-blur-sm flex items-center justify-center border border-[#C89B3C]/40">
                      <span className="text-xs font-bold text-[#C89B3C]">{num}</span>
                    </div>
                    {/* Gold gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3A2315]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <span className="text-[10px] uppercase tracking-[0.1em] text-[#5B4638] font-semibold block mb-1.5">
                      {item.subtitle}
                    </span>

                    <h3 className="font-sans text-lg font-bold text-[#3A2315]">
                      {item.title}
                    </h3>

                    <p className="font-sans text-sm text-[#5B4638] leading-relaxed mt-3 flex-1">
                      {item.description}
                    </p>

                    <div className="pt-4 mt-4 border-t border-[#C89B3C]/15">
                      <span className="text-xs font-semibold text-[#C89B3C] uppercase tracking-wider">
                        {item.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
