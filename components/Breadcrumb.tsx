'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  name: string
  href: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-slate-500 mx-2" />
            {item.current ? (
              <span className="text-slate-300 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Helper function to generate breadcrumbs for different page types
export function generateBreadcrumbs(type: 'home' | 'blog' | 'post' | 'about' | 'contact', postTitle?: string) {
  switch (type) {
    case 'home':
      return []
    case 'blog':
      return [{ name: 'Blog', href: '/blog', current: true }]
    case 'post':
      return [
        { name: 'Blog', href: '/blog' },
        { name: postTitle || 'Post', href: '#', current: true }
      ]
    case 'about':
      return [{ name: 'About', href: '/about', current: true }]
    case 'contact':
      return [{ name: 'Contact', href: '/contact', current: true }]
    default:
      return []
  }
}
