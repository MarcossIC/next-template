import { openSans } from '@styles/font';
import type { Metadata, Viewport } from 'next';
import '@styles/globals.css';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { getBaseUrl } from 'utils';

export const viewport: Viewport = {
  width: 'device-width',
  minimumScale: 1,
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  title: 'Next Template',
  applicationName: 'Next Template',
  description: 'Next boilerplate app',
  robots: 'index, follow',
  authors: [{ name: 'Marcos Lopez', url: 'https://marcosic.netlify.app' }],
  keywords: ['nextjs', 'boilerplate', 'fast development'],
  category: 'template',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
  openGraph: {
    title: 'Next Template',
    description: 'Next boilerplate app',
    url: `${getBaseUrl()}/`,
    siteName: 'Next Template',
    type: 'website',
    images: '',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@MarcosssIC',
    title: 'Next Template',
    description: 'Next boilerplate app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(openSans.className, openSans.variable)}>{children}</body>
    </html>
  );
}
