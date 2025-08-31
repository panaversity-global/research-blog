'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'
import { Menu, X, Search, BookOpen, Users, Mail, Shield } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/', icon: null },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'Privacy', href: '/privacy', icon: Shield },
    { name: 'Admin', href: '/admin/editor', icon: Shield },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-200">
              TB
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-200">
              TechBlog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Admin Editor Button */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-800/50"
            >
              <Link href="/admin/editor">
                <BookOpen className="mr-2 h-4 w-4" />
                Write Post
              </Link>
            </Button>

            {/* Search Button */}
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              <Link href="/search">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-slate-300 hover:text-white hover:bg-slate-800/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 backdrop-blur-md rounded-lg mt-2 border border-slate-700/50">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Search Link */}
              <Link
                href="/search"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-5 w-5" />
                Search
              </Link>

              {/* Mobile Admin Editor Link */}
              <Link
                href="/admin/editor"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-5 w-5" />
                Write Post
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
