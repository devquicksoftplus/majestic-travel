import { Metadata } from 'next';
import { getActiveServices, getSiteSettings } from '@/lib/dataService';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import PageHero from '@/components/ui/PageHero';
import ServicesAlternating from '@/components/services/ServicesAlternating';

export const metadata: Metadata = {
  title: 'Travel Services & VIP Concierge',
  description: 'Full-service luxury travel logistics including private tour design, passport & visa assistance, premium flights, and 5-star hotel bookings.',
};

export const revalidate = 0;

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getActiveServices(),
    getSiteSettings(),
  ]);

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#303D68]">
      <Navbar settings={settings} />

      <PageHero
        title="EVERY DETAIL. TAKEN CARE OF."
        subtitle="Uncompromising attention to detail across every facet of global travel, from private yacht charters to expedited visa clearances."
        tag="End-to-End Concierge"
        breadcrumbs={[{ name: 'Services', href: '/services' }]}
        bgImage="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2400&q=85"
      />

      <ServicesAlternating services={services} whatsappNumber={settings.whatsappNumber} />

      <Footer settings={settings} />
    </main>
  );
}
