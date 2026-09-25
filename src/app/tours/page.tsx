import { Metadata } from 'next';
import { getActiveTours, getSiteSettings } from '@/lib/dataService';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import PageHero from '@/components/ui/PageHero';
import ToursCatalogClient from '@/components/tours/ToursCatalogClient';

export const metadata: Metadata = {
  title: 'Curated Luxury Tours & Private Expeditions',
  description: 'Explore our catalog of handpicked luxury itineraries across Kashmir, Bali, Vietnam, Andaman, Assam, and world capitals.',
};

export const revalidate = 0;

export default async function ToursPage() {
  const [tours, settings] = await Promise.all([
    getActiveTours(),
    getSiteSettings(),
  ]);

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#303D68]">
      <Navbar settings={settings} />

      <PageHero
        title="EXPLORE OUR TOURS"
        subtitle="Discover breathtaking sanctuaries, royal heritage living, and extraordinary private expeditions worth remembering."
        tag="Curated Voyages"
        breadcrumbs={[{ name: 'Tours', href: '/tours' }]}
        bgImage="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2400&q=85"
      />

      <ToursCatalogClient initialTours={tours} whatsappNumber={settings.whatsappNumber} />

      <Footer settings={settings} />
    </main>
  );
}
