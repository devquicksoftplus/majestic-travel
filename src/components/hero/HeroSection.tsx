'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Headphones, ChevronDown } from 'lucide-react';
import { generateWhatsappLink } from '@/lib/utils';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

interface HeroSlide {
  location: string;
  subtitle: string;
  title: string;
  category: string;
  image: string;
  slug: string;
}

const heroSlides: HeroSlide[] = [
  {
    location: 'Erode, Tamil Nadu',
    title: "Explore with Majestic Travels, Erode's Trusted Travel Experts",
    subtitle: 'Customized holiday packages, international escapes & bespoke group journeys',
    category: 'Your Journey Begins Here',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2400&q=90',
    slug: 'kashmir-crown-of-paradise',
  },
  {
    location: 'Himalayas, India',
    title: 'Discover Kashmir, the Crown of Paradise',
    subtitle: 'Alpine lakes, snow-capped peaks and vibrant saffron meadows',
    category: 'Crown of Paradise',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2400&q=90',
    slug: 'kashmir-crown-of-paradise',
  },
  {
    location: 'Southeast Asia, Indonesia',
    title: 'Private Tropical Sanctuaries in Bali',
    subtitle: 'Rainforest infinity pool villas and sacred coastal horizons',
    category: 'Island of the Gods',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=90',
    slug: 'bali-luxury-island-escape',
  },
  {
    location: 'Indochina, Vietnam',
    title: 'Karsts & Emerald Waters of Ha Long Bay',
    subtitle: 'Ha Long Bay 5-star yacht cruises & ancient lanterns',
    category: 'Beyond The Ordinary',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=90',
    slug: 'vietnam-grand-indochine',
  },
  {
    location: 'Bay of Bengal, India',
    title: 'Turquoise Lagoons & Coral Reefs in Andaman',
    subtitle: 'Secluded white sand coves and pristine marine tranquility',
    category: 'Emerald Islands',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=90',
    slug: 'andaman-emerald-islands-luxury',
  },
];

/**
 * Travel destination images for the ZoomParallax cinematic showcase.
 * Drawn from the same destinations featured in the hero slideshow.
 */
const parallaxImages = [
  {
    // Center — Kashmir Dal Lake (main focal image)
    src: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85',
    alt: 'Kashmir — Dal Lake and Himalayan peaks',
  },
  {
    // Bali — Rice terraces & jungle
    src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85',
    alt: 'Bali — Sacred rice terraces at sunset',
  },
  {
    // Kerala — Backwaters houseboat
    src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
    alt: 'Kerala — Alleppey backwaters houseboat',
  },
  {
    // Andaman — Turquoise waters
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    alt: 'Andaman — Crystal-clear turquoise lagoon',
  },
  {
    // Rajasthan — Desert palace at golden hour
    src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=85',
    alt: 'Rajasthan — Golden palace at dusk',
  },
  {
    // Maldives — Overwater bungalows
    src: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85',
    alt: 'Maldives — Overwater villas on turquoise lagoon',
  },
  {
    // Dubai — Skyline at night
    src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
    alt: 'Dubai — Iconic skyline and desert luxe',
  },
];

interface HeroSectionProps {
  whatsappNumber: string;
}

