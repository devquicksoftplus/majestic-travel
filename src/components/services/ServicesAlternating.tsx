'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import type { Transition } from 'framer-motion';
import { ServiceItem } from '@/types';
import { generateWhatsappLink } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────
   Contextually accurate image mapping for every service
───────────────────────────────────────────────────────────── */
const SERVICE_IMAGE_MAP: Record<string, string> = {
  // Flight Ticket Booking -> Commercial airplane in flight
  'serv-flights':
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85',
  // Hotel Booking -> 5-star luxury hotel / resort with pool
  'serv-hotels':
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
  // Passport & Visa -> Passports & travel documentation
  'serv-visa':
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=85',
  // Train & Bus Ticket Booking -> Scenic passenger express train
  'serv-transit':
    'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1600&q=85',
  // School Group Tours -> Students / educational youth group
  'serv-school':
    'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1600&q=85',
  // Corporate Group Travel -> Corporate executive retreat / team
  'serv-corporate':
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=85',
  // Domestic Tours -> Scenic Indian heritage & landscape
  'serv-domestic':
    'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85',
  // International Tours -> Exotic global destination
  'serv-international':
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85',
  // Foreign Exchange -> Global currencies & travel forex card
  'serv-forex':
    'https://res.cloudinary.com/utdl8qrw/image/upload/v1790357832/services/foreign-exchange-1790357831767.jpg',
};

function getServiceImage(srv: ServiceItem): string {
  if (SERVICE_IMAGE_MAP[srv.id]) return SERVICE_IMAGE_MAP[srv.id];
  const titleLower = srv.title.toLowerCase();
  if (titleLower.includes('flight') || titleLower.includes('air')) {
    return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=85';
  }
  if (titleLower.includes('hotel') || titleLower.includes('resort') || titleLower.includes('stay')) {
    return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85';
  }
  if (titleLower.includes('visa') || titleLower.includes('passport')) {
    return 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=85';
  }
  if (titleLower.includes('foreign') || titleLower.includes('forex') || titleLower.includes('exchange') || titleLower.includes('currency')) {
    return 'https://res.cloudinary.com/utdl8qrw/image/upload/v1790357832/services/foreign-exchange-1790357831767.jpg';
  }
  if (titleLower.includes('train') || titleLower.includes('bus') || titleLower.includes('rail')) {
    return 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1600&q=85';
  }
  if (titleLower.includes('school') || titleLower.includes('student')) {
    return 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1600&q=85';
  }
  if (titleLower.includes('corporate') || titleLower.includes('business')) {
    return 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=85';
  }
  if (titleLower.includes('domestic')) {
    return 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85';
  }
  if (titleLower.includes('international')) {
    return 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85';
  }
  return srv.imageUrl;
}

interface Props {
  services: ServiceItem[];
  whatsappNumber: string;
}

const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeTransition: Transition = {
  duration: 0.65,
  ease: MOTION_EASE,
};

