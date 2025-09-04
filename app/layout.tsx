import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE_CONTENT } from '@/lib/content'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || `https://${SITE_CONTENT.site.domain}`),
  title: {
    default: `${SITE_CONTENT.site.name} - ${SITE_CONTENT.site.tagline}`,
    template: `%s | ${SITE_CONTENT.site.name}`
  },
  description: SITE_CONTENT.site.description,
  keywords: SITE_CONTENT.seo.keywords,
  authors: [
    { name: `${SITE_CONTENT.site.name} Team`, url: `https://${SITE_CONTENT.site.domain}` }
  ],
  creator: `${SITE_CONTENT.site.name} Team`,
  publisher: SITE_CONTENT.site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: SITE_CONTENT.business.industry.toLowerCase(),
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://${SITE_CONTENT.site.domain}`,
    siteName: SITE_CONTENT.site.name,
    title: `${SITE_CONTENT.site.name} - ${SITE_CONTENT.site.tagline}`,
    description: SITE_CONTENT.site.description,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(`${SITE_CONTENT.site.name} - ${SITE_CONTENT.site.tagline}`)}`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONTENT.site.name} - ${SITE_CONTENT.site.tagline}`,
        type: 'image/png'
      }
    ]
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    site: SITE_CONTENT.contact.social.twitter.handle,
    creator: SITE_CONTENT.contact.social.twitter.handle,
    title: `${SITE_CONTENT.site.name} - ${SITE_CONTENT.site.tagline}`,
    description: SITE_CONTENT.site.description,
    images: [`/api/og?title=${encodeURIComponent(`${SITE_CONTENT.site.name} - ${SITE_CONTENT.site.tagline}`)}`]
  },
  
  // Additional metadata
  other: {
    'application-name': 'TechBlog',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'TechBlog',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-TileColor': '#0f172a',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#0f172a',
    
    // Verification
    'google-site-verification': 'your-google-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
    
    // Social Media
    'twitter:site': SITE_CONTENT.contact.social.twitter.handle,
    'twitter:creator': SITE_CONTENT.contact.social.twitter.handle,
    
    // Additional Open Graph
    'og:email': SITE_CONTENT.contact.email,
    'og:phone_number': SITE_CONTENT.contact.phone,
    'og:fax_number': SITE_CONTENT.contact.fax,
    'og:locale:alternate': ['es_ES', 'fr_FR', 'de_DE'],
    
    // Article specific
    'article:publisher': SITE_CONTENT.contact.social.facebook.url,
    'article:author': SITE_CONTENT.contact.social.facebook.url,
    
    // Business
    'business:contact_data:street_address': SITE_CONTENT.business.address.street,
    'business:contact_data:locality': SITE_CONTENT.business.address.city,
    'business:contact_data:region': SITE_CONTENT.business.address.state,
    'business:contact_data:postal_code': SITE_CONTENT.business.address.zip,
    'business:contact_data:country_name': SITE_CONTENT.business.address.country,
    'business:contact_data:phone_number': SITE_CONTENT.contact.phone,
    'business:contact_data:email': SITE_CONTENT.contact.email,
    'business:contact_data:website': `https://${SITE_CONTENT.site.domain}`,
    
    // Place
    'place:location:latitude': SITE_CONTENT.business.address.coordinates.latitude,
    'place:location:longitude': SITE_CONTENT.business.address.coordinates.longitude,
    
    // Book
    'book:author': `${SITE_CONTENT.site.name} Team`,
    'book:isbn': '978-0-123456-78-9',
    'book:release_date': '2024-01-01',
    'book:tag': SITE_CONTENT.seo.categories
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#0f172a',
      },
    ],
  },
  
  // Manifest
  manifest: '/site.webmanifest',
  
  // Apple Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_CONTENT.site.name,
  },
  

  
  // Alternates
  alternates: {
    canonical: `https://${SITE_CONTENT.site.domain}`,
    languages: {
      'en-US': `https://${SITE_CONTENT.site.domain}`,
      'es-ES': `https://${SITE_CONTENT.site.domain}/es`,
      'fr-FR': `https://${SITE_CONTENT.site.domain}/fr`,
      'de-DE': `https://${SITE_CONTENT.site.domain}/de`,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/api/og" as="fetch" crossOrigin="anonymous" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": SITE_CONTENT.site.name,
              "url": `https://${SITE_CONTENT.site.domain}`,
              "logo": `https://${SITE_CONTENT.site.domain}/logo.webp`,
              "description": SITE_CONTENT.site.description,
              "foundingDate": SITE_CONTENT.site.founded,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": SITE_CONTENT.business.address.street,
                "addressLocality": SITE_CONTENT.business.address.city,
                "addressRegion": SITE_CONTENT.business.address.state,
                "postalCode": SITE_CONTENT.business.address.zip,
                "addressCountry": SITE_CONTENT.business.address.countryCode
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": SITE_CONTENT.contact.phone,
                "contactType": "customer service",
                "email": SITE_CONTENT.contact.email
              },
              "sameAs": [
                SITE_CONTENT.contact.social.twitter.url,
                SITE_CONTENT.contact.social.facebook.url,
                SITE_CONTENT.contact.social.linkedin.url,
                SITE_CONTENT.contact.social.github.url
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
