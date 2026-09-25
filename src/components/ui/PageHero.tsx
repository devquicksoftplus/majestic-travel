import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  tag?: string;
  bgImage?: string;
  breadcrumbs?: { name: string; href: string }[];
}

export default function PageHero({
  title,
  subtitle,
  tag,
  bgImage = 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2400&q=85',
  breadcrumbs = [],
}: PageHeroProps) {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-[#26345C] border-b border-slate-200/20">
      {/* Background Image with Dark Navy Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#26345C] via-[#303D68]/80 to-[#26345C]/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex flex-col items-center">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70 mb-5 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-[#F9B82E]" />
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-[#F9B82E] font-semibold">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        )}

        {tag && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9B82E]/15 border border-[#F9B82E]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#F9B82E]" />
            <span className="text-xs uppercase tracking-wider text-[#F9B82E] font-semibold">
              {tag}
            </span>
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight max-w-5xl leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-white/80 font-normal text-sm sm:text-base max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
