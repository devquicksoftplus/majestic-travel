import { Metadata } from 'next';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';
import { getSiteSettings } from '@/lib/dataService';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy | Majestic Voyages',
  description: 'Learn how Majestic Voyages handles and protects your personal information when you browse our travel packages and inquire about bespoke journeys.',
};

export const revalidate = 0;

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <main className="min-h-screen bg-white text-[#303D68]">
      <Navbar settings={settings} />

      <PageHero
        title="PRIVACY POLICY"
        subtitle="Clear, transparent information about how your personal details are treated when planning journeys with Majestic Voyages."
        tag="Data Protection & Privacy"
        breadcrumbs={[{ name: 'Privacy Policy', href: '/privacy-policy' }]}
        bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
      />

      {/* Legal Document Body */}
      <div className="w-full bg-white">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">

          {/* Effective Date */}
          <div className="flex items-center gap-2 mb-8 text-xs font-medium text-slate-500 uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-[#F9B82E]" />
            <span>Majestic Voyages &mdash; Last Updated: September 18, 2026</span>
          </div>

          {/* Introductory Overview */}
          <p className="text-base sm:text-lg text-slate-600 leading-[1.8] mb-12 max-w-3xl">
            Majestic Voyages, founded in 2016 in Erode, Tamil Nadu, India, operates this website as an
            informational and travel concierge platform. We are committed to safeguarding the privacy and
            personal information of every traveler, guest, and visitor. This Privacy Policy outlines the
            types of information we may collect, how it is used to plan and facilitate your travel
            experiences, and the steps we take to protect your data. By visiting our website or
            communicating with our travel coordinators, you acknowledge the terms described herein.
          </p>

          <hr className="border-slate-200 mb-12" />

          {/* SECTION 1 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 1 &mdash; Information We Collect
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Information We Collect</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              We only collect personal information that is relevant and necessary to fulfill your inquiries,
              craft tailored travel packages, and facilitate logistics. Our website is primarily
              informational: visitors can freely browse our curated packages, services, upcoming journeys,
              and travel gallery without creating an account or registering personal profiles.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 2 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 2 &mdash; Information You Provide
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Information You Provide</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              When you choose to inquire about a holiday package, request a custom tour quotation, or
              consult our concierge team, you may voluntarily provide personal details. Depending on your
              communication channel (WhatsApp, telephone, or email), this may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-[1.75]">
              <li>Your full name and title</li>
              <li>Contact phone or WhatsApp number</li>
              <li>Email address</li>
              <li>Preferred travel destinations, group size, and tentative travel dates</li>
              <li>Budget preferences, accommodation categories, and transit preferences</li>
              <li>Specialized requests (dietary requirements, elderly mobility assistance, or celebratory milestones)</li>
              <li>Government identification or documentation details — only when necessary and requested directly for confirmed air tickets, train reservations, hotel check-ins, or visa applications</li>
            </ul>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 3 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 3 &mdash; Information Collected Automatically
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Information Collected Automatically</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              When you access our website, standard web server communication protocols may automatically
              record basic technical data essential for transmitting web pages and maintaining server
              security. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-[1.75]">
              <li>Internet Protocol (IP) address</li>
              <li>Browser type and version</li>
              <li>Operating system and device category</li>
              <li>Referring URLs, pages requested, and server timestamps</li>
            </ul>
            <p className="text-slate-600 leading-[1.75] mt-4">
              This information is used solely for technical troubleshooting, network performance monitoring,
              and defense against malicious network activity. It is not linked to personal identities.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 4 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 4 &mdash; How We Use Your Information
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">How We Use Information</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              Any details provided to Majestic Voyages are used strictly for legitimate business and travel
              curation purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-[1.75]">
              <li>Designing customized day-wise itineraries tailored to your preferences</li>
              <li>Providing accurate pricing quotes, inclusions, and package availability</li>
              <li>Coordinating confirmed reservations with third-party service providers (airlines, hotels, local transport, guides)</li>
              <li>Communicating updates, flight schedules, hotel vouchers, and travel tips</li>
              <li>Responding to your direct questions, feedback, and customer support inquiries</li>
              <li>Maintaining accurate administrative, invoicing, and accounting records</li>
            </ul>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 5 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 5 &mdash; Travel & Booking Inquiries
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Travel &amp; Booking Inquiries</h3>
            <p className="text-slate-600 leading-[1.75]">
              Our website serves as a showcase of our travel capabilities and curated packages. Submitting
              an inquiry or initiating a chat does not automatically confirm a booking or charge any
              payment. All bookings and contractual agreements are finalized through direct personal
              communication with our travel planners, ensuring you receive all necessary terms,
              cancellation policies, and payment instructions beforehand.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 6 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 6 &mdash; Communications
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Communications</h3>
            <p className="text-slate-600 leading-[1.75]">
              We value your time and do not engage in spam marketing. We will only contact you through
              your specified communication preference (WhatsApp, telephone, or email) in response to your
              explicit inquiry or in direct relation to your upcoming journey. You may notify us at any
              time if you wish to discontinue conversations.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 7 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 7 &mdash; WhatsApp & External Messaging
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">WhatsApp &amp; External Communication Links</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              Our website provides clickable links to WhatsApp (operated by Meta Platforms, Inc.) to offer
              instant concierge assistance. When you click a WhatsApp link, you leave our website and
              access an external third-party application.
            </p>
            <p className="text-slate-600 leading-[1.75]">
              Any messages, voice notes, media files, or contact details shared via WhatsApp are governed
              by WhatsApp&apos;s own Terms of Service and Privacy Policy. Majestic Voyages uses WhatsApp
              solely as an interactive communication tool and does not control Meta&apos;s platform
              infrastructure.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 8 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 8 &mdash; Cookies & Similar Technologies
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Cookies &amp; Similar Technologies</h3>
            <ul className="list-disc pl-6 space-y-3 text-slate-600 leading-[1.75]">
              <li>
                <strong className="text-[#303D68]">Public Visitors:</strong> The public areas of this
                website do not deploy third-party advertising cookies, marketing tracking pixels, or
                profiling trackers.
              </li>
              <li>
                <strong className="text-[#303D68]">Administrative Portal:</strong> A secure, HTTP-only
                authentication cookie is used strictly for authorized administrators logging into the
                internal management portal. This cookie is essential for session security and is not
                used for general visitors.
              </li>
              <li>
                <strong className="text-[#303D68]">Browser Local Storage:</strong> Minor non-sensitive
                preferences (such as presentation states or loader indicators) may be stored locally
                within your browser to enhance responsiveness.
              </li>
            </ul>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 9 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 9 &mdash; Third-Party Services
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Third-Party Services</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              To provide comprehensive travel services—including flights, resort stays, train transit, and
              visa assistance—Majestic Voyages coordinates with independent suppliers. These may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-[1.75]">
              <li>Commercial airlines and flight consolidators</li>
              <li>Hotels, resorts, homestays, and boutique accommodations</li>
              <li>Rail and coach transport providers</li>
              <li>Authorized ground handling partners, certified local drivers, and licensed tour guides</li>
              <li>Embassies, consulates, and authorized visa processing centers (when document assistance is requested)</li>
            </ul>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 10 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 10 &mdash; Data Sharing
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Data Sharing</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              We do not sell, rent, or trade your personal information to third-party marketing firms or
              data brokers. Personal information is disclosed strictly on a need-to-know basis to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-[1.75]">
              <li>Fulfill confirmed travel reservations (such as submitting passenger names and identification to an airline or hotel partner)</li>
              <li>Comply with applicable statutory legal obligations, court orders, or governmental requests</li>
              <li>Protect the rights, safety, and property of our travelers, team members, or the public in emergency situations</li>
            </ul>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 11 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 11 &mdash; Data Security
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Data Security</h3>
            <p className="text-slate-600 leading-[1.75]">
              We implement reasonable administrative and technical security measures to protect your
              personal details against unauthorized access, loss, misuse, or alteration. All web traffic
              to our website is served using encrypted HTTPS protocols. While we strive to protect your
              data, no internet transmission or electronic storage method can guarantee absolute security.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 12 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 12 &mdash; Data Retention
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Data Retention</h3>
            <p className="text-slate-600 leading-[1.75]">
              We retain communication records and travel inquiry information only as long as reasonably
              required to fulfill the purposes for which it was gathered, including planning your tour,
              servicing active bookings, resolving disputes, and adhering to financial, tax, and
              regulatory record-keeping laws.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 13 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 13 &mdash; Your Privacy Rights
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Your Privacy Rights</h3>
            <p className="text-slate-600 leading-[1.75] mb-4">
              Depending on applicable data privacy laws, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-[1.75]">
              <li>Request confirmation of whether we hold personal contact records regarding you</li>
              <li>Request correction of inaccurate or incomplete contact information</li>
              <li>Request deletion of your inquiry correspondence or contact information, subject to statutory retention requirements</li>
              <li>Opt out of future communications at any time</li>
            </ul>
            <p className="text-slate-600 leading-[1.75] mt-4">
              To exercise any of these rights, please reach out directly to our concierge team using the
              contact details provided below.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 14 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 14 &mdash; Children&apos;s Privacy
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Children&apos;s Privacy</h3>
            <p className="text-slate-600 leading-[1.75]">
              Our website is intended for general audiences and adult travelers. We do not knowingly
              solicit or collect personal data directly from children under the age of 18 without parental
              or guardian consent. Inquiries regarding family holidays, minor travelers, or school group
              tours must be submitted by adult parents, teachers, or authorized institutional guardians.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 15 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 15 &mdash; External Links
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">External Links</h3>
            <p className="text-slate-600 leading-[1.75]">
              Our website may contain hyperlinks to external websites, including social media platforms
              (such as Instagram, Facebook, YouTube, Twitter, and LinkedIn) or third-party travel
              partners. We do not operate or control these third-party platforms and are not responsible
              for their content or privacy practices. We encourage you to review their respective privacy
              policies before sharing information.
            </p>
          </section>

          <hr className="border-slate-100 mb-12" />

          {/* SECTION 16 */}
          <section className="mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 16 &mdash; Changes to This Policy
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Changes to This Privacy Policy</h3>
            <p className="text-slate-600 leading-[1.75]">
              We may periodically update this Privacy Policy to reflect operational improvements, changes
              in our travel offerings, or applicable legal requirements. The &quot;Last Updated&quot; date
              at the top of this document indicates when revisions were made. Any revisions become
              effective immediately upon posting to this page.
            </p>
          </section>

          <hr className="border-slate-200 mb-12" />

          {/* SECTION 17 — Contact Us */}
          <section className="mb-4">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#F9B82E] mb-3">
              Section 17 &mdash; Contact Us
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#26345C] mb-4">Contact Us</h3>
            <p className="text-slate-600 leading-[1.75] mb-8">
              If you have questions, feedback, or requests regarding this Privacy Policy or how your
              travel inquiry details are managed, please reach out to us:
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
