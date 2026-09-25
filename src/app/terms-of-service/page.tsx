import { Metadata } from 'next';
import { Scale, Phone, Mail, MapPin, AlertCircle } from 'lucide-react';
import { getSiteSettings } from '@/lib/dataService';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Terms of Service | Majestic Voyages',
  description: 'Review the terms and conditions governing the use of the Majestic Voyages website, travel inquiries, and customized holiday curation services.',
};

export const revalidate = 0;

export default async function TermsOfServicePage() {
  const settings = await getSiteSettings();

  return (
    <main className="min-h-screen bg-white text-[#303D68]">
      <Navbar settings={settings} />

      <PageHero
        title="TERMS OF SERVICE"
        subtitle="General terms and conditions governing your access to our website, tour packages, and travel concierge services."
        tag="User Agreement"
        breadcrumbs={[{ name: 'Terms of Service', href: '/terms-of-service' }]}
        bgImage="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2400&q=85"
      />

      {/* Legal Document Body */}
      <div className="w-full bg-white">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">

          {/* Effective Date */}
          <div className="flex items-center gap-2 mb-8 text-xs font-medium text-slate-500 uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-[#F9B82E]" />
            <span>Majestic Voyages &mdash; Last Updated: September 18, 2026</span>
          </div>

          {/* Introductory Overview */}
          <p className="text-base sm:text-lg text-slate-600 leading-[1.8] mb-12 max-w-3xl">
            Welcome to Majestic Voyages, founded in 2016 in Erode, Tamil Nadu, India. We specialize in
            crafting personalized holiday packages, small group expeditions, flight and transit bookings,
            hotel reservations, and bespoke travel concierge services. These Terms of Service govern
            your access to and use of our website, as well as all inquiries, consultations, and
            itineraries arranged through our team. Please read them carefully before using our website
            or engaging our services.
          </p>

          <hr className="border-slate-200 mb-12" />

          {/* SECTION 1 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 1 &mdash; Acceptance of Terms
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Acceptance of Terms</h3>
            <p className="text-slate-600 leading-[1.75]">
              By accessing, browsing, or using our website, or by engaging our travel concierge services
              via WhatsApp, telephone, or email, you confirm that you have read, understood, and agreed
              to be bound by these Terms. If you do not agree with any part of these Terms, you should
              discontinue use of the website and our services.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 2 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 2 &mdash; About Our Website
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">About Our Website</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              This website is an informational and inquiry showcase designed to exhibit sample itineraries,
              featured destinations, logistics capabilities (including flight ticketing, hotel accommodations,
              rail/bus booking, school tours, and passport/visa guidance), and past traveler experiences.
            </p>
            <p className="text-slate-600 leading-[1.75]">
              The website does not provide direct online automated checkout or automated purchasing. All
              bookings, quotations, and scheduling are managed directly by our travel planners through
              personal consultation.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 3 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 3 &mdash; Travel Information
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Travel Information</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              We strive to keep destination overviews, weather guidance, suggested travel seasons, and
              travel advice on our website accurate and inspiring. However, travel conditions—including
              regional weather patterns, local safety guidelines, entry regulations, and facility
              operating hours—are subject to frequent change.
            </p>
            <p className="text-slate-600 leading-[1.75]">
              Travelers are strongly encouraged to verify current entry criteria, foreign exchange rules,
              and health guidelines with relevant embassies, consulates, or local authorities prior to
              departure.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 4 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 4 &mdash; Tour Information
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Tour Information</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              Tour packages and itineraries displayed on our website represent curated sample itineraries.
              Because we emphasize personalized travel, specific day-wise schedules, sightseeing sequences,
              included activities, and meal arrangements are customized during your individual consultation.
            </p>
            <p className="text-slate-600 leading-[1.75]">
              Published tour itineraries may be adapted or altered without prior notice due to weather
              conditions, road closures, national holidays, flight rescheduling, or safety considerations.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 5 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 5 &mdash; Service Inquiries
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Service Inquiries</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              Visitors can initiate travel inquiries through our WhatsApp Concierge links, telephone
              calls, or email. Submitting an inquiry or engaging in preliminary planning discussions does
              not constitute a binding booking or guarantee accommodation or flight availability.
            </p>
            <p className="text-slate-600 leading-[1.75]">
              A booking is only initiated once our team provides an official quotation, you confirm
              acceptance, and any agreed reservation terms are satisfied.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 6 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 6 &mdash; Bookings & Reservations
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Bookings and Reservations</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              Specific booking conditions, advance payment schedules, reservation confirmations, and
              hotel/flight voucher issuance will be communicated clearly at the time of inquiry or
              booking.
            </p>
            <p className="text-slate-600 leading-[1.75]">
              Reservations are subject to seat availability, room allocations, and confirmation by our
              third-party airline, hotel, and land-transport partners.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 7 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 7 &mdash; Pricing & Availability
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Pricing and Availability</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              Any prices displayed on the website or promotional banners are indicative starting prices
              based on double occupancy, seasonality, and standard availability at the time of publication.
            </p>
            <p className="text-slate-600 leading-[1.75]">
              Actual travel costs depend on specific dates of travel, airfare fluctuations, fuel
              surcharges, foreign exchange rates, group size, and room category availability. Final
              pricing is confirmed in writing by our team prior to booking commitment.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 8 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 8 &mdash; Payments
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Payments</h3>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200/80 mb-5">
              <AlertCircle className="w-4 h-4 text-[#F9B82E] mt-0.5 shrink-0" />
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#303D68]">Payment Notice:</strong> Majestic Voyages does not
                collect credit card numbers or process automated debit transactions directly through
                this website.
              </p>
            </div>
            <p className="text-slate-600 leading-[1.75]">
              Authorized payment methods, installment schedules, and official banking transfer details
              are provided directly by our travel planners via official invoice or booking confirmation.
              Specific booking, payment, and settlement conditions will be communicated at the time of
              inquiry or booking.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 9 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 9 &mdash; Cancellations & Refunds
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Cancellations and Refunds</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              Specific booking, cancellation, refund, and payment conditions may vary by service or
              booking and will be communicated at the time of inquiry or booking.
            </p>
            <p className="text-slate-600 leading-[1.75] mb-4">
              Because travel packages combine services from independent airlines, rail operators, resorts,
              and local ground handlers, cancellation eligibility and any applicable refund amounts are
              strictly subject to the individual cancellation policies imposed by those underlying
              suppliers.
            </p>
            <p className="text-slate-600 leading-[1.75]">
              Non-refundable flight tickets, peak-season hotel surcharges, visa processing fees, and
              government levies are typically non-recoverable once booked or submitted.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 10 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 10 &mdash; User Responsibilities
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">User Responsibilities</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              As a traveler, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-[1.75]">
              <li>You are responsible for providing complete, accurate passenger details matching your government identification or passport.</li>
              <li>You are solely responsible for obtaining and maintaining valid travel documentation, including passports (with at least six months validity from travel date), visas, transit permissions, vaccination certificates, and travel insurance.</li>
              <li>You must comply with airline check-in timelines, baggage restrictions, airport customs protocols, and local laws of destination countries.</li>
              <li>You are responsible for reviewing and verifying all vouchers, flight tickets, and travel confirmations immediately upon receipt from our team.</li>
            </ul>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 11 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 11 &mdash; Third-Party Services
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Third-Party Services &amp; Suppliers</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              Majestic Voyages acts as a travel curator and coordinator. Transportation, accommodations,
              excursions, and logistics are provided by independent third parties—including commercial
              airlines, railways, bus operators, hotels, and local ground activity providers.
            </p>
            <p className="text-slate-600 leading-[1.75]">
              These independent providers operate under their own terms, conditions, and contracts of
              carriage. Majestic Voyages does not own, control, or operate these third-party businesses.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 12 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 12 &mdash; External Links
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">External Links</h3>
            <p className="text-slate-600 leading-[1.75]">
              Our website includes links to third-party services and social media pages (such as
              WhatsApp, Instagram, Facebook, and YouTube). These links are provided for your convenience.
              We do not endorse, manage, or monitor external platforms and accept no liability for their
              content, availability, or policies.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 13 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 13 &mdash; Intellectual Property
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Intellectual Property</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              The Majestic Voyages name, brand identity, website layout, graphics, text descriptions,
              and compilation are the property of Majestic Voyages or its licensors and are protected
              by applicable copyright, trademark, and intellectual property laws.
            </p>
            <p className="text-slate-600 leading-[1.75]">
              You may access and view the website solely for personal, non-commercial use. Reproducing,
              republishing, modifying, or distributing website content without prior written permission
              is prohibited.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 14 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 14 &mdash; Website Availability
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Website Availability</h3>
            <p className="text-slate-600 leading-[1.75]">
              We strive to keep our website operational and accessible around the clock. However, we do
              not guarantee uninterrupted, secure, or error-free operation. We reserve the right to
              modify, suspend, or discontinue any aspect of the website or its content at any time
              without notice for maintenance, updates, or server adjustments.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 15 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 15 &mdash; Limitation of Liability
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Limitation of Liability</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              To the fullest extent permitted by applicable law, Majestic Voyages, its proprietors, and
              its representatives shall not be liable for any indirect, incidental, special, or
              consequential damages resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-[1.75]">
              <li>Your access to or inability to access this website</li>
              <li>Flight delays, cancellations, baggage loss, or schedule alterations by third-party carriers</li>
              <li>Acts of God, adverse weather, natural disasters, political unrest, strikes, border closures, epidemics, or force majeure events</li>
              <li>Personal injury, property loss, or damage incurred during travel activities operated by third-party providers</li>
              <li>Inaccurate or incomplete information supplied by travelers</li>
            </ul>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 16 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 16 &mdash; Changes to These Terms
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Changes to These Terms</h3>
            <p className="text-slate-600 leading-[1.75]">
              We reserve the right to amend or update these Terms of Service at any time. Updated
              versions will be posted on this page with an updated &quot;Last Updated&quot; date.
              Continued use of our website or services following any updates signifies your acceptance
              of the revised Terms.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 17 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 17 &mdash; Governing Law
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Governing Law</h3>
            <p className="text-slate-600 leading-[1.75]">
              These Terms of Service and any contractual relationship formed with Majestic Voyages shall
              be governed by and construed in accordance with the laws of India. Any legal disputes or
              claims arising out of or in connection with our services shall be subject to the exclusive
              jurisdiction of the competent courts in Tamil Nadu, India.
            </p>
          </section>

          <hr className="border-slate-200 mb-12" />

          {/* SECTION 18 — Contact Us */}
          <section className="mb-4">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 18 &mdash; Contact Us
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Contact Us</h3>
            <p className="text-slate-600 leading-[1.75] mb-8">
              For questions regarding these Terms of Service, package inquiries, or booking
              clarifications, please contact our concierge team:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#F9B82E]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#303D68]">Call / WhatsApp</span>
                </div>
                <span className="text-sm text-slate-700 font-medium">{settings.phone}</span>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#F9B82E]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#303D68]">Email</span>
                </div>
                <span className="text-sm text-slate-700 font-medium">{settings.email}</span>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F9B82E]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#303D68]">Location</span>
                </div>
                <span className="text-sm text-slate-700 font-medium">{settings.address}</span>
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer settings={settings} />
    </main>
  );
}
