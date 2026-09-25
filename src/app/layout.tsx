import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { getSiteSettings } from '@/lib/dataService';
import FloatingWhatsapp from '@/components/ui/FloatingWhatsapp';
import InitialLoader from '@/components/ui/InitialLoader';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
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
    <html lang="en" className={`${poppins.variable} font-sans scroll-smooth`}>
      <body className={`${poppins.className} bg-white text-[#4A4F5A] font-sans antialiased selection:bg-[#F9B82E]/30 selection:text-[#303D68]`}>
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
