import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'
import { generateBlogMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react'
import { Suspense } from 'react'

export const metadata: Metadata = generateBlogMetadata()

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

// Enable ISR for better performance and SEO
export const revalidate = 3600 // Revalidate every hour

// Blog skeleton component for loading state
function BlogSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <div className="aspect-video bg-slate-700 rounded-lg"></div>
            </div>
            <div className="lg:flex-1">
              <div className="h-8 bg-slate-700 rounded mb-3"></div>
              <div className="h-4 bg-slate-700 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-slate-700 rounded mb-2"></div>
              <div className="h-4 bg-slate-700 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

async function BlogList() {
  const posts = await getAllPosts()
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )

  return (
    <div className="space-y-8">
      {sortedPosts.map((post, index) => {
        const wordCount = post.content.split(/\s+/).length
        const readingTime = Math.ceil(wordCount / 200)
        
        return (
          <article key={post.slug} className="card card-hover">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Post Image - Optimized with Next.js Image */}
              {post.frontmatter.image && (
                <div className="lg:w-1/3">
                  <div className="aspect-video bg-slate-700 rounded-lg overflow-hidden">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                      priority={index < 2} // Priority for first 2 images
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                </div>
              )}
              
              {/* Post Content */}
              <div className="lg:flex-1">
                <header className="mb-4">
                  <h2 className="text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors duration-200">
                    <Link href={`/posts/${post.slug}`}>
                      {post.frontmatter.title}
                    </Link>
                  </h2>
                  
                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.frontmatter.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.frontmatter.date} className="text-sm">{post.frontmatter.date}</time>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{readingTime} min read</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.frontmatter.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-slate-700/50 text-slate-300 hover:bg-slate-700/70">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </header>
                
                {/* Summary */}
                {post.frontmatter.summary && (
                  <p className="text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {post.frontmatter.summary}
                  </p>
                )}
                
                {/* Read More Button */}
                <Button asChild className="btn-primary">
                  <Link href={`/posts/${post.slug}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
        {/* Page Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore our collection of web development articles, programming tutorials, and technology insights. 
            Stay updated with the latest trends and best practices in the ever-evolving world of software development.
          </p>
        </header>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800/50">
                Latest
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800/50">
                Popular
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800/50">
                Tags
              </Button>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <Suspense fallback={
          <BlogSkeleton />
        }>
          <BlogList />
        </Suspense>

        {/* Newsletter Signup */}
        <section className="mt-20 text-center">
          <div className="card bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Get the latest articles, tutorials, and insights delivered directly to your inbox. 
              No spam, just valuable content to help you grow as a developer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
              />
              <Button className="btn-primary whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
