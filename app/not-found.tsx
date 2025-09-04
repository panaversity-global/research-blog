import type { Viewport } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-slate-700/50">404</div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-slate-300 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track to discovering amazing content.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="btn-primary">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Popular Pages</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/search" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
              Search
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12">
          <Button 
            variant="ghost" 
            className="text-slate-400 hover:text-white hover:bg-slate-800/50"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
