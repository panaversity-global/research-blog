import type { Metadata, Viewport } from 'next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Code, BookOpen, Globe, Award, Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us - TechBlog',
  description: 'Learn about TechBlog, our mission to share cutting-edge web development insights, and our commitment to helping developers grow.',
  keywords: ['about us', 'techblog team', 'web development', 'programming education', 'developer community'],
  openGraph: {
    title: 'About Us - TechBlog',
    description: 'Learn about TechBlog, our mission to share cutting-edge web development insights, and our commitment to helping developers grow.',
    url: 'https://techblog.com/about',
    type: 'website',
    images: [
      {
        url: '/api/og?title=About%20Us%20-%20TechBlog&description=Learn%20about%20our%20mission%20to%20share%20cutting-edge%20web%20development%20insights',
        width: 1200,
        height: 630,
        alt: 'About Us - TechBlog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - TechBlog',
    description: 'Learn about TechBlog, our mission to share cutting-edge web development insights, and our commitment to helping developers grow.',
    images: ['/api/og?title=About%20Us%20-%20TechBlog&description=Learn%20about%20our%20mission%20to%20share%20cutting-edge%20web%20development%20insights']
  },
  alternates: {
    canonical: 'https://techblog.com/about'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Lead Developer & Founder',
      bio: 'Full-stack developer with 8+ years of experience in modern web technologies. Passionate about clean code and developer experience.',
      expertise: ['React', 'Node.js', 'TypeScript', 'AWS'],
      avatar: '/api/og?title=Alex%20Chen&description=Lead%20Developer%20%26%20Founder'
    },
    {
      name: 'Sarah Kim',
      role: 'Senior Frontend Engineer',
      bio: 'UI/UX specialist with deep knowledge of modern CSS frameworks and accessibility standards. Loves creating intuitive user experiences.',
      expertise: ['Vue.js', 'CSS', 'Accessibility', 'Design Systems'],
      avatar: '/api/og?title=Sarah%20Kim&description=Senior%20Frontend%20Engineer'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Backend Architect',
      bio: 'Systems architect with expertise in scalable backend solutions, microservices, and cloud infrastructure. Always thinking about performance.',
      expertise: ['Python', 'Docker', 'Kubernetes', 'PostgreSQL'],
      avatar: '/api/og?title=Mike%20Rodriguez&description=Backend%20Architect'
    },
    {
      name: 'Emma Thompson',
      role: 'DevOps Engineer',
      bio: 'Infrastructure specialist focused on automation, CI/CD pipelines, and monitoring. Believes in infrastructure as code.',
      expertise: ['Terraform', 'Jenkins', 'Prometheus', 'Linux'],
      avatar: '/api/og?title=Emma%20Thompson&description=DevOps%20Engineer'
    }
  ]

  const stats = [
    { label: 'Articles Published', value: '150+', icon: BookOpen },
    { label: 'Monthly Readers', value: '50K+', icon: Users },
    { label: 'Code Examples', value: '500+', icon: Code },
    { label: 'Countries Reached', value: '45+', icon: Globe }
  ]

  const values = [
    {
      title: 'Quality First',
      description: 'We never compromise on the quality of our content. Every article is thoroughly researched and tested.',
      icon: Award
    },
    {
      title: 'Community Driven',
      description: 'Our content is shaped by the developer community. We listen, learn, and adapt based on your feedback.',
      icon: Users
    },
    {
      title: 'Always Learning',
      description: 'Technology evolves rapidly, and so do we. We stay current with the latest trends and best practices.',
      icon: BookOpen
    },
    {
      title: 'Performance Focused',
      description: 'We believe in building fast, efficient, and scalable solutions. Performance is never an afterthought.',
      icon: Zap
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
        {/* Hero Section */}
        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient">TechBlog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're a team of passionate developers, designers, and technology enthusiasts dedicated to sharing 
            cutting-edge insights and practical knowledge that helps developers build better software.
          </p>
        </header>

        {/* Mission Statement */}
        <section className="mb-20">
          <Card className="card bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Our Mission</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                To democratize high-quality technical knowledge and empower developers worldwide 
                with practical, actionable insights that accelerate their growth and success.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="card text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card card-hover">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="card text-center">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="mb-20">
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>
                TechBlog was born from a simple observation: while there's no shortage of technical content online, 
                finding high-quality, practical, and up-to-date information can be challenging.
              </p>
              <p>
                Founded in 2024 by a group of experienced developers, we set out to create a platform that not only 
                shares knowledge but does so in a way that's accessible, actionable, and genuinely helpful.
              </p>
              <p>
                Today, we're proud to serve a global community of developers, from beginners taking their first steps 
                in programming to seasoned professionals looking to stay current with the latest technologies.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="card bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Ready to accelerate your development journey? Start exploring our articles and become part of our growing community.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary">
                <Link href="/blog">Explore Articles</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
