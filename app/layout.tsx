import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Play Slither.io – slithermuncher.xyz',
  description: 'Instant Slither.io in your browser. Fullscreen, mobile-friendly, and no clutter. Play the classic snake game online now.',
  keywords: 'slither.io, snake game, online game, browser game, io game, multiplayer',
  authors: [{ name: 'slithermuncher.xyz' }],
  creator: 'slithermuncher.xyz',
  publisher: 'slithermuncher.xyz',
  robots: 'index, follow',
  canonical: 'https://slithermuncher.xyz/',
  
  // OpenGraph
  openGraph: {
    type: 'website',
    url: 'https://slithermuncher.xyz/',
    title: 'Play Slither.io – slithermuncher.xyz',
    description: 'Instant Slither.io in your browser. Fullscreen, mobile-friendly, and no clutter.',
    siteName: 'slithermuncher.xyz',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Play Slither.io at slithermuncher.xyz',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@slithermuncher',
    creator: '@slithermuncher',
    title: 'Play Slither.io – slithermuncher.xyz',
    description: 'Instant Slither.io in your browser. Fullscreen, mobile-friendly, and no clutter.',
    images: ['/og-image.jpg'],
  },
  
  // App specific
  applicationName: 'slithermuncher.xyz',
  generator: 'Next.js',
  
  // Mobile
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  
  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  
  // Manifest
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://slithergame.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'VideoGame',
              name: 'Slither.io at slithermuncher.xyz',
              description: 'Instant Slither.io in your browser. Fullscreen, mobile-friendly, and no clutter.',
              url: 'https://slithermuncher.xyz/',
              gamePlatform: ['Web Browser', 'Mobile', 'Desktop'],
              applicationCategory: 'Game',
              operatingSystem: 'Any',
              publisher: {
                '@type': 'Organization',
                name: 'slithermuncher.xyz',
                url: 'https://slithermuncher.xyz/'
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'InStock'
              }
            }),
          }}
        />
        
        {/* Security headers via meta (basic CSP) */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; frame-src https://slithergame.io; img-src 'self' data: https://*; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*;" />
      </head>
      <body className={inter.className}>
        {children}
        
        {/* Google Analytics 4 (准备就绪，可配置) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'GA_MEASUREMENT_ID', {
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=None;Secure'
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}