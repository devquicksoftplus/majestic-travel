import {
  getActiveTours,
  getUpcomingEvents,
  getActivePromotion,
  getGallery,
  getActiveServices,
  getTestimonials,
  getSiteSettings,
} from '@/lib/dataService';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import HeroSection from '@/components/hero/HeroSection';
import IntroductionSection from '@/components/home/IntroductionSection';
import PromotionSection from '@/components/home/PromotionSection';
import DestinationsSection from '@/components/home/DestinationsSection';
import SplitExperienceSection from '@/components/home/SplitExperienceSection';
import ServicesSection from '@/components/home/ServicesSection';
import SpecificAskSection from '@/components/home/SpecificAskSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import CustomizeTripSection from '@/components/home/CustomizeTripSection';
import UpcomingEventsSection from '@/components/home/UpcomingEventsSection';
import ParallaxQuoteSection from '@/components/home/ParallaxQuoteSection';
import GalleryPreviewSection from '@/components/home/GalleryPreviewSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FinalCTASection from '@/components/home/FinalCTASection';
import EventModalPopup from '@/components/home/EventModalPopup';

export const revalidate = 0;

export default async function HomePage() {
  const [
    tours,
    events,
    activePromotion,
    gallery,
    services,
    testimonials,
    settings,
  ] = await Promise.all([
    getActiveTours(),
    getUpcomingEvents(),
    getActivePromotion(),
    getGallery(),
    getActiveServices(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#303D68]">
      {/* Dynamic Active Event Popup Dialogue */}
      <EventModalPopup events={events} />

      <Navbar settings={settings} />

      {/* 1. Cinematic Hero */}
      <HeroSection whatsappNumber={settings.whatsappNumber} />

      {/* 2. Introduction & Floating Stats */}
      <IntroductionSection settings={settings} />

      {/* 3. Featured Monthly Tour Promotion */}
      {activePromotion && (
        <PromotionSection
          promotion={activePromotion}
          whatsappNumber={settings.whatsappNumber}
        />
      )}

      {/* 4. Popular Destinations */}
      <DestinationsSection
        tours={tours}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* 5. Domestic vs International Split */}
      <SplitExperienceSection />

      {/* 6. Benefits of Travel (Majestic Voyages Content) */}
      <BenefitsSection />

      {/* 7. Specific Ask: Tailored Travel Solutions For Every Traveler */}
      <SpecificAskSection whatsappNumber={settings.whatsappNumber} />

      {/* 8. Comprehensive Services */}
      <ServicesSection services={services} />

      {/* 9. Your Journey, Your Way (Customization Focus) */}
      <CustomizeTripSection whatsappNumber={settings.whatsappNumber} />

      {/* 9. Upcoming Events with Date Expiry Logic */}
      <UpcomingEventsSection
        events={events}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* 10. Parallax Quote */}
      <ParallaxQuoteSection />

      {/* 11. Artistic Photo Gallery Preview */}
      <GalleryPreviewSection gallery={gallery} />

      {/* 12. Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 13. Final CTA */}
      <FinalCTASection whatsappNumber={settings.whatsappNumber} />

      <Footer settings={settings} />
    </main>
  );
}
