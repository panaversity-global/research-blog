import Link from 'next/link'
import { Mail, MapPin, Phone, Clock, Twitter, Facebook, Linkedin, Github } from 'lucide-react'
import { SITE_CONTENT } from '@/lib/content'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                {SITE_CONTENT.site.name.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {SITE_CONTENT.site.name}
              </span>
            </Link>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {SITE_CONTENT.footer.description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <a href={`mailto:${SITE_CONTENT.contact.email}`} className="hover:text-blue-600 transition-colors">
                  {SITE_CONTENT.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>{SITE_CONTENT.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{SITE_CONTENT.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>{SITE_CONTENT.contact.supportHours}</span>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {SITE_CONTENT.navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {SITE_CONTENT.navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              {SITE_CONTENT.navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <h3 className="text-gray-900 font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {SITE_CONTENT.social.platforms.map((platform) => {
                const IconComponent = getIconComponent(platform.name)
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={platform.description}
                  >
                    <span className="sr-only">{platform.name}</span>
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="max-w-md">
            <h3 className="text-gray-900 font-semibold mb-2">{SITE_CONTENT.newsletter.title}</h3>
            <p className="text-gray-600 text-sm mb-4">
              {SITE_CONTENT.newsletter.description}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={SITE_CONTENT.newsletter.placeholder}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                {SITE_CONTENT.newsletter.button}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              {SITE_CONTENT.footer.copyright.replace('2025', currentYear.toString())}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span>{SITE_CONTENT.footer.madeWith}</span>
              <span>•</span>
              <span>{SITE_CONTENT.footer.poweredBy}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Helper function to get icon components
function getIconComponent(platformName: string) {
  switch (platformName.toLowerCase()) {
    case 'twitter':
      return Twitter
    case 'facebook':
      return Facebook
    case 'linkedin':
      return Linkedin
    case 'github':
      return Github
    default:
      return Twitter
  }
}
