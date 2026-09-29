import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { getSiteSettings } from '@/lib/dataService';
import FloatingWhatsapp from '@/components/ui/FloatingWhatsapp';
import InitialLoader from '@/components/ui/InitialLoader';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: `${settings.websiteName} | Customized Travel & Holiday Packages from Erode`,
      template: `%s | ${settings.websiteName}`,
    },
    description: settings.tagline,
    keywords: [
      'Majestic Voyages Erode',
      'Travel Agency in Erode',
      'Customized Tour Packages',
      'Kashmir Holiday Packages',
      'Andaman Tour Packages',
      'Assam Wildlife Tours',
      'Sikkim Darjeeling Tours',
      'Bangkok Pattaya Packages',
      'Bali Tour Packages',
      'Vietnam Travel Packages',
      'Honeymoon Packages',
      'Family Vacations',
      'School Group Tours',
      'Corporate Group Travel',
      'Bespoke Holiday Packages'
    ],
    openGraph: {
      title: settings.websiteName,
      description: settings.tagline,
      type: 'website',
      locale: 'en_IN',
      siteName: settings.websiteName,
    },
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
    },
    manifest: '/site.webmanifest',
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${plusJakartaSans.variable} font-sans scroll-smooth`}>
      <body className={`${plusJakartaSans.className} bg-[#F8F3EA] text-[#5B4638] font-sans antialiased selection:bg-[#C89B3C]/30 selection:text-[#3A2315]`}>
        <InitialLoader />
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          {children}
        </div>
        <FloatingWhatsapp
          phone={settings.whatsappNumber}
          defaultMessage={settings.defaultWhatsappMessage}
        />
      </body>
    </html>
  );
}
