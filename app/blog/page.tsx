import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'
import { generateBlogMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Calendar, Clock, User, Tag, ArrowRight, Filter, TrendingUp, Sparkles, BookOpen } from 'lucide-react'
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
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="aspect-video bg-gray-200 rounded-xl mb-4"></div>
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
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
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {sortedPosts.map((post, index) => {
        const wordCount = post.content.split(/\s+/).length
        const readingTime = Math.ceil(wordCount / 200)
        
        return (
          <article key={post.slug} className="group">
            <div className="card card-hover h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              {/* Post Image */}
              {post.frontmatter.image ? (
                <div className="aspect-video overflow-hidden rounded-t-xl">
                  <Image
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={index < 3} // Priority for first 3 images
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-xl flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No Image</p>
                  </div>
                </div>
              )}
              
              {/* Post Content */}
              <div className="p-6 flex-1 flex flex-col">
                <header className="mb-4">
                  {/* Tags */}
                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.frontmatter.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs px-2 py-1">
                          {tag}
                        </Badge>
                      ))}
                      {post.frontmatter.tags.length > 2 && (
                        <Badge variant="secondary" className="bg-gray-50 text-gray-600 text-xs px-2 py-1">
                          +{post.frontmatter.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    <Link href={`/posts/${post.slug}`}>
                      {post.frontmatter.title}
                    </Link>
                  </h2>
                  
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span className="truncate">{post.frontmatter.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{readingTime}m</span>
                    </div>
                  </div>
                </header>
                
                {/* Summary */}
                {post.frontmatter.summary && (
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-1">
                    {post.frontmatter.summary}
                  </p>
                )}
                
                {/* Read More Button */}
                <div className="mt-auto">
                  <Button 
                    asChild 
                    variant="ghost" 
                    className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 hover:border-blue-300 transition-all duration-300"
                  >
                    <Link href={`/posts/${post.slug}`}>
                      Read Article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-7xl">
        {/* Page Header */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Latest Articles
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore our collection of web development articles, programming tutorials, and technology insights. 
            Stay updated with the latest trends and best practices in the ever-evolving world of software development.
          </p>
        </header>

        {/* Search and Filters */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  className="pl-12 pr-4 py-3 bg-white border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-300 rounded-xl px-4 py-2"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Latest
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-200 text-gray-700 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-300 rounded-xl px-4 py-2"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Popular
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all duration-300 rounded-xl px-4 py-2"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Tags
                </Button>
              </div>
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
        <section className="mt-24 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="card bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 p-12 rounded-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Newsletter
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                Get the latest articles, tutorials, and insights delivered directly to your inbox. 
                No spam, just valuable content to help you grow as a developer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl py-3 px-4 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
