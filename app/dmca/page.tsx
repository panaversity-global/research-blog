import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'DMCA Policy - TechBlog',
  description: 'Learn about our DMCA policy and how to report copyright infringement on TechBlog.',
  keywords: [
    'dmca',
    'copyright',
    'copyright infringement',
    'dmca policy',
    'intellectual property',
    'legal'
  ],
  openGraph: {
    title: 'DMCA Policy - TechBlog',
    description: 'Learn about our DMCA policy and how to report copyright infringement on TechBlog.',
    url: 'https://techblog.com/dmca',
    type: 'website',
    images: [
      {
        url: '/api/og?title=DMCA%20Policy%20-%20TechBlog&description=Copyright%20infringement%20reporting%20procedures',
        width: 1200,
        height: 630,
        alt: 'DMCA Policy - TechBlog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DMCA Policy - TechBlog',
    description: 'Learn about our DMCA policy and how to report copyright infringement on TechBlog.',
    images: ['/api/og?title=DMCA%20Policy%20-%20TechBlog&description=Copyright%20infringement%20reporting%20procedures']
  },
  alternates: {
    canonical: 'https://techblog.com/dmca'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div id="top" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        {/* Page Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            DMCA Policy
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            TechBlog respects the intellectual property rights of others and expects its users to do the same.
          </p>
          <div className="mt-6 text-slate-400">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </header>

        {/* DMCA Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="card">
            <div className="p-8 space-y-8">
              
              {/* Overview */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-slate-300 leading-relaxed">
                  In accordance with the Digital Millennium Copyright Act of 1998 (the text of which may be found on the U.S. 
                  Copyright Office website at{' '}
                  <a href="https://www.copyright.gov/legislation/dmca.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                    https://www.copyright.gov/legislation/dmca.pdf
                  </a>
                  ), TechBlog will respond expeditiously to claims of copyright infringement committed using the TechBlog service 
                  and/or the TechBlog website (the "Site") if such claims are reported to TechBlog's Designated Copyright Agent.
                </p>
              </section>

              {/* Copyright Infringement Notification */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Copyright Infringement Notification</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If you are a copyright owner, or are authorized to act on behalf of one, or authorized to act under any 
                  exclusive right under copyright, please report alleged copyright infringements taking place on or through 
                  the Site by completing the following DMCA Notice of Alleged Infringement and delivering it to TechBlog's 
                  Designated Copyright Agent.
                </p>
                
                <div className="p-6 bg-red-600/20 border border-red-500/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-300 mb-4">DMCA Notice of Alleged Infringement ("Notice")</h3>
                  <div className="space-y-4 text-sm text-red-200">
                    <div>
                      <strong>1. Identify the copyrighted work that you claim has been infringed:</strong>
                      <p className="mt-2">Please provide a description of the copyrighted work or other intellectual property that you claim has been infringed.</p>
                    </div>
                    <div>
                      <strong>2. Identify the material that you claim is infringing:</strong>
                      <p className="mt-2">Please provide the URL or other specific location on the Site where the material that you claim is infringing is located.</p>
                    </div>
                    <div>
                      <strong>3. Provide your contact information:</strong>
                      <p className="mt-2">Please provide your name, address, telephone number, and email address.</p>
                    </div>
                    <div>
                      <strong>4. Provide a statement of good faith belief:</strong>
                      <p className="mt-2">Please provide a statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</p>
                    </div>
                    <div>
                      <strong>5. Provide a statement of accuracy:</strong>
                      <p className="mt-2">Please provide a statement that the information in the Notice is accurate, and under penalty of perjury, that you are the copyright owner or authorized to act on behalf of the copyright owner.</p>
                    </div>
                    <div>
                      <strong>6. Provide your signature:</strong>
                      <p className="mt-2">Please provide your physical or electronic signature.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Counter-Notification */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Counter-Notification</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If you believe that your content that was removed (or to which access was disabled) is not infringing, 
                  or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to 
                  the law, to post and use the material in your content, you may send a counter-notice containing the 
                  following information to the Copyright Agent:
                </p>
                
                <div className="p-6 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-300 mb-4">Counter-Notice Requirements</h3>
                  <div className="space-y-4 text-sm text-blue-200">
                    <div>
                      <strong>1. Your physical or electronic signature</strong>
                    </div>
                    <div>
                      <strong>2. Identification of the content that has been removed or to which access has been disabled</strong>
                    </div>
                    <div>
                      <strong>3. A statement under penalty of perjury that you have a good faith belief that the content was removed or disabled as a result of mistake or a misidentification of the content</strong>
                    </div>
                    <div>
                      <strong>4. Your name, address, telephone number, and email address</strong>
                    </div>
                    <div>
                      <strong>5. A statement that you consent to the jurisdiction of the federal district court for the judicial district in which your address is located, or if your address is outside the United States, for any judicial district in which TechBlog may be found</strong>
                    </div>
                    <div>
                      <strong>6. A statement that you will accept service of process from the person who provided notification of the alleged infringement</strong>
                    </div>
                  </div>
                </div>
              </section>

              {/* Repeat Infringers */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Repeat Infringers</h2>
                <p className="text-slate-300 leading-relaxed">
                  It is TechBlog's policy in appropriate circumstances to disable and/or terminate the accounts of users 
                  who are repeat infringers or are repeatedly charged with infringing the copyrights or other intellectual 
                  property rights of others.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If you deliver a Notice to TechBlog's Designated Copyright Agent, please send it to:
                </p>
                
                <div className="p-6 bg-slate-800/50 rounded-lg">
                  <div className="space-y-2 text-slate-300">
                    <p><strong>Copyright Agent:</strong> TechBlog Legal Department</p>
                    <p><strong>Email:</strong> dmca@techblog.com</p>
                    <p><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
                    <p><strong>Phone:</strong> +1-555-0123</p>
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-200 text-sm">
                      <strong>Note:</strong> Please be aware that if you knowingly materially misrepresent that material or 
                      activity on the Site is infringing your copyright, you may be held liable for damages (including costs 
                      and attorneys' fees) under Section 512(f) of the DMCA.
                    </p>
                  </div>
                </div>
              </section>

              {/* Process */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">What Happens After You Submit a Notice?</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">1. Review</h3>
                    <p className="text-slate-300 text-sm">
                      Our legal team will review your DMCA notice to ensure it contains all required information.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">2. Action</h3>
                    <p className="text-slate-300 text-sm">
                      If the notice is valid, we will remove or disable access to the allegedly infringing content.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">3. Notification</h3>
                    <p className="text-slate-300 text-sm">
                      We will notify the user who posted the content about the removal and provide them with your contact information.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">4. Counter-Notice</h3>
                    <p className="text-slate-300 text-sm">
                      The user may submit a counter-notice if they believe the content was removed by mistake.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">5. Restoration</h3>
                    <p className="text-slate-300 text-sm">
                      If a valid counter-notice is received, we may restore the content within 10-14 business days.
                    </p>
                  </div>
                </div>
              </section>

              {/* Additional Information */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Additional Information</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  For more information about the DMCA and copyright law, please visit:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>
                    <a href="https://www.copyright.gov" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                      U.S. Copyright Office
                    </a>
                  </li>
                  <li>
                    <a href="https://www.copyright.gov/legislation/dmca.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                      DMCA Legislation
                    </a>
                  </li>
                  <li>
                    <a href="https://www.copyright.gov/help/faq" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                      Copyright FAQ
                    </a>
                  </li>
                </ul>
              </section>

            </div>
          </div>
        </div>

        {/* DMCA Notice Form */}
        <div className="mt-12">
          <div className="card bg-gradient-to-r from-red-600/20 via-orange-600/20 to-yellow-600/20 border-red-500/30">
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Submit a DMCA Notice
              </h3>
              <p className="text-slate-300 mb-6">
                If you believe your copyright has been infringed, please submit a DMCA notice to our legal team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:dmca@techblog.com?subject=DMCA%20Notice%20of%20Alleged%20Infringement"
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  Submit DMCA Notice
                </a>
                <a
                  href="mailto:legal@techblog.com?subject=Copyright%20Inquiry"
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
                >
                  General Copyright Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-12">
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Back to Top
          </a>
        </div>
      </div>
    </div>
  )
}
