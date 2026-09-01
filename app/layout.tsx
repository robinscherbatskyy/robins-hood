import type { Metadata } from 'next';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Robin’s Hood | Technology, Systems & Trust",
  description: 'A living, visual field guide to business, systems, software, data, artificial intelligence, security, governance, risk, industries and professional practice.',
  icons: { icon: `${basePath}/favicon.png`, apple: `${basePath}/apple-touch-icon.png` },
  openGraph: {
    title: 'Robin’s Hood',
    description: 'Technology, systems & trust, connected.',
    type: 'website',
    images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: 'Robin’s Hood | Technology, systems and trust connected' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Robin’s Hood',
    description: 'Technology, systems & trust, connected.',
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
