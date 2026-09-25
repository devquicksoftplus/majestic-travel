import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { SiteSettings } from '@/types';
import { generateWhatsappLink } from '@/lib/utils';

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const whatsappHref = generateWhatsappLink(
    settings.whatsappNumber,
    'Hi Majestic Voyages, I would like to plan a bespoke customized journey.'
  );

  return (
    <footer className="relative bg-[#1E294B] border-t border-white/10 text-white/80 pt-16 sm:pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center group w-fit">
              <Image
                src="/logo.png"
                alt="Majestic Travels"
                width={200}
                height={60}
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="text-xs sm:text-sm text-white/75 font-normal leading-relaxed max-w-sm">
              Founded in 2016 in Erode, Tamil Nadu. Dedicated to crafting personalized holiday packages, small group expeditions, and luxury travel experiences tailored around your life.
            </p>
          </div>

          {/* Navigation (3 cols) */}
          <div className="lg:col-span-3 lg:col-start-6 flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-wider uppercase text-[#F9B82E]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-white/75">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Upcoming Journeys
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-white transition-colors">
                  Curated Tours
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Concierge Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Visual Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Concierge (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-wider uppercase text-[#F9B82E]">
              Concierge
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-normal text-white/75">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#F9B82E] shrink-0 mt-0.5" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#F9B82E] shrink-0 mt-0.5" />
                <span>{settings.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F9B82E] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#F9B82E] hover:text-white transition-colors"
              >
                <span>Direct WhatsApp Concierge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-white/60">
          <p>&copy; {new Date().getFullYear()} Majestic Voyages. Founded 2016, Erode. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
