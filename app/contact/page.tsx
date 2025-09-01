import type { Metadata, Viewport } from 'next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Globe } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us - TechBlog',
  description: 'Get in touch with the TechBlog team. We\'d love to hear from you about collaborations, feedback, or any questions you might have.',
  keywords: ['contact us', 'get in touch', 'techblog contact', 'collaboration', 'feedback', 'support'],
  openGraph: {
    title: 'Contact Us - TechBlog',
    description: 'Get in touch with the TechBlog team. We\'d love to hear from you about collaborations, feedback, or any questions you might have.',
    url: 'https://techblog.com/contact',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Contact%20Us%20-%20TechBlog&description=Get%20in%20touch%20with%20our%20team',
        width: 1200,
        height: 630,
        alt: 'Contact Us - TechBlog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - TechBlog',
    description: 'Get in touch with the TechBlog team. We\'d love to hear from you about collaborations, feedback, or any questions you might have.',
    images: ['/api/og?title=Contact%20Us%20-%20TechBlog&description=Get%20in%20touch%20with%20our%20team']
  },
  alternates: {
    canonical: 'https://techblog.com/contact'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@techblog.com',
      description: 'Send us an email anytime',
      link: 'mailto:contact@techblog.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 012-3456',
      description: 'Mon-Fri from 9am to 6pm',
      link: 'tel:+15550123456'
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'San Francisco, CA',
      description: 'Visit us in person',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: 'Within 24 hours',
      description: 'We\'ll get back to you quickly',
      link: '#'
    }
  ]

  const socialLinks = [
    {
      name: 'Twitter',
      handle: '@techblog',
      url: 'https://twitter.com/techblog',
      icon: MessageSquare
    },
    {
      name: 'LinkedIn',
      handle: 'TechBlog',
      url: 'https://linkedin.com/company/techblog',
      icon: Users
    },
    {
      name: 'GitHub',
      handle: 'techblog',
      url: 'https://github.com/techblog',
      icon: Globe
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
        {/* Hero Section */}
        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a question, suggestion, or want to collaborate? We'd love to hear from you. 
            Our team is always ready to help and engage with our community.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="card card-hover">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <info.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <a 
                        href={info.link} 
                        className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        {info.value}
                      </a>
                      <p className="text-gray-500 text-sm mt-1">{info.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Follow Us</CardTitle>
                <CardDescription className="text-gray-600">
                  Stay connected with us on social media for the latest updates and insights.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                      <social.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{social.name}</div>
                      <div className="text-gray-500 text-sm">{social.handle}</div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Office Hours</CardTitle>
                <CardDescription className="text-gray-600">
                  When you can expect to hear back from us.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="text-gray-900">9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-gray-900">10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-900">Closed</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-gray-500 text-sm">
                    For urgent matters outside business hours, please email us and we'll respond as soon as possible.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">How quickly do you respond?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, we'll get back to you as soon as possible.
                </p>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Do you accept guest posts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! We're always looking for quality content from the developer community. 
                  Please reach out with your topic idea and we'll discuss collaboration opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Can I suggest article topics?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutely! We love hearing from our readers about topics they'd like us to cover. 
                  Your suggestions help shape our content strategy.
                </p>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Do you offer consulting services?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we provide technical consulting for businesses and startups. 
                  Contact us to discuss your specific needs and how we can help.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
