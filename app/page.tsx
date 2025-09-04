import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts, getAllCategories } from "@/lib/posts"
import { defaultMetadata } from "@/lib/seo"
import { ArrowRight, Calendar, Clock, User, Tag, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SITE_CONTENT } from "@/lib/content"

export const metadata: Metadata = defaultMetadata

// Enable ISR for better performance and SEO
export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const posts = await getAllPosts()
  const categories = await getAllCategories()
  const featuredPosts = posts.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center rounded-3xl border border-white/10 shadow-[0_20px_60px_-10px_rgba(3,24,17,0.5)] bg-[#031811] p-8 md:p-14 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20 mb-6">
              Modern Development
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {SITE_CONTENT.pages.home.hero.title}
              <span className="block text-white">
                {SITE_CONTENT.pages.home.hero.subtitle}
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
              {SITE_CONTENT.pages.home.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:opacity-90 px-8 py-3 text-lg shadow-lg hover:shadow-xl">
                <Link href={SITE_CONTENT.pages.home.hero.cta.primary.href}>
                  {SITE_CONTENT.pages.home.hero.cta.primary.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-gray-300 text-gray-700 hover:bg-accent/10 hover:border-accent/40 hover:text-accent px-8 py-3 text-lg">
                <Link href={SITE_CONTENT.pages.home.hero.cta.secondary.href}>{SITE_CONTENT.pages.home.hero.cta.secondary.text}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      {categories.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 md:mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Topics
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore our content by category
              </p>
            </div>

            {/* Cookbook-style large topic tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {categories.slice(0, 6).map((category, index) => {
                const categoryColors = [
                  'from-rose-500/80 to-orange-500/80',
                  'from-sky-500/80 to-indigo-600/80', 
                  'from-emerald-500/80 to-teal-600/80',
                  'from-fuchsia-500/80 to-pink-600/80',
                  'from-amber-500/80 to-red-600/80',
                  'from-blue-500/80 to-cyan-600/80'
                ]

                return (
                  <Link 
                    key={category}
                    href={`/blog?category=${encodeURIComponent(category)}`}
                    className="group block rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-transform duration-300 hover:scale-[1.01]"
                  >
                    <div className={`relative aspect-[16/9] bg-gradient-to-br ${categoryColors[index % categoryColors.length]} flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="relative text-center text-white px-6">
                        <FolderOpen className="h-8 w-8 mx-auto mb-3 opacity-90" />
                        <h3 className="text-2xl font-semibold tracking-tight">
                          {category}
                        </h3>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="text-center mt-10">
              <Button asChild variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:border-accent/40 hover:text-accent">
                <Link href="/blog">View all topics</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Posts Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Articles
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Discover our latest insights, tutorials, and deep dives into modern web development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.slug} className="bg-white border-0 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{post.frontmatter.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {post.frontmatter.author?.substring(0, 1) || 'A'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {post.frontmatter.category && (
                      <span className="text-xs font-medium px-3 py-1 rounded-full text-white bg-blue-500">
                        {post.frontmatter.category.toUpperCase()}
                      </span>
                    )}
                    {post.frontmatter.tags && post.frontmatter.tags.slice(0, 1).map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs font-medium px-3 py-1 rounded-full text-white bg-green-500"
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-tight">
                    {post.frontmatter.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">5 min read</span>
                    </div>
                    <Button 
                      asChild 
                      variant="ghost" 
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 h-auto"
                    >
                      <Link href={`/posts/${post.slug}`}>
                        <span className="mr-2">Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-3">
              <Link href="/blog">
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Panaversity?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Professional insights and practical knowledge for modern developers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Insights</h3>
              <p className="text-gray-600">Learn from industry experts and experienced developers</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practical Tutorials</h3>
              <p className="text-gray-600">Step-by-step guides and real-world examples</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Latest Trends</h3>
              <p className="text-gray-600">Stay updated with cutting-edge technologies</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
