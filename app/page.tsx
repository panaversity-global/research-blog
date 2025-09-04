import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts, getAllCategories } from "@/lib/posts"
import { defaultMetadata } from "@/lib/seo"
import { ArrowRight, Calendar, Clock, User, Tag, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SITE_CONTENT } from "@/lib/content"
import ArticleList from "@/components/ArticleList"
import FeaturedArticles from "@/components/FeaturedArticles"
import TopicsSection from "@/components/TopicsSection"

export const metadata: Metadata = defaultMetadata

// Enable ISR for better performance and SEO
export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const posts = await getAllPosts()
  const categories = await getAllCategories()
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date)
    const dateB = new Date(b.frontmatter.date)
    return dateB.getTime() - dateA.getTime()
  })
  
  // Get featured posts (posts marked as featured)
  const allFeaturedPosts = sortedPosts.filter(post => post.frontmatter.featured === true)

  return (
    <div className="min-h-screen">

      {/* Topics Section */}
      <TopicsSection categories={categories} />

      {/* Featured Posts Section */}
      <FeaturedArticles allFeaturedPosts={allFeaturedPosts} />

      {/* All Posts Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleList posts={sortedPosts} categories={categories} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-white">
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
