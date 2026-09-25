import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  Sparkles,
  Image as ImageIcon,
  Briefcase,
  ArrowRight,
  Clock,
} from 'lucide-react';
import {
  getTours,
  getUpcomingEvents,
  getExpiredEvents,
  getActivePromotion,
  getGallery,
  getServices,
} from '@/lib/dataService';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const [
    tours,
    upcomingEvents,
    expiredEvents,
    activePromotion,
    gallery,
    services,
  ] = await Promise.all([
    getTours(),
    getUpcomingEvents(),
    getExpiredEvents(),
    getActivePromotion(),
    getGallery(),
    getServices(),
  ]);

  const statCards = [
    {
      title: 'Total Tours',
      count: tours.length,
      href: '/admin/tours',
      icon: MapPin,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-200/60',
    },
    {
      title: 'Upcoming Journeys',
      count: upcomingEvents.length,
      href: '/admin/events',
      icon: Calendar,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-200/60',
    },
    {
      title: 'Expired Journeys',
      count: expiredEvents.length,
      href: '/admin/events',
      icon: Clock,
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      borderColor: 'border-rose-200/60',
    },
    {
      title: 'Active Spotlight',
      count: activePromotion ? activePromotion.destination : 'None',
      href: '/admin/promotions',
      icon: Sparkles,
      bgColor: 'bg-amber-50',
      textColor: 'text-[#B38F1E]',
      borderColor: 'border-amber-200/60',
    },
    {
      title: 'Gallery Items',
      count: gallery.length,
      href: '/admin/gallery',
      icon: ImageIcon,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200/60',
    },
    {
      title: 'Concierge Services',
      count: services.length,
      href: '/admin/services',
      icon: Briefcase,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200/60',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#B38F1E] font-bold">
          Executive Overview
        </span>
        <h1 className="font-sans text-3xl sm:text-4xl font-bold text-[#26345C] mt-1 tracking-tight">
          ADMIN CMS DASHBOARD
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Logged in as <span className="text-[#26345C] font-semibold">{session.email}</span>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-[#D4AF37] transition-all hover:shadow-md group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  {card.title}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl ${card.bgColor} ${card.borderColor} border flex items-center justify-center ${card.textColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline justify-between mt-2">
                <span className="font-sans text-3xl font-bold text-[#26345C]">
                  {card.count}
                </span>
                <span className="text-xs text-[#B38F1E] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Manage <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Promotion Snapshot */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="font-sans text-base font-bold text-[#26345C] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Current Home Page Spotlight</span>
            </h3>
            <Link
              href="/admin/promotions"
              className="text-xs text-[#B38F1E] font-semibold hover:underline"
            >
              Switch Spotlight
            </Link>
          </div>

          {activePromotion ? (
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0 border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activePromotion.imageUrl}
                  alt={activePromotion.destination}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#B38F1E] font-bold">
                  {activePromotion.duration} • {activePromotion.travelDate}
                </span>
                <h4 className="font-sans text-lg font-bold text-[#26345C] mt-0.5">
                  {activePromotion.destination}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                  {activePromotion.tagline}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No active promotion selected.</p>
          )}
        </div>

        {/* Date Expiry Status Snapshot */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="font-sans text-base font-bold text-[#26345C] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Journey Expiry Intelligence</span>
            </h3>
            <Link
              href="/admin/events"
              className="text-xs text-[#B38F1E] font-semibold hover:underline"
            >
              View All Events
            </Link>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
              <span className="text-slate-600 font-medium">
                Active on Public Website (Date &ge; Today):
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full text-xs">
                {upcomingEvents.length} Journeys
              </span>
            </div>
            <div className="flex items-center justify-between text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
              <span className="text-slate-600 font-medium">
                Auto-Expired &amp; Hidden (Date &lt; Today):
              </span>
              <span className="font-bold text-rose-700 bg-rose-100/70 px-2.5 py-1 rounded-full text-xs">
                {expiredEvents.length} Journeys
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
