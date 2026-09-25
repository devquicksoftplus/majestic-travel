import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTourBySlug, getSiteSettings } from '@/lib/dataService';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import TourDetailsClient from '@/components/tours/TourDetailsClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return {
      title: 'Tour Not Found',
    };
  }

  return {
    title: `${tour.title} | Majestic Voyages`,
    description: tour.overview,
    openGraph: {
      title: tour.title,
      description: tour.overview,
      images: [tour.imageUrl],
    },
  };
}

export const revalidate = 0;

export default async function TourDetailsPage({ params }: Props) {
  const { slug } = await params;
  const [tour, settings] = await Promise.all([
    getTourBySlug(slug),
    getSiteSettings(),
  ]);

  if (!tour) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#303D68]">
      <Navbar settings={settings} />
      <TourDetailsClient tour={tour} settings={settings} />
      <Footer settings={settings} />
    </main>
  );
}
