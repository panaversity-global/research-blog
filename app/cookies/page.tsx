import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy - TechBlog',
  description: 'Learn about how TechBlog uses cookies and similar technologies to enhance your browsing experience.',
  keywords: [
    'cookie policy',
    'cookies',
    'privacy',
    'data collection',
    'tracking',
    'website cookies'
  ],
  openGraph: {
    title: 'Cookie Policy - TechBlog',
    description: 'Learn about how TechBlog uses cookies and similar technologies to enhance your browsing experience.',
    url: 'https://techblog.com/cookies',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Cookie%20Policy%20-%20TechBlog&description=Cookie%20usage%20and%20privacy%20information',
        width: 1200,
        height: 630,
        alt: 'Cookie Policy - TechBlog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy - TechBlog',
    description: 'Learn about how TechBlog uses cookies and similar technologies to enhance your browsing experience.',
    images: ['/api/og?title=Cookie%20Policy%20-%20TechBlog&description=Cookie%20usage%20and%20privacy%20information']
  },
  alternates: {
    canonical: 'https://techblog.com/cookies'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div id="top" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        {/* Page Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            This Cookie Policy explains how TechBlog uses cookies and similar technologies to recognize you when you visit our website.
          </p>
          <div className="mt-6 text-slate-400">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </header>

        {/* Cookie Policy Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="card">
            <div className="p-8 space-y-8">
              
              {/* What Are Cookies */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
                <p className="text-slate-300 leading-relaxed">
                  Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                  Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, 
                  as well as to provide reporting information.
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  Cookies set by the website owner (in this case, TechBlog) are called "first-party cookies". Cookies set by 
                  parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party 
                  features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
                </p>
              </section>

              {/* How We Use Cookies */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Cookies</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  TechBlog uses cookies for several reasons. Some cookies are required for technical reasons in order for our 
                  website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also 
                  enable us to track and target the interests of our users to enhance the experience on our website.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-4">
                  <li>To provide you with a better user experience</li>
                  <li>To understand how you use our website</li>
                  <li>To improve our website and services</li>
                  <li>To provide personalized content and advertisements</li>
                  <li>To ensure the security of our website</li>
                </ul>
              </section>

              {/* Types of Cookies We Use */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  {/* Essential Cookies */}
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Essential Cookies</h3>
                    <p className="text-slate-300 text-sm">
                      These cookies are essential to provide you with services available through our website and to enable you 
                      to use some of its features. Without these cookies, the services that you have asked for cannot be provided, 
                      and we only use these cookies to provide you with those services.
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Analytics and Performance Cookies</h3>
                    <p className="text-slate-300 text-sm">
                      These cookies allow us to analyze how our website is being accessed and used, and enable us to track 
                      performance of our site. This helps us to provide a high-quality experience by customizing our offering 
                      and quickly identifying and fixing any issues that arise.
                    </p>
                  </div>

                  {/* Functionality Cookies */}
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Functionality Cookies</h3>
                    <p className="text-slate-300 text-sm">
                      These cookies allow our website to remember choices you make when you use our website. The purpose of 
                      these cookies is to provide you with a more personal experience and to avoid you having to re-enter your 
                      preferences every time you visit our website.
                    </p>
                  </div>

                  {/* Advertising Cookies */}
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Advertising Cookies</h3>
                    <p className="text-slate-300 text-sm">
                      These cookies are used to make advertising messages more relevant to you and your interests. They also 
                      perform functions like preventing the same advertisement from continuously reappearing, ensuring that 
                      advertisements are properly displayed for advertisers, and in some cases selecting advertisements that 
                      are based on your interests.
                    </p>
                  </div>
                </div>
              </section>

              {/* Third-Party Cookies */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Third-Party Cookies</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics of 
                  our website, deliver advertisements on and through our website, and so on.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  The third-party cookies used on our website include:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-4">
                  <li><strong>Google Analytics:</strong> To analyze website usage and performance</li>
                  <li><strong>Google AdSense:</strong> To display relevant advertisements</li>
                  <li><strong>Social Media Platforms:</strong> To enable social media sharing and integration</li>
                  <li><strong>Content Delivery Networks:</strong> To improve website loading speed</li>
                </ul>
              </section>

              {/* Managing Cookies */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Managing Your Cookie Preferences</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences 
                  by setting your preferences in the Cookie Consent Manager.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, 
                  you may still use our website though your access to some functionality and areas of our website may be restricted.
                </p>
                <div className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">Browser Settings</h3>
                  <p className="text-blue-200 text-sm">
                    Most web browsers allow you to manage cookies through their settings preferences. To learn more about how 
                    to manage cookies in your browser, visit the help section of your browser or visit{' '}
                    <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-100">
                      allaboutcookies.org
                    </a>.
                  </p>
                </div>
              </section>

              {/* Cookie Duration */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">How Long Do Cookies Stay on My Device?</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  The length of time a cookie will stay on your computer or mobile device depends on whether it is a "persistent" 
                  or "session" cookie. Session cookies will only stay on your device until you stop browsing. Persistent cookies 
                  will stay on your device until you delete them or until they expire.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  The expiration time or retention period of cookies depends on the purpose for which they are used. Some cookies 
                  expire when you close your browser, while others remain on your device for longer periods.
                </p>
              </section>

              {/* Updates to Policy */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Updates to This Cookie Policy</h2>
                <p className="text-slate-300 leading-relaxed">
                  We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies 
                  we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy 
                  regularly to stay informed about our use of cookies and related technologies.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-slate-300 leading-relaxed">
                  If you have any questions about our use of cookies or other technologies, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-slate-300">
                    <strong>Email:</strong> privacy@techblog.com<br />
                    <strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105<br />
                    <strong>Phone:</strong> +1-555-0123
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>

        {/* Cookie Consent Manager */}
        <div className="mt-12">
          <div className="card bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border-blue-500/30">
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Manage Your Cookie Preferences
              </h3>
              <p className="text-slate-300 mb-6">
                Take control of your privacy by managing which cookies you allow on our website.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                  Accept All Cookies
                </button>
                <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200">
                  Customize Settings
                </button>
                <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
                  Reject Non-Essential
                </button>
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
