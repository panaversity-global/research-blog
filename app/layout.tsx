import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://techblog.com'),
  title: {
    default: 'TechBlog - Modern Development Insights & Best Practices',
    template: '%s | TechBlog'
  },
  description: 'Discover cutting-edge web development insights, programming tutorials, and industry best practices. Stay ahead with our expert analysis and practical guides.',
  keywords: [
    'web development',
    'programming',
    'software engineering',
    'frontend development',
    'backend development',
    'full-stack development',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'database design',
    'API development',
    'cloud computing',
    'devops',
    'software architecture',
    'coding best practices',
    'technology trends',
    'developer tools'
  ],
  authors: [
    { name: 'TechBlog Team', url: 'https://techblog.com' }
  ],
  creator: 'TechBlog Team',
  publisher: 'TechBlog',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'technology',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techblog.com',
    siteName: 'TechBlog',
    title: 'TechBlog - Modern Development Insights & Best Practices',
    description: 'Discover cutting-edge web development insights, programming tutorials, and industry best practices. Stay ahead with our expert analysis and practical guides.',
    images: [
      {
        url: '/api/og?title=TechBlog%20-%20Modern%20Development%20Insights',
        width: 1200,
        height: 630,
        alt: 'TechBlog - Modern Development Insights & Best Practices',
        type: 'image/png'
      }
    ]
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    site: '@techblog',
    creator: '@techblog',
    title: 'TechBlog - Modern Development Insights & Best Practices',
    description: 'Discover cutting-edge web development insights, programming tutorials, and industry best practices.',
    images: ['/api/og?title=TechBlog%20-%20Modern%20Development%20Insights']
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
    'twitter:site': '@techblog',
    'twitter:creator': '@techblog',
    
    // Additional Open Graph
    'og:email': 'contact@techblog.com',
    'og:phone_number': '+1-555-0123',
    'og:fax_number': '+1-555-0124',
    'og:locale:alternate': ['es_ES', 'fr_FR', 'de_DE'],
    
    // Article specific
    'article:publisher': 'https://www.facebook.com/techblog',
    'article:author': 'https://www.facebook.com/techblog',
    
    // Business
    'business:contact_data:street_address': '123 Tech Street',
    'business:contact_data:locality': 'San Francisco',
    'business:contact_data:region': 'CA',
    'business:contact_data:postal_code': '94105',
    'business:contact_data:country_name': 'United States',
    'business:contact_data:phone_number': '+1-555-0123',
    'business:contact_data:email': 'contact@techblog.com',
    'business:contact_data:website': 'https://techblog.com',
    
    // Place
    'place:location:latitude': '37.7749',
    'place:location:longitude': '-122.4194',
    
    // Book
    'book:author': 'TechBlog Team',
    'book:isbn': '978-0-123456-78-9',
    'book:release_date': '2024-01-01',
    'book:tag': ['technology', 'programming', 'web development']
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
    title: 'TechBlog',
  },
  

  
  // Alternates
  alternates: {
    canonical: 'https://techblog.com',
    languages: {
      'en-US': 'https://techblog.com',
      'es-ES': 'https://techblog.com/es',
      'fr-FR': 'https://techblog.com/fr',
      'de-DE': 'https://techblog.com/de',
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
              "name": "TechBlog",
              "url": "https://techblog.com",
              "logo": "https://techblog.com/logo.png",
              "description": "Modern Development Insights & Best Practices",
              "foundingDate": "2024",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Tech Street",
                "addressLocality": "San Francisco",
                "addressRegion": "CA",
                "postalCode": "94105",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-0123",
                "contactType": "customer service",
                "email": "contact@techblog.com"
              },
              "sameAs": [
                "https://twitter.com/techblog",
                "https://facebook.com/techblog",
                "https://linkedin.com/company/techblog",
                "https://github.com/techblog"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
