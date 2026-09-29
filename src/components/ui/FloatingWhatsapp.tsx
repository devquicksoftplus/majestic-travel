'use client';

import { motion } from 'framer-motion';
import { generateWhatsappLink } from '@/lib/utils';
import { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';

interface FloatingWhatsappProps {
  phone: string;
  defaultMessage?: string;
}

export default function FloatingWhatsapp({
  phone,
  defaultMessage = 'Hi Majestic Voyages, I would like to plan a customized trip. Please help me with the available destinations and package options.',
}: FloatingWhatsappProps) {
  const [isHovered, setIsHovered] = useState(false);
  const href = generateWhatsappLink(phone, defaultMessage);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Animated Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10, scale: 0.95 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10, scale: isHovered ? 1 : 0.95 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none hidden sm:flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/95 px-4 py-2 text-xs font-medium text-zinc-800 shadow-xl backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
        </span>
        Chat on WhatsApp • {phone}
      </motion.div>

      {/* Main Floating Button */}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.4)] transition-shadow duration-300 hover:shadow-[0_6px_24px_rgba(37,211,102,0.6)] focus:outline-none"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-14 h-14" />
      </motion.a>
    </div>
  );
}
