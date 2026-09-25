'use client';

import {
  GraduationCap,
  Building2,
  Briefcase,
  Users2,
  Users,
  Heart,
  Sparkles,
  ShieldCheck,
  Tag,
  Headphones,
  Globe2,
  ArrowRight,
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { generateWhatsappLink } from '@/lib/utils';

interface SpecificAskSectionProps {
  whatsappNumber: string;
}

interface TargetGroup {
  id: string;
  title: string;
  categoryBadge: string;
  description: string;
  icon: typeof GraduationCap;
  whatsappMessage: string;
}

const targetGroups: TargetGroup[] = [
  {
    id: 'schools',
    title: 'SCHOOLS',
    categoryBadge: 'Educational & Safe',
    description:
      'Safe and organised educational tours that inspire learning and create lifelong memories.',
    icon: GraduationCap,
    whatsappMessage:
      'Hi Majestic Voyages, I would like to inquire about customized educational tour packages for Schools.',
  },
  {
    id: 'colleges',
    title: 'COLLEGES',
    categoryBadge: 'Academic & Adventure',
    description:
      'Customized college trip packages for academic, cultural, and adventure tours with total flexibility.',
    icon: Building2,
    whatsappMessage:
      'Hi Majestic Voyages, I would like to plan a customized tour package for our College group.',
  },
  {
    id: 'companies',
    title: 'COMPANIES',
    categoryBadge: 'Corporate & MICE',
    description:
      'Professional travel management for corporate trips, offsites, events, retreats, and conferences.',
    icon: Briefcase,
    whatsappMessage:
      'Hi Majestic Voyages, I would like to arrange corporate travel and offsite management for our Company.',
  },
  {
    id: 'associations',
    title: 'ASSOCIATIONS',
    categoryBadge: 'Group Solutions',
    description:
      'Group travel solutions for meetings, annual conventions, community events, and special interest groups.',
    icon: Users2,
    whatsappMessage:
      'Hi Majestic Voyages, I would like to organize group travel for our Association.',
  },
  {
    id: 'family-trips',
    title: 'FAMILY TRIPS',
    categoryBadge: 'Fun & Relaxation',
    description:
      'Memorable family holidays designed for fun, relaxation, comfort, and togetherness across generations.',
    icon: Users,
    whatsappMessage:
      'Hi Majestic Voyages, I want to customize a comfortable holiday trip for my Family.',
  },
  {
    id: 'senior-citizens',
    title: 'SENIOR CITIZENS (PILGRIMAGE)',
    categoryBadge: 'Spiritual & Care',
    description:
      'Comfortable and spiritual pilgrimage tours designed with special care, unhurried pace, and absolute convenience.',
    icon: Sparkles,
    whatsappMessage:
      'Hi Majestic Voyages, I would like to inquire about Senior Citizen and Pilgrimage tour packages.',
  },
  {
    id: 'honeymoon',
    title: 'HONEYMOON PACKAGES',
    categoryBadge: 'Romantic Getaways',
    description:
      'Romantic and unforgettable getaways to start your beautiful journey together in complete luxury and privacy.',
    icon: Heart,
    whatsappMessage:
      'Hi Majestic Voyages, I would like to plan a romantic customized Honeymoon package.',
  },
];

const guarantees = [
  {
    icon: ShieldCheck,
    title: 'Trusted & Reliable',
    desc: 'Serving happy travelers since 2016 from Erode',
  },
  {
    icon: Tag,
    title: 'Best Deals Guaranteed',
    desc: 'Maximum value tailored directly to your budget',
  },
  {
    icon: Headphones,
    title: '24/7 Concierge Support',
    desc: 'Dedicated travel assistance during your entire trip',
  },
  {
    icon: Globe2,
    title: 'Global Network & Local Care',
    desc: 'Extensive on-ground support across all destinations',
  },
];

export default function SpecificAskSection({ whatsappNumber }: SpecificAskSectionProps) {
  return (
    <section className="relative py-24 lg:py-32 bg-white border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <ScrollReveal direction="right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9B82E]/15 border border-[#F9B82E]/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F9B82E]" />
              <span className="text-xs uppercase tracking-wider text-[#26345C] font-semibold">
                Tailored Solutions &bull; Dedicated Divisions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#303D68] tracking-tight leading-[1.15]">
              DESIGNED FOR <br className="hidden sm:inline" />
              <span className="text-[#F9B82E]">EVERY TRAVELER.</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* 7 Target Segments Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetGroups.map((group, idx) => {
            const cardWhatsappHref = generateWhatsappLink(
              whatsappNumber,
              group.whatsappMessage
            );
            const Icon = group.icon;

            return (
              <ScrollReveal
                key={group.id}
                delay={idx * 0.05}
                direction="up"
                className={idx === 6 ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <div className="p-7 rounded-2xl border border-slate-200/80 bg-[#F7F8FA] flex flex-col justify-between h-full shadow-xs hover:shadow-xl hover:border-[#F9B82E]/60 transition-all duration-300">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-[#303D68] mb-4 shadow-xs">
                      <Icon className="w-5 h-5 text-[#303D68]" />
                    </div>

                    <span className="text-[11px] uppercase tracking-wider text-[#F9B82E] font-semibold block mb-1.5">
                      {group.categoryBadge}
                    </span>

                    <h3 className="text-xl font-bold text-[#303D68]">
                      {group.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mt-2.5">
                      {group.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                    <a
                      href={cardWhatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#303D68] hover:text-[#F9B82E] transition-colors"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F9B82E] transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <span className="text-[11px] font-medium text-slate-400">Customized</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Guarantees & Motto Row */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#26345C] text-white shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/15">
            {guarantees.map((g) => {
              const GIcon = g.icon;
              return (
                <div key={g.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#F9B82E]">
                    <GIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {g.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/75 font-normal mt-1 leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#F9B82E] font-semibold block">
                The Majestic Voyages Promise
              </span>
              <h3 className="text-2xl sm:text-3xl text-white mt-1 font-bold">
                “We Plan the Journey,{' '}
                <span className="text-[#F9B82E]">
                  You Create Memories.
                </span>”
              </h3>
            </div>

            <a
              href={generateWhatsappLink(
                whatsappNumber,
                'Hi Majestic Voyages, I would like to plan a bespoke journey.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3.5 rounded-xl bg-[#F9B82E] text-[#26345C] text-sm font-semibold hover:bg-white transition-all shadow-md active:scale-[0.98] shrink-0"
            >
              Inquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
