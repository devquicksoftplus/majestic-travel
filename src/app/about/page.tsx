import { Metadata } from 'next';
import Image from 'next/image';
import { Award, ShieldCheck } from 'lucide-react';
import { getSiteSettings } from '@/lib/dataService';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import PageHero from '@/components/ui/PageHero';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Our Story & Heritage | Majestic Voyages',
  description: 'Learn about the philosophy, history, and bespoke luxury travel service that defines Majestic Voyages since 2016.',
};

export const revalidate = 0;

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#303D68]">
      <Navbar settings={settings} />

      <PageHero
        title="THE STORY BEHIND THE JOURNEY"
        subtitle="A journey built around people, places & memories. Established in 2016 in Erode, Tamil Nadu."
        tag="Heritage & Philosophy"
        breadcrumbs={[{ name: 'About Us', href: '/about' }]}
        bgImage="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2400&q=85"
      />

      {/* Storytelling Composition */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Photography (5 cols) */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="right">
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85"
                  alt="Majestic Voyages Editorial Philosophy"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#26345C]/90 via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-wider text-[#F9B82E] font-semibold block">
                    Founded 2016 &bull; Erode
                  </span>
                  <p className="text-lg font-bold text-white mt-1">
                    Every detail felt effortless.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Narrative (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9B82E]/15 border border-[#F9B82E]/30 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F9B82E]" />
                <span className="text-xs uppercase tracking-wider text-[#26345C] font-semibold">
                  Our Story
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#303D68] leading-[1.15] tracking-tight">
                A JOURNEY BUILT AROUND <br className="hidden sm:inline" />
                <span className="text-[#F9B82E]">PEOPLE, PLACES &amp; MEMORIES.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-6">
                Majestic Voyages was founded in 2016 in Erode, Tamil Nadu with a clear purpose: to make world-class travel personalized, stress-free, and accessible for everyone. We believe every journey should be customized to the traveler&apos;s comfort, schedule, and preferences.
              </p>

              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                Over the past {settings.experienceYears}+ years, we have had the privilege of organizing dream vacations for more than {settings.happyTravelers.toLocaleString()}+ satisfied travelers across domestic and international destinations—including Kashmir, Andaman, Assam, Sikkim, Darjeeling, Bangkok, Pattaya, Bali, Vietnam, and beyond.
              </p>

              {/* Core Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 mt-8 border-t border-slate-200/80">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#26345C] shrink-0 shadow-xs">
                    <Award className="w-5 h-5 text-[#26345C]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#303D68]">Bespoke Precision</h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 leading-relaxed">Every itinerary is hand-tailored to your exact cadence, comfort, and private preferences.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#26345C] shrink-0 shadow-xs">
                    <ShieldCheck className="w-5 h-5 text-[#26345C]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#303D68]">Discreet Care</h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 leading-relaxed">Attentive on-ground assistance and 24/7 personal support across all routes.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Oversized Statistics (Using Existing Database Values) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 sm:px-8 lg:px-12 my-6">
        <div className="rounded-3xl bg-[#26345C] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 text-center">
            <ScrollReveal delay={0.1}>
              <span className="text-4xl sm:text-6xl font-bold text-[#F9B82E] block leading-none">
                {settings.experienceYears}+
              </span>
              <span className="text-xs uppercase tracking-wider text-white/80 mt-3 block font-semibold">
                Years of Experience
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <span className="text-4xl sm:text-6xl font-bold text-[#F9B82E] block leading-none">
                {settings.happyTravelers.toLocaleString()}+
              </span>
              <span className="text-xs uppercase tracking-wider text-white/80 mt-3 block font-semibold">
                Happy Travelers
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <span className="text-4xl sm:text-6xl font-bold text-[#F9B82E] block leading-none">
                {settings.destinationsCount}+
              </span>
              <span className="text-xs uppercase tracking-wider text-white/80 mt-3 block font-semibold">
                Destinations
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <span className="text-4xl sm:text-6xl font-bold text-[#F9B82E] block leading-none">
                {settings.satisfactionRate}%
              </span>
              <span className="text-xs uppercase tracking-wider text-white/80 mt-3 block font-semibold">
                Satisfaction Rate
              </span>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal direction="right">
            <div className="p-8 sm:p-12 rounded-3xl border border-slate-200/80 bg-white shadow-sm h-full">
              <span className="text-xs uppercase tracking-wider text-[#F9B82E] font-semibold block">
                Our Purpose
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#303D68] mt-2">
                OUR MISSION
              </h3>
              <p className="text-sm text-slate-600 font-normal leading-relaxed mt-4">
                To provide completely customized, reliable, and comfortable travel experiences. We help travelers discover the joy of journeying on their own terms—offering flexible dates, tailored itineraries, and dependable 24/7 personal support.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="p-8 sm:p-12 rounded-3xl border border-slate-200/80 bg-white shadow-sm h-full">
              <span className="text-xs uppercase tracking-wider text-[#F9B82E] font-semibold block">
                Our Horizon
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#303D68] mt-2">
                OUR VISION
              </h3>
              <p className="text-sm text-slate-600 font-normal leading-relaxed mt-4">
                To be the most customer-centric travel partner in Tamil Nadu and across India, renowned for memorable holiday packages, honest guidance, and lasting traveler relationships built over years of trusted service.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}