export default function HeroSection({ whatsappNumber }: HeroSectionProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroSlides.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentIdx];

  const whatsappHref = generateWhatsappLink(
    whatsappNumber,
    `Hi Majestic Voyages, I would like to plan a trip with you to ${slide.subtitle}. Please share package options.`
  );

  return (
    <>
      {/* ─── 1. CINEMATIC HERO SLIDESHOW ─────────────────────────────────────── */}
      <section className="relative h-[88vh] min-h-[640px] max-h-[850px] w-full overflow-hidden flex items-center bg-[#26345C]">
        {/* Background Image Carousel with Ken Burns Subtle Zoom */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        </AnimatePresence>

        {/* Subtle Navy Gradient Overlay (Bright & readable, not completely dark) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#26345C]/90 via-[#303D68]/40 to-[#303D68]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#26345C]/80 via-[#303D68]/40 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
          <div className="max-w-3xl">
            {/* Small Floating Eyebrow Label */}
            <motion.div
              key={`loc-${slide.title}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-[#F9B82E]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-white uppercase font-sans">
                YOUR JOURNEY BEGINS HERE
              </span>
            </motion.div>

            {/* Main Heading in Poppins Bold (700) matching screenshot */}
            <motion.h1
              key={`h1-${slide.title}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-sans text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-bold text-white tracking-tight leading-[1.12] sm:leading-[1.15]"
            >
              {slide.title}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              key={`sub-${slide.title}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-sans text-base sm:text-lg md:text-xl text-white/90 font-normal mt-5 leading-relaxed"
            >
              {slide.subtitle}. Beautiful places, thoughtfully crafted journeys.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/tours"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-lg bg-[#F9B82E] hover:bg-[#F5A623] text-[#26345C] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>EXPLORE TOURS</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-sm transition-all duration-300"
              >
                <span>INQUIRE ON WHATSAPP</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Carousel Indicator */}
        <div className="absolute bottom-8 right-6 sm:right-10 z-10 flex items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIdx ? 'w-8 bg-[#F9B82E]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll nudge — invites user to discover the cinematic section below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50"
          aria-hidden="true"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </section>

      {/* ─── 2. ZOOM PARALLAX CINEMATIC DESTINATION SHOWCASE ─────────────────── */}
      {/*
          This section creates the immersive scroll-based zoom parallax effect.
          It sits directly below the hero, using a dark navy background so the
          layered travel images feel cinematic and on-brand.

          On mobile / prefers-reduced-motion: the parallax container collapses to
          a simple 100vh section showing only the center image, preventing both
          performance issues and excessive page length on small screens.
      */}
      <section
        aria-label="Cinematic destination showcase"
        className="relative bg-[#1A2340] motion-reduce:hidden"
      >
        {/* Section heading — anchored above the sticky parallax */}
        <div className="sticky top-0 z-20 pointer-events-none select-none">
          {/* Luxury label pinned top-left during scroll */}
          <div className="absolute top-8 left-6 sm:left-10 flex flex-col gap-1">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-[#F9B82E] uppercase">
              <span className="w-4 h-px bg-[#F9B82E]" />
              Majestic Voyages Destinations
            </span>
          </div>

          {/* Centered label */}
          <div className="flex items-center justify-center pt-8 pb-0">
            <p className="text-[10px] sm:text-xs tracking-[0.22em] text-white/30 uppercase font-medium">
              Scroll to explore
            </p>
          </div>
        </div>

        {/* The parallax component — dark overlay ensures branding cohesion */}
        <div className="relative">
          {/* Dark navy vignette over the images */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-[#1A2340]/40" />
          <ZoomParallax images={parallaxImages} />
        </div>

        {/* Bottom transition gradient into next section */}
        <div className="h-24 bg-gradient-to-b from-[#1A2340] to-[#F7F8FA]" />
      </section>

      {/* Mobile fallback — replaces the 300vh parallax with a static image grid */}
      <section
        aria-label="Destination highlights"
        className="hidden motion-reduce:block bg-[#1A2340] py-12 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] tracking-[0.22em] text-[#F9B82E] uppercase mb-8 font-medium">
            Majestic Voyages Destinations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {parallaxImages.slice(0, 6).map(({ src, alt }, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. TRUST SECTION ────────────────────────────────────────────────── */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 -mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-7 rounded-xl bg-white border border-gray-200/80 luxury-travel-shadow luxury-travel-shadow-hover flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#F9B82E]/15 border border-[#F9B82E]/30 flex items-center justify-center text-[#303D68] mb-4">
              <Compass className="w-7 h-7 text-[#F9B82E]" />
            </div>
            <h3 className="font-sans text-lg font-bold text-[#303D68]">
              Professional Tour Guide
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#4A4F5A] mt-2.5 leading-relaxed font-normal">
              Licensed tour professionals who are knowledgeable, multilingual, and trained to enhance your journey with safety, insight, and fun.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-7 rounded-xl bg-white border border-gray-200/80 luxury-travel-shadow luxury-travel-shadow-hover flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#F9B82E]/15 border border-[#F9B82E]/30 flex items-center justify-center text-[#303D68] mb-4">
              <ShieldCheck className="w-7 h-7 text-[#F9B82E]" />
            </div>
            <h3 className="font-sans text-lg font-bold text-[#303D68]">
              Personalized Tour Planning
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#4A4F5A] mt-2.5 leading-relaxed font-normal">
              Majestic Voyages crafts customized itineraries from Erode tailored around your preferred dates, budget, and travel preferences.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-7 rounded-xl bg-white border border-gray-200/80 luxury-travel-shadow luxury-travel-shadow-hover flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#F9B82E]/15 border border-[#F9B82E]/30 flex items-center justify-center text-[#303D68] mb-4">
              <Headphones className="w-7 h-7 text-[#F9B82E]" />
            </div>
            <h3 className="font-sans text-lg font-bold text-[#303D68]">
              24/7 Premium Support
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#4A4F5A] mt-2.5 leading-relaxed font-normal">
              From emergency adjustments to hotel check-in assistance, our concierge support ensures complete peace of mind throughout your entire trip.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
