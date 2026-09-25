'use client';

import { Users, Sparkles, RefreshCw, Lightbulb } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const benefits = [
  {
    title: 'Connection',
    subtitle: 'Meaningful Bonds',
    description:
      'Build meaningful connections with people, places, and diverse cultures that broaden your worldview and enrich your life.',
    icon: Users,
    highlight: 'Deep Cultural Roots',
  },
  {
    title: 'People & Experience',
    subtitle: 'Cherished Memories',
    description:
      'Meet new people, experience heartfelt hospitality, and create unforgettable shared memories that stay with you forever.',
    icon: Sparkles,
    highlight: 'Life-Long Stories',
  },
  {
    title: 'Change',
    subtitle: 'Fresh Perspectives',
    description:
      'Travel brings a fresh perspective and helps us embrace positive change, stepping outside the ordinary to find renewal.',
    icon: RefreshCw,
    highlight: 'Personal Renewal',
  },
  {
    title: 'Problem-Solving Mindset',
    subtitle: 'Adaptability & Growth',
    description:
      'Navigating new environments develops real-world adaptability, self-reliance, confidence, and a creative problem-solving mindset.',
    icon: Lightbulb,
    highlight: 'Inner Confidence',
  },
];

export default function BenefitsSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#F7F8FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <ScrollReveal direction="right">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#F9B82E]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#F9B82E] font-semibold">
                PHILOSOPHY
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26345C] leading-tight tracking-tight">
              Benefits of <br />
              <span className="text-[#303D68]">Journeying.</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={idx * 0.08} direction="up">
                <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                    <span className="font-sans text-lg font-bold text-[#F9B82E]">
                      {num}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#F9B82E]/10 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-[#F9B82E]" strokeWidth={2} />
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#4A4F5A] font-semibold block mb-2">
                    {item.subtitle}
                  </span>

                  <h3 className="font-sans text-lg font-bold text-[#303D68]">
                    {item.title}
                  </h3>

                  <p className="font-sans text-sm text-[#4A4F5A] leading-relaxed mt-3 flex-1">
                    {item.description}
                  </p>

                  <div className="pt-5 mt-5 border-t border-gray-50">
                    <span className="text-xs font-semibold text-[#F9B82E] uppercase tracking-wider">
                      {item.highlight}
                    </span>
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
