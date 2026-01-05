import { Outfit } from 'next/font/google';
import './globals.css';
import Providers from '@/state/Providers';
import { ToastContainer } from 'react-toastify';
import { UserEventsProvider } from '@/state/EventsContext';
import { AuthProvider } from '@/state/AuthProvider';

const outfit = Outfit({ subsets: ['latin'] });
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ticketa | Premium Event Experiences',
  description:
    'Discover and book the best events near you. Concerts, conferences, and immersive experiences.',
  metadataBase: new URL('https://ticketa.vercel.app'),
  openGraph: {
    title: 'Ticketa | Premium Event Experiences',
    description: 'Discover and book the best events near you.',
    url: 'https://ticketa.vercel.app',
    siteName: 'Ticketa',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ticketa | Premium Event Experiences',
    description: 'Discover and book the best events near you.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={outfit.className}>
        <Providers>
          <AuthProvider>
            <UserEventsProvider>
              <main>{children}</main>
            </UserEventsProvider>
          </AuthProvider>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
