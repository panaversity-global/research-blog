'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PostData } from '@/lib/posts'

interface FeaturedArticlesProps {
  allFeaturedPosts: PostData[]
}

export default function FeaturedArticles({ allFeaturedPosts }: FeaturedArticlesProps) {
  const [showAll, setShowAll] = useState(false)
  
  // Show only first 6 by default, or all if showAll is true
  const displayedPosts = showAll ? allFeaturedPosts : allFeaturedPosts.slice(0, 6)
  const hasMore = allFeaturedPosts.length > 6

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Articles
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our latest and most popular content
          </p>
        </div>

        {displayedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPosts.map((post) => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="block">
                  <Card className="bg-white border-0 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group overflow-hidden cursor-pointer h-full">
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
                      
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {post.frontmatter.category && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full text-white bg-blue-500 min-w-fit whitespace-nowrap">
                            {post.frontmatter.category.toUpperCase()}
                          </span>
                        )}
                        {post.frontmatter.tags && post.frontmatter.tags.slice(0, 1).map((tag: string) => (
                          <span 
                            key={tag} 
                            className="text-xs font-medium px-2 py-1 rounded-full text-white bg-green-500 min-w-fit whitespace-nowrap"
                          >
                            {tag.toUpperCase()}
                          </span>
                        ))}
                        <span className="text-xs font-medium px-2 py-1 rounded-full text-white bg-yellow-500 min-w-fit whitespace-nowrap">
                          FEATURED
                        </span>
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
                        <div className="flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                          Read More
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Show More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="outline"
                  size="lg"
                  className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-3"
                >
                  {showAll ? 'Show Less' : `Show More (${allFeaturedPosts.length - 6} more)`}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured articles available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
