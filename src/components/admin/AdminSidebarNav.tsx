'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  Image as ImageIcon,
  Briefcase,
  Settings,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: Compass },
  { name: 'Tours', href: '/admin/tours', icon: MapPin },
  { name: 'Events & Expiry', href: '/admin/events', icon: Calendar },
  { name: 'Monthly Spotlight', href: '/admin/promotions', icon: Sparkles },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="p-4 space-y-1.5">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive
                ? 'bg-amber-50/90 text-[#26345C] border-l-4 border-[#D4AF37] shadow-xs'
                : 'text-slate-600 hover:text-[#26345C] hover:bg-slate-50'
            }`}
          >
            <Icon
              className={`w-4 h-4 shrink-0 transition-colors ${
                isActive ? 'text-[#D4AF37]' : 'text-slate-400 group-hover:text-[#D4AF37]'
              }`}
            />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
