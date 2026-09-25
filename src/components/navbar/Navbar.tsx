'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { generateWhatsappLink } from '@/lib/utils';
import { SiteSettings } from '@/types';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

interface NavbarProps {
  settings: SiteSettings;
}

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'EVENT', href: '/events' },
  { name: 'TOURS', href: '/tours' },
  { name: 'SERVICES', href: '/services' },
  { name: 'GALLERY', href: '/gallery' },
  { name: 'ABOUT', href: '/about' },
];

export default function Navbar({ settings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const whatsappHref = generateWhatsappLink(
    settings.whatsappNumber,
    `Hi Majestic Voyages, I would like to plan a trip with you. Please help me with available packages and dates.`
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#26345C] shadow-lg py-3'
            : 'bg-[#303D68] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <Image
              src="/logo.png"
              alt="Majestic Travels"
              width={200}
              height={60}
              priority
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs font-semibold tracking-wider transition-colors duration-200 py-1.5 ${
                    isActive
                      ? 'text-[#F9B82E]'
                      : 'text-white/90 hover:text-[#F9B82E]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F9B82E]"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Phone Help Callout + Gold CTA Button */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2.5 text-right text-white/90 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F9B82E]">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-white/70 font-normal">Need help? Call us</span>
                <span className="text-xs font-bold text-white tracking-wide">{settings.phone}</span>
              </div>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F9B82E] hover:bg-[#F5A623] text-[#26345C] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>INQUIRE</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white focus:outline-none hover:bg-white/20 transition-colors shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#F9B82E]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Animated Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#26345C] px-6 pt-24 pb-8 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-5 pt-4">
              <span className="text-[11px] uppercase tracking-widest text-[#F9B82E] font-bold border-b border-white/10 pb-2">
                Menu
              </span>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className={`block text-xl font-bold tracking-wide transition-colors ${
                      pathname === link.href ? 'text-[#F9B82E]' : 'text-white hover:text-[#F9B82E]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-t border-white/15 pt-6">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-3 text-white text-sm font-semibold"
              >
                <div className="w-9 h-9 rounded-full bg-[#F9B82E] flex items-center justify-center text-[#26345C]">
                  <Phone className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>Call Concierge: {settings.phone}</span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#F9B82E] py-3.5 text-xs font-bold uppercase tracking-wider text-[#26345C] shadow-md hover:bg-[#F5A623] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
