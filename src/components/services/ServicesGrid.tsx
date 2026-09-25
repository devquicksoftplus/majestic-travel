'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import type { Transition } from 'framer-motion';
import { ServiceItem } from '@/types';
import { generateWhatsappLink } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────
   Per-service image overrides so each card has a contextually
   correct photograph. Falls back to srv.imageUrl if no override.
───────────────────────────────────────────────────────────── */
const SERVICE_IMAGE_MAP: Record<string, string> = {
  'serv-domestic':
    'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=85',
  'serv-international':
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=85',
  'serv-visa':
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=85',
  'serv-flights':
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=85',
  'serv-transit':
    'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=800&q=85',
  'serv-hotels':
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=85',
  'serv-school':
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=85',
  'serv-corporate':
    'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=85',
  'serv-forex':
    'https://res.cloudinary.com/utdl8qrw/image/upload/v1790357832/services/foreign-exchange-1790357831767.jpg',
};

interface Props {
  services: ServiceItem[];
  whatsappNumber: string;
}

const CARD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function cardTransition(i: number): Transition {
  return {
    duration: 0.55,
    delay: i * 0.08,
    ease: CARD_EASE,
  };
}

export default function ServicesGrid({ services, whatsappNumber }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
      {/* Section eyebrow */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[2px] bg-[#F9B82E]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F9B82E]">
            Our Services
          </span>
          <span className="w-8 h-[2px] bg-[#F9B82E]" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#303D68] tracking-tight">
          Everything Your Journey Needs
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
          From custom tour design to ticketing, visa support, and hotel bookings — all in one place.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
        {services.map((srv, idx) => {
          const num = String(idx + 1).padStart(2, '0');
          const imageUrl = SERVICE_IMAGE_MAP[srv.id] ?? srv.imageUrl;
          const whatsappHref = generateWhatsappLink(
            whatsappNumber,
            `Hello Majestic Voyages, I would like to inquire about your "${srv.title}" services.`
          );

          return (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={cardTransition(idx)}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: CARD_EASE } }}
              className="group flex flex-col rounded-[24px] overflow-hidden bg-white border border-slate-200/80
                         shadow-[0_4px_20px_-4px_rgba(48,61,104,0.10)]
                         hover:shadow-[0_16px_40px_-8px_rgba(48,61,104,0.22)]
                         hover:border-[#F9B82E]/40
                         transition-shadow transition-border duration-500"
            >
              {/* ── Card Image ── */}
              <div className="relative w-full h-52 overflow-hidden flex-shrink-0">
                <Image
                  src={imageUrl}
                  alt={srv.title}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={idx < 3}
                />
                {/* Dark-to-top scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#26345C]/60 via-transparent to-transparent opacity-50 pointer-events-none" />

                {/* Service tag badge */}
                {srv.tag && (
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-[0.18em] font-bold text-[#303D68] shadow-sm border border-[#F9B82E]/30">
                      {srv.tag}
                    </span>
                  </div>
                )}

                {/* Gold accent on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F9B82E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* ── Card Content ── */}
              <div className="flex flex-col flex-1 p-6">
                {/* Service number + category */}
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-xl font-bold text-[#F9B82E] leading-none">{num}</span>
                  <span className="w-5 h-[2px] bg-slate-200" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
                    {srv.category}
                  </span>
                </div>

                {/* Service title */}
                <h3 className="text-lg font-bold text-[#303D68] leading-snug tracking-tight mb-2">
                  {srv.title}
                </h3>

                {/* Full description — preserved exactly */}
                <p className="text-[13px] text-slate-600 leading-relaxed flex-1">
                  {srv.fullDesc}
                </p>

                {/* Features list — preserved exactly */}
                <div className="mt-5 pt-5 border-t border-slate-100 space-y-2">
                  {srv.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px] text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA button — preserved exactly */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F9B82E] text-[#26345C] text-[11px] font-semibold uppercase tracking-wider
                               hover:bg-[#303D68] hover:text-white transition-all duration-300 shadow-sm active:scale-[0.98]"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
