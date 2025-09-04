import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getAllCategories, getPostsByCategory } from '@/lib/posts'
import { generateBlogMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Calendar, Clock, User, Tag, ArrowRight, Filter, TrendingUp, Sparkles, BookOpen, FolderOpen, Star, Eye, Heart, Share2, Grid3X3, List, SortAsc } from 'lucide-react'
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

async function BlogList({ category }: { category?: string }) {
  const posts = category ? await getPostsByCategory(category) : await getAllPosts()
  
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
            <Card className="h-full flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
              {/* Post Image */}
              <div className="relative overflow-hidden">
                {post.frontmatter.image ? (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative text-center text-white">
                      <BookOpen className="h-16 w-16 mx-auto mb-3 opacity-80" />
                      <p className="text-sm font-medium">No Image</p>
                    </div>
                  </div>
                )}
                
                {/* Overlay with category */}
                <div className="absolute top-4 left-4">
                  {post.frontmatter.category && (
                    <Badge className="bg-white/90 backdrop-blur-sm text-blue-700 hover:bg-white border-0 shadow-lg">
                      <FolderOpen className="h-3 w-3 mr-1" />
                      {post.frontmatter.category}
                    </Badge>
                  )}
                </div>
                
                {/* Reading time badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
                    <Clock className="h-3 w-3 mr-1" />
                    {readingTime}m
                  </Badge>
                </div>
              </div>
              
              {/* Post Content */}
              <CardContent className="p-6 flex-1 flex flex-col">
                <header className="mb-4">
                  {/* Tags */}
                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.frontmatter.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 text-xs px-2 py-1 border-0">
                          {tag}
                        </Badge>
                      ))}
                      {post.frontmatter.tags.length > 2 && (
                        <Badge variant="secondary" className="bg-gray-50 text-gray-600 text-xs px-2 py-1 border-0">
                          +{post.frontmatter.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                    <Link href={`/posts/${post.slug}`} className="hover:underline">
                      {post.frontmatter.title}
                    </Link>
                  </h2>
                  
                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {post.frontmatter.author?.substring(0, 1) || 'A'}
                      </div>
                      <span className="truncate">{post.frontmatter.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.frontmatter.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </header>
                
                {/* Summary */}
                {post.frontmatter.summary && (
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-1">
                    {post.frontmatter.summary}
                  </p>
                )}
                
                {/* Action Buttons */}
                <div className="mt-auto flex items-center justify-between">
                  <Button 
                    asChild 
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90"
                  >
                    <Link href={`/posts/${post.slug}`}>
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-500">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-500">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>
        )
      })}
    </div>
  )
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const qp = await searchParams
  const category = (qp.category as string | undefined) || undefined
  const categories = await getAllCategories()
  const allPosts = await getAllPosts()
  const pageSize = 9
  const totalPages = Math.ceil(allPosts.length / pageSize)
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center rounded-3xl border border-white/10 shadow-[0_20px_60px_-10px_rgba(3,24,17,0.5)] bg-[#031811] p-8 md:p-14 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20 mb-6">
              <Sparkles className="h-4 w-4" />
              {category ? `${category} Articles` : 'Latest Articles'}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
              {category ? (
                <>
                  {category}
                  <span className="block text-3xl md:text-4xl font-normal text-white/80 mt-4">
                    Articles & Insights
                  </span>
                </>
              ) : (
                <>
                  Our Blog
                  <span className="block text-3xl md:text-4xl font-normal text-white/80 mt-4">
                    Stories, Tutorials & Insights
                  </span>
                </>
              )}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12">
              {category 
                ? `Discover our curated collection of ${category.toLowerCase()} articles, tutorials, and insights.`
                : 'Explore our collection of web development articles, programming tutorials, and technology insights. Stay updated with the latest trends and best practices.'
              }
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{allPosts.length}</div>
                <div className="text-white/80 text-sm">Total Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{categories.length}</div>
                <div className="text-white/80 text-sm">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/80 text-sm">Updated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">

        {/* Search and Filters */}
        <div className="mb-16 lg:sticky lg:top-24 z-20">
          <Card className="bg-white/80 backdrop-blur-md border border-gray-200/60 shadow-lg rounded-2xl">
            <CardContent className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search articles, topics, or authors..."
                    className="pl-12 pr-4 py-4 bg-white/70 border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-300 backdrop-blur-md"
                  />
                </div>
                
                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Sort */}
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-300 rounded-xl px-4 py-2">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
              
              {/* Category Filter Buttons */}
              <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-100">
                <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <Button 
                    asChild
                    variant={!category ? "default" : "outline"}
                    className={`${!category ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'} transition-all duration-300 rounded-full px-5 py-2 whitespace-nowrap`}
                  >
                    <Link href="/blog">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      All Articles
                    </Link>
                  </Button>
                  {categories.slice(0, 6).map((cat) => (
                    <Button 
                      key={cat}
                      asChild
                      variant={category === cat ? "default" : "outline"}
                      className={`${category === cat ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'} transition-all duration-300 rounded-full px-5 py-2 whitespace-nowrap`}
                    >
                      <Link href={`/blog?category=${encodeURIComponent(cat)}`}>
                        <FolderOpen className="h-4 w-4 mr-2" />
                        {cat}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts */}
        <Suspense fallback={
          <BlogSkeleton />
        }>
          <BlogList category={category} />
        </Suspense>

        {/* Newsletter Signup */}
        <section className="mt-24">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-white/70 backdrop-blur-md border border-gray-200/60 overflow-hidden relative rounded-3xl shadow-xl">
              <CardContent className="relative p-8 md:p-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-700 border border-blue-200/60 mb-8">
                  <Sparkles className="h-4 w-4" />
                  Newsletter
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Stay in the Loop
                </h3>
                <p className="text-gray-700 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                  Get the latest articles, tutorials, and insights delivered directly to your inbox. 
                  Join thousands of developers who trust us for quality content.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-900 placeholder-gray-500 rounded-xl py-4 px-6 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all duration-300 text-lg"
                  />
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg">
                    Subscribe
                  </Button>
                </div>
                
                <p className="text-gray-500 text-sm mt-6">
                  No spam, unsubscribe at any time. We respect your privacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pagination - hidden unless more than 1 page */}
        {totalPages > 1 && (
          <section className="mt-16">
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-300 rounded-xl px-6 py-3">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-300 rounded-xl w-10 h-10 p-0">
                  1
                </Button>
                <span className="text-gray-400 mx-2">...</span>
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-300 rounded-xl w-10 h-10 p-0">
                  {totalPages}
                </Button>
              </div>
              <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-300 rounded-xl px-6 py-3">
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
