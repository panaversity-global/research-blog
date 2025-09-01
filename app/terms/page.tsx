import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - TechBlog',
  description: 'Read our Terms of Service to understand the rules and guidelines for using TechBlog services and content.',
  keywords: [
    'terms of service',
    'terms and conditions',
    'user agreement',
    'legal terms',
    'website terms',
    'blog terms'
  ],
  openGraph: {
    title: 'Terms of Service - TechBlog',
    description: 'Read our Terms of Service to understand the rules and guidelines for using TechBlog services and content.',
    url: 'https://techblog.com/terms',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Terms%20of%20Service%20-%20TechBlog&description=Legal%20terms%20and%20conditions',
        width: 1200,
        height: 630,
        alt: 'Terms of Service - TechBlog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - TechBlog',
    description: 'Read our Terms of Service to understand the rules and guidelines for using TechBlog services and content.',
    images: ['/api/og?title=Terms%20of%20Service%20-%20TechBlog&description=Legal%20terms%20and%20conditions']
  },
  alternates: {
    canonical: 'https://techblog.com/terms'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div id="top" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        {/* Page Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before using our website and services.
          </p>
          <div className="mt-6 text-gray-500">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </header>

        {/* Terms Content */}
        <div className="prose prose-lg max-w-none">
          <div className="card">
            <div className="p-8 space-y-8">
              
              {/* Acceptance of Terms */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using TechBlog ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              {/* Use License */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of the materials (information or software) on TechBlog for personal, 
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on TechBlog</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>

              {/* Disclaimer */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
                <p className="text-gray-600 leading-relaxed">
                  The materials on TechBlog are provided on an 'as is' basis. TechBlog makes no warranties, expressed or implied, and hereby 
                  disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, 
                  fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              {/* Limitations */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
                <p className="text-slate-300 leading-relaxed">
                  In no event shall TechBlog or its suppliers be liable for any damages (including, without limitation, damages for loss of data 
                  or profit, or due to business interruption) arising out of the use or inability to use the materials on TechBlog, even if 
                  TechBlog or a TechBlog authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              {/* Accuracy of Materials */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Accuracy of Materials</h2>
                <p className="text-slate-300 leading-relaxed">
                  The materials appearing on TechBlog could include technical, typographical, or photographic errors. TechBlog does not warrant 
                  that any of the materials on its website are accurate, complete, or current. TechBlog may make changes to the materials 
                  contained on its website at any time without notice.
                </p>
              </section>

              {/* Links */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Links</h2>
                <p className="text-slate-300 leading-relaxed">
                  TechBlog has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. 
                  The inclusion of any link does not imply endorsement by TechBlog of the site. Use of any such linked website is at the user's own risk.
                </p>
              </section>

              {/* Modifications */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Modifications</h2>
                <p className="text-slate-300 leading-relaxed">
                  TechBlog may revise these terms of service for its website at any time without notice. By using this website you are agreeing 
                  to be bound by the then current version of these Terms of Service.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
                <p className="text-slate-300 leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably 
                  submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
              </section>

              {/* User Content */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. User Content</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  By posting content to TechBlog, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and 
                  distribute such content on and through TechBlog. You retain any and all of your rights to any content you submit, post, or 
                  display on or through TechBlog and you are responsible for protecting those rights.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  You represent and warrant that the content you submit does not violate the privacy rights, publicity rights, copyrights, 
                  contract rights, or any other rights of any person.
                </p>
              </section>

              {/* Privacy Policy */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Privacy Policy</h2>
                <p className="text-slate-300 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Website, to understand 
                  our practices.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
                <p className="text-slate-300 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@techblog.com<br />
                    <strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105<br />
                    <strong>Phone:</strong> +1-555-0123
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-12">
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            Back to Top
          </a>
        </div>
      </div>
    </div>
  )
}
