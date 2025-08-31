import Link from 'next/link'
import { Mail, MapPin, Phone, Clock, Twitter, Facebook, Linkedin, Github, Rss } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Search', href: '/search' },
    ],
    resources: [
      { name: 'RSS Feed', href: '/feed.xml' },
      { name: 'Sitemap', href: '/sitemap.xml' },
      { name: 'Latest Posts', href: '/blog' },
      { name: 'Popular Tags', href: '/search' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'DMCA', href: '/dmca' },
    ]
  }

  const social = [
    { name: 'Twitter', href: 'https://twitter.com/techblog', icon: Twitter },
    { name: 'Facebook', href: 'https://facebook.com/techblog', icon: Facebook },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/techblog', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/techblog', icon: Github },
    { name: 'RSS', href: '/feed.xml', icon: Rss },
  ]

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                TB
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TechBlog
              </span>
            </Link>
            <p className="text-slate-400 mb-4 leading-relaxed">
              Modern Development Insights & Best Practices. Discover cutting-edge web development insights, 
              programming tutorials, and industry best practices.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:contact@techblog.com" className="hover:text-blue-400 transition-colors">
                  contact@techblog.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+1-555-0123</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>Mon-Fri 9AM-6PM PST</span>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
            <p className="text-slate-400 text-sm mb-4">
              Get the latest articles and insights delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} TechBlog. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>Made with ❤️ using Next.js</span>
              <span>•</span>
              <span>Powered by Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
