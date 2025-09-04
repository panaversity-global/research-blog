'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { PostData } from '@/lib/posts'

interface ArticleListProps {
  posts: PostData[]
  categories: string[]
}

export default function ArticleList({ posts, categories }: ArticleListProps) {
  const [selectedCategory, setSelectedCategory] = useState('')

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') {
      return posts
    }
    return posts.filter(post => post.frontmatter.category === selectedCategory)
  }, [posts, selectedCategory])

  return (
    <>
      <div className="mb-8">
        {/* Centered Heading */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              All
            </h2>
            <span className="text-3xl md:text-4xl font-bold text-gray-400">
              {filteredPosts.length}
            </span>
          </div>
        </div>
        
        {/* Filter Dropdown - Right Aligned */}
        <div className="flex justify-end mb-6">
          <div className="relative">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="">Filter</option>
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="block">
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-200 hover:border-blue-300">
              <div className="flex items-center justify-between">
                {/* Left side - Title and Tags */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-3 line-clamp-2">
                    {post.frontmatter.title}
                  </h3>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.category && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full text-white bg-blue-500 min-w-fit whitespace-nowrap">
                        {post.frontmatter.category.toUpperCase()}
                      </span>
                    )}
                    {post.frontmatter.tags && post.frontmatter.tags.slice(0, 3).map((tag: string) => (
                      <span 
                        key={tag} 
                        className="text-xs font-medium px-2 py-1 rounded-full text-white bg-green-500 min-w-fit whitespace-nowrap"
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
                    {post.frontmatter.tags && post.frontmatter.tags.length > 3 && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full text-white bg-gray-500 min-w-fit whitespace-nowrap">
                        +{post.frontmatter.tags.length - 3} MORE
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Right side - Date */}
                <div className="ml-4 flex-shrink-0">
                  <div className="text-sm text-gray-500 text-right">
                    {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
