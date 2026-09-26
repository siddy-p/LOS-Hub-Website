import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import '@/styles/globals.css';
import { siteConfig } from '@/lib/config/site.config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fontDisplay = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'LOS Hub',
    'MM2 Lagos Airport',
    'Airport Porter Lagos',
    'Verified Airport Taxi Nigeria',
    'MM2 Lounge Access',
    'Airport Experience Africa',
    'Murtala Muhammed Airport',
    'Executive Airport Transfers',
  ],
  authors: [{ name: 'LOS Hub Team', url: siteConfig.url }],
  creator: 'LOS Hub',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'LOS Hub Airport Experience Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@loshub_af',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className="flex min-h-screen flex-col bg-brand-surface-light text-brand-charcoal antialiased" suppressHydrationWarning>
        <OrganizationSchema />
        <Navbar />
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
