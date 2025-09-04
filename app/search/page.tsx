import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import SearchInterface from '@/components/SearchInterface'

export const metadata: Metadata = {
  title: 'Search - Panaversity',
  description: 'Search through our collection of web development articles, programming tutorials, and technology insights.',
  keywords: ['search', 'blog search', 'article search', 'web development search', 'programming search'],
  openGraph: {
    title: 'Search - Panaversity',
    description: 'Search through our collection of web development articles, programming tutorials, and technology insights.',
    url: 'https://panaversity.org/search',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Search%20-%20Panaversity&description=Search%20through%20our%20collection%20of%20articles',
        width: 1200,
        height: 630,
        alt: 'Search - Panaversity'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search - Panaversity',
    description: 'Search through our collection of web development articles, programming tutorials, and technology insights.',
    images: ['/api/og?title=Search%20-%20Panaversity&description=Search%20through%20our%20collection%20of%20articles']
  },
  alternates: {
    canonical: 'https://panaversity.org/search'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
        {/* Page Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Search <span className="text-gradient">Articles</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find exactly what you're looking for in our extensive collection of web development articles, 
            programming tutorials, and technology insights.
          </p>
        </header>

        {/* Search Interface */}
        <Suspense fallback={
          <div className="space-y-8">
            <div className="card animate-pulse">
              <div className="h-12 bg-gray-300 rounded mb-4"></div>
              <div className="h-8 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        }>
          <SearchInterface />
        </Suspense>
      </div>
    </div>
  )
}
