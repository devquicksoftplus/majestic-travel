import { Metadata } from 'next';
import { getGallery, getSiteSettings } from '@/lib/dataService';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import PageHero from '@/components/ui/PageHero';
import GalleryClient from '@/components/gallery/GalleryClient';

export const metadata: Metadata = {
  title: 'Visual Chronicles & Photo Gallery',
  description: 'Glimpse the breathtaking landscapes, secluded pool villas, and unforgettable memories captured on Majestic Voyages expeditions.',
};

export const revalidate = 0;

export default async function GalleryPage() {
  const [gallery, settings] = await Promise.all([
    getGallery(),
    getSiteSettings(),
  ]);

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#303D68]">
      <Navbar settings={settings} />

      <PageHero
        title="MOMENTS WORTH REMEMBERING"
        subtitle="A visual chronicle of our journeys across misty Himalayan peaks, secluded tropical sanctuaries, and historic imperial citadels."
        tag="VISUAL CHRONICLES"
        breadcrumbs={[{ name: 'Gallery', href: '/gallery' }]}
        bgImage="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=85"
      />

      <GalleryClient initialGallery={gallery} />

      <Footer settings={settings} />
    </main>
  );
}