export default function ServicesAlternating({ services, whatsappNumber }: Props) {
  // Sort services to display Flight Booking first (01), Hotel Booking second (02), etc.
  const orderedServices = [...services].sort((a, b) => {
    const getOrder = (srv: ServiceItem) => {
      const title = srv.title.toLowerCase();
      if (srv.id === 'serv-flights' || title.includes('flight')) return 1;
      if (srv.id === 'serv-hotels' || title.includes('hotel')) return 2;
      if (srv.id === 'serv-visa' || title.includes('visa') || title.includes('passport')) return 3;
      if (srv.id === 'serv-forex' || title.includes('forex') || title.includes('exchange') || title.includes('currency')) return 4;
      if (srv.id === 'serv-transit' || title.includes('train') || title.includes('bus')) return 5;
      if (srv.id === 'serv-school' || title.includes('school')) return 6;
      if (srv.id === 'serv-corporate' || title.includes('corporate')) return 7;
      if (srv.id === 'serv-domestic' || title.includes('domestic')) return 8;
      if (srv.id === 'serv-international' || title.includes('international')) return 9;
      return 99;
    };
    return getOrder(a) - getOrder(b);
  });

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
      {/* Section Header */}
      <div className="text-center mb-20 sm:mb-28">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[2px] bg-[#F9B82E]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F9B82E]">
            Our Services
          </span>
          <span className="w-8 h-[2px] bg-[#F9B82E]" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26345C] tracking-tight">
          Everything Your Journey Needs
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          From custom tour design to ticketing, visa support, and hotel bookings — handled with uncompromising precision.
        </p>
      </div>

      {/* Alternating Services List */}
      <div className="space-y-24 sm:space-y-32 lg:space-y-40">
        {orderedServices.map((srv, idx) => {
          const num = String(idx + 1).padStart(2, '0');
          const isEven = idx % 2 === 0; // idx 0 = 01 (Even -> Image Left, Content Right)
          const imageUrl = getServiceImage(srv);
          const whatsappHref = generateWhatsappLink(
            whatsappNumber,
            `Hello Majestic Voyages, I would like to inquire about your "${srv.title}" services.`
          );

          return (
            <div
              key={srv.id}
              className="group relative scroll-mt-24"
            >
              {/* ── MOBILE-ONLY NUMBER HEADER (Order: 01 -> Image -> Title -> Description) ── */}
              <div className="block md:hidden mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-[#F9B82E] tracking-tighter">
                    {num}
                  </span>
                  <span className="h-[2px] w-8 bg-[#F9B82E]/50" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#303D68]/80">
                    {srv.category}
                  </span>
                  {srv.tag && (
                    <span className="ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] bg-[#26345C] text-[#F9B82E]">
                      {srv.tag}
                    </span>
                  )}
                </div>
              </div>

              {/* ── TWO-COLUMN ALTERNATING CONTAINER ── */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
                {/* ── LARGE IMAGE COLUMN ── */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={fadeTransition}
                  className={`w-full md:col-span-6 lg:col-span-6 ${
                    isEven ? 'md:order-1' : 'md:order-2'
                  }`}
                >
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/11] rounded-[24px] lg:rounded-[28px] overflow-hidden bg-slate-100 border border-slate-200/80 shadow-[0_12px_36px_-6px_rgba(48,61,104,0.12)] group-hover:shadow-[0_22px_50px_-8px_rgba(48,61,104,0.22)] group-hover:border-[#F9B82E]/40 transition-all duration-500">
                    <Image
                      src={imageUrl}
                      alt={srv.title}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={idx < 2}
                    />
                    {/* Subtle gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#26345C]/50 via-transparent to-transparent opacity-60 pointer-events-none" />

                    {/* Tag badge on image (Desktop) */}
                    {srv.tag && (
                      <div className="hidden md:block absolute top-4 left-4 pointer-events-none">
                        <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-bold text-[#26345C] shadow-sm border border-[#F9B82E]/30">
                          {srv.tag}
                        </span>
                      </div>
                    )}

                    {/* Subtle gold line on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F9B82E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </motion.div>

                {/* ── CONTENT DETAILS COLUMN ── */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={fadeTransition}
                  className={`flex flex-col md:col-span-6 lg:col-span-6 ${
                    isEven ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  {/* Desktop Number + Category Eyebrow */}
                  <div className="hidden md:flex items-center gap-3 mb-4">
                    <span className="text-4xl lg:text-5xl font-black text-[#F9B82E] tracking-tight leading-none">
                      {num}
                    </span>
                    <span className="h-[2px] w-10 bg-gradient-to-r from-[#F9B82E] to-transparent" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#303D68]/80">
                      {srv.category}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#26345C] leading-tight tracking-tight mb-4">
                    {srv.title}
                  </h3>

                  {/* Full Description (Preserved) */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6">
                    {srv.fullDesc || srv.shortDesc}
                  </p>

                  {/* Key Features List */}
                  {srv.features && srv.features.length > 0 && (
                    <div className="space-y-2.5 mb-8 pt-4 border-t border-slate-200/70">
                      {srv.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                          <div className="w-5 h-5 rounded-full bg-[#F9B82E]/15 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-[#26345C] stroke-[2.5]" />
                          </div>
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Link / WhatsApp Inquiry */}
                  <div>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#26345C] text-[#F9B82E] text-xs font-bold uppercase tracking-wider hover:bg-[#F9B82E] hover:text-[#26345C] transition-all duration-300 shadow-sm active:scale-[0.98]"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
