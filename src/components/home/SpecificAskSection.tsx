'use client';

import Image from 'next/image';
import {
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
  image: string;
  whatsappMessage: string;
}

const targetGroups: TargetGroup[] = [
  {
    id: 'schools',
    title: 'SCHOOLS',
    categoryBadge: 'Educational & Safe',
    description:
      'Safe and organised educational tours that inspire learning and create lifelong memories.',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    whatsappMessage:
      'Hi Majestic Voyages, I would like to inquire about customized educational tour packages for Schools.',
  },
  {
    id: 'colleges',
    title: 'COLLEGES',
    categoryBadge: 'Academic & Adventure',
    description:
      'Customized college trip packages for academic, cultural, and adventure tours with total flexibility.',
    image:
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80',
    whatsappMessage:
      'Hi Majestic Voyages, I would like to plan a customized tour package for our College group.',
  },
  {
    id: 'companies',
    title: 'COMPANIES',
    categoryBadge: 'Corporate & MICE',
    description:
      'Professional travel management for corporate trips, offsites, events, retreats, and conferences.',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    whatsappMessage:
      'Hi Majestic Voyages, I would like to arrange corporate travel and offsite management for our Company.',
  },
  {
    id: 'associations',
    title: 'ASSOCIATIONS',
    categoryBadge: 'Group Solutions',
    description:
      'Group travel solutions for meetings, annual conventions, community events, and special interest groups.',
    image:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    whatsappMessage:
      'Hi Majestic Voyages, I would like to organize group travel for our Association.',
  },
  {
    id: 'family-trips',
    title: 'FAMILY TRIPS',
    categoryBadge: 'Fun & Relaxation',
    description:
      'Memorable family holidays designed for fun, relaxation, comfort, and togetherness across generations.',
    image:
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=800&q=80',
    whatsappMessage:
      'Hi Majestic Voyages, I want to customize a comfortable holiday trip for my Family.',
  },
  {
    id: 'senior-citizens',
    title: 'SENIOR CITIZENS',
    categoryBadge: 'Spiritual & Care',
    description:
      'Comfortable and spiritual pilgrimage tours designed with special care, unhurried pace, and absolute convenience.',
    image:
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    whatsappMessage:
      'Hi Majestic Voyages, I would like to inquire about Senior Citizen and Pilgrimage tour packages.',
  },
  {
    id: 'honeymoon',
    title: 'HONEYMOON',
    categoryBadge: 'Romantic Getaways',
    description:
      'Romantic and unforgettable getaways to start your beautiful journey together in complete luxury and privacy.',
    image:
      'https://images.unsplash.com/photo-1510414842594-a61782153c5b?auto=format&fit=crop&w=800&q=80',
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
    <section className="relative py-24 lg:py-32 bg-[#F8F3EA] border-b border-[#C89B3C]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <ScrollReveal direction="right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C89B3C]" />
              <span className="text-xs uppercase tracking-wider text-[#3A2315] font-semibold">
                Tailored Solutions &bull; Dedicated Divisions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3A2315] tracking-tight leading-[1.15]">
              DESIGNED FOR <br className="hidden sm:inline" />
              <span className="text-[#C89B3C]">EVERY TRAVELER.</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* 7 Target Segments — Cinematic Photo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetGroups.map((group, idx) => {
            const cardWhatsappHref = generateWhatsappLink(
              whatsappNumber,
              group.whatsappMessage
            );

            return (
              <ScrollReveal
                key={group.id}
                delay={idx * 0.05}
                direction="up"
                className={idx === 6 ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <a
                  href={cardWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-3xl border border-[#C89B3C]/20 bg-[#3A2315] shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-[#C89B3C]/50 transition-all duration-500 flex flex-col h-[300px] sm:h-[320px] cursor-pointer"
                >
                  {/* Background Photo */}
                  <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A2315]/95 via-[#3A2315]/40 to-transparent" />

                  {/* Badge top-left */}
                  <div className="relative z-10 p-5">
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[#C89B3C] font-semibold bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 border border-[#C89B3C]/30">
                      {group.categoryBadge}
                    </span>
                  </div>

                  {/* Content at bottom */}
                  <div className="relative z-10 mt-auto p-5 pt-0">
                    <h3 className="font-sans text-xl font-bold text-white leading-tight tracking-tight group-hover:text-[#C89B3C] transition-colors duration-300">
                      {group.title}
                    </h3>
                    <p className="font-sans text-xs text-white/75 mt-2 leading-relaxed line-clamp-2 font-normal">
                      {group.description}
                    </p>

                    {/* CTA Row */}
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-[10px] uppercase tracking-wider text-[#C89B3C] font-semibold">
                        Inquire Now
                      </span>
                      <div className="w-7 h-7 rounded-full border border-[#C89B3C]/50 flex items-center justify-center text-[#C89B3C] group-hover:bg-[#C89B3C] group-hover:text-white group-hover:border-[#C89B3C] transition-all duration-300">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Guarantees & Motto Row */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#3A2315] text-white shadow-2xl border border-[#C89B3C]/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/15">
            {guarantees.map((g) => {
              const GIcon = g.icon;
              return (
                <div key={g.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#C89B3C]">
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
              <span className="text-xs uppercase tracking-wider text-[#C89B3C] font-semibold block">
                The Majestic Voyages Promise
              </span>
              <h3 className="text-2xl sm:text-3xl text-white mt-1 font-bold">
                "We Plan the Journey,{' '}
                <span className="text-[#C89B3C]">
                  You Create Memories.
                </span>"
              </h3>
            </div>

            <a
              href={generateWhatsappLink(
                whatsappNumber,
                'Hi Majestic Voyages, I would like to plan a bespoke journey.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3.5 rounded-xl bg-[#3A2315] border border-[#C89B3C] text-white text-sm font-semibold hover:bg-[#5A3A22] hover:shadow-[0_0_20px_rgba(200,155,60,0.35)] transition-all shadow-md active:scale-[0.98] shrink-0"
            >
              Inquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}