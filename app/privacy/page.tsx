import type { Metadata, Viewport } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, Lock, Database, Globe, Mail } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy - TechBlog',
  description: 'Learn how TechBlog collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
  keywords: ['privacy policy', 'data protection', 'personal information', 'cookies', 'techblog privacy'],
  openGraph: {
    title: 'Privacy Policy - TechBlog',
    description: 'Learn how TechBlog collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
    url: 'https://techblog.com/privacy',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Privacy%20Policy%20-%20TechBlog&description=Learn%20how%20we%20protect%20your%20privacy',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy - TechBlog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - TechBlog',
    description: 'Learn how TechBlog collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
    images: ['/api/og?title=Privacy%20Policy%20-%20TechBlog&description=Learn%20how%20we%20protect%20your%20privacy']
  },
  alternates: {
    canonical: 'https://techblog.com/privacy'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function PrivacyPage() {
  const lastUpdated = 'January 15, 2024'
  
  const privacyPrinciples = [
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We are transparent about what data we collect, how we use it, and who we share it with. No hidden agendas or secret data collection.'
    },
    {
      icon: Lock,
      title: 'User Control',
      description: 'You have full control over your personal data. You can request access, correction, or deletion of your information at any time.'
    },
    {
      icon: Database,
      title: 'Minimal Collection',
      description: 'We only collect the data necessary to provide our services and improve your experience. We don\'t collect unnecessary personal information.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-slate-400 mt-4">
            Last updated: {lastUpdated}
          </p>
        </header>

        {/* Privacy Principles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Our Privacy Principles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {privacyPrinciples.map((principle, index) => (
              <Card key={index} className="card card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg">
                      <principle.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{principle.title}</h3>
                      <p className="text-slate-300 text-sm">{principle.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Policy Content */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <div>
                <h4 className="font-semibold text-white mb-2">Information You Provide</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Contact information (name, email address) when you subscribe to our newsletter</li>
                  <li>Comments and feedback you submit on our articles</li>
                  <li>Information you provide when contacting us through our contact forms</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Automatically Collected Information</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>IP address and general location information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Provide and maintain our blog services</li>
                <li>Send you newsletters and updates (with your consent)</li>
                <li>Respond to your comments and inquiries</li>
                <li>Improve our website and user experience</li>
                <li>Analyze website usage and trends</li>
                <li>Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>With trusted service providers who assist us in operating our website (under strict confidentiality agreements)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and recommendations</li>
                <li>Improve website performance and security</li>
              </ul>
              <p className="text-sm">
                You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality.
              </p>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>We implement appropriate technical and organizational measures to protect your personal information:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to certain types of processing</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
              </ul>
              <p className="text-sm">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:privacy@techblog.com" className="text-blue-400 hover:text-blue-300 underline">
                  privacy@techblog.com
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Our website may contain links to third-party services and use third-party tools:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Google Analytics for website analytics</li>
                <li>Social media platforms for sharing content</li>
                <li>Email service providers for newsletters</li>
                <li>Comment systems for user interactions</li>
              </ul>
              <p className="text-sm">
                These services have their own privacy policies. We encourage you to review them before using these services.
              </p>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. 
                If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          {/* International Transfers */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Your personal information may be transferred to and processed in countries other than your own. 
                We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                We may update this privacy policy from time to time to reflect changes in our practices or applicable laws. 
                We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date.
              </p>
              <p className="text-sm">
                We encourage you to review this policy periodically to stay informed about how we protect your information.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <a href="mailto:privacy@techblog.com" className="text-blue-400 hover:text-blue-300 underline">
                    privacy@techblog.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <a href="/contact" className="text-blue-400 hover:text-blue-300 underline">
                    Contact Form
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-slate-400 text-sm">
            This privacy policy is effective as of {lastUpdated}. For previous versions, please contact us.
          </p>
          <div className="mt-4">
            <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
              ← Back to Home
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
