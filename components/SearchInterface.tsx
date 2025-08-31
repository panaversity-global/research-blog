'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Filter, X, Calendar, Clock, User, Tag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { debounce } from 'lodash'

interface SearchResult {
  slug: string
  title: string
  summary: string
  author: string
  date: string
  tags: string[]
  image?: string
  wordCount: number
  readingTime: number
  excerpt: string
}

interface SearchResponse {
  posts: SearchResult[]
  total: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  message: string
}

export default function SearchInterface() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [tag, setTag] = useState(searchParams.get('tag') || '')
  const [author, setAuthor] = useState(searchParams.get('author') || '')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [availableAuthors, setAvailableAuthors] = useState<string[]>([])

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string, searchTag: string, searchAuthor: string, page: number) => {
      if (!searchQuery && !searchTag && !searchAuthor) {
        setResults([])
        setTotal(0)
        setTotalPages(0)
        return
      }

      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        if (searchQuery) params.append('q', searchQuery)
        if (searchTag) params.append('tag', searchTag)
        if (searchAuthor) params.append('author', searchAuthor)
        params.append('page', page.toString())
        params.append('limit', '10')

        const response = await fetch(`/api/search?${params.toString()}`)
        const data: SearchResponse = await response.json()
        
        setResults(data.posts)
        setTotal(data.total)
        setTotalPages(data.totalPages)
        setCurrentPage(data.page)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300),
    []
  )

  // Update URL when search parameters change
  const updateURL = useCallback((newQuery: string, newTag: string, newAuthor: string) => {
    const params = new URLSearchParams()
    if (newQuery) params.append('q', newQuery)
    if (newTag) params.append('tag', newTag)
    if (newAuthor) params.append('author', newAuthor)
    
    const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.push(newURL)
  }, [pathname, router])

  // Handle search
  const handleSearch = useCallback((newQuery: string, newTag: string, newAuthor: string, page: number = 1) => {
    setCurrentPage(page)
    debouncedSearch(newQuery, newTag, newAuthor, page)
    updateURL(newQuery, newTag, newAuthor)
  }, [debouncedSearch, updateURL])

  // Handle input changes
  const handleQueryChange = (value: string) => {
    setQuery(value)
    handleSearch(value, tag, author)
  }

  const handleTagChange = (value: string) => {
    setTag(value)
    handleSearch(query, value, author)
  }

  const handleAuthorChange = (value: string) => {
    setAuthor(value)
    handleSearch(query, tag, value)
  }

  const clearFilters = () => {
    setQuery('')
    setTag('')
    setAuthor('')
    setCurrentPage(1)
    handleSearch('', '', '', 1)
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      handleSearch(query, tag, author, page)
    }
  }

  // Load available tags and authors on mount
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const response = await fetch('/api/search?limit=1000')
        const data: SearchResponse = await response.json()
        
        const tags = new Set<string>()
        const authors = new Set<string>()
        
        data.posts.forEach(post => {
          post.tags.forEach(tag => tags.add(tag))
          if (post.author) authors.add(post.author)
        })
        
        setAvailableTags(Array.from(tags).sort())
        setAvailableAuthors(Array.from(authors).sort())
      } catch (error) {
        console.error('Error loading options:', error)
      }
    }
    
    loadOptions()
  }, [])

  // Initial search
  useEffect(() => {
    if (query || tag || author) {
      handleSearch(query, tag, author, 1)
    }
  }, []) // Only run on mount

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <Card className="card">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search articles, tags, authors, or content..."
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-slate-600 text-slate-300 hover:bg-slate-800/50"
              >
                <Filter className="mr-2 h-4 w-4" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </Button>
              
              {(query || tag || author) && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-slate-400 hover:text-white hover:bg-slate-800/50"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Filter by Tag</label>
                  <select
                    value={tag}
                    onChange={(e) => handleTagChange(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg px-3 py-2"
                  >
                    <option value="">All Tags</option>
                    {availableTags.map(tagOption => (
                      <option key={tagOption} value={tagOption}>{tagOption}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Filter by Author</label>
                  <select
                    value={author}
                    onChange={(e) => handleAuthorChange(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-lg px-3 py-2"
                  >
                    <option value="">All Authors</option>
                    {availableAuthors.map(authorOption => (
                      <option key={authorOption} value={authorOption}>{authorOption}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {isLoading ? (
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="card animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-slate-700 rounded mb-4"></div>
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : results.length > 0 ? (
        <>
          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-slate-300">
              {total} result{total !== 1 ? 's' : ''} found
            </p>
            {totalPages > 1 && (
              <p className="text-slate-400 text-sm">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>

          {/* Results List */}
          <div className="space-y-6">
            {results.map((post) => (
              <Card key={post.slug} className="card card-hover">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Post Image */}
                    {post.image && (
                      <div className="lg:w-1/3">
                        <div className="aspect-video bg-slate-700 rounded-lg overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Post Content */}
                    <div className="lg:flex-1">
                      <h2 className="text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors duration-200">
                        <Link href={`/posts/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      
                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-slate-700/50 text-slate-300 hover:bg-slate-700/70">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {/* Summary */}
                      {post.summary && (
                        <p className="text-slate-300 leading-relaxed mb-4 line-clamp-3">
                          {post.summary}
                        </p>
                      )}
                      
                      {/* Excerpt */}
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      {/* Read More Button */}
                      <Button asChild className="btn-primary">
                        <Link href={`/posts/${post.slug}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => goToPage(currentPage - 1)}
                disabled={!currentPage || currentPage <= 1}
                className="border-slate-600 text-slate-300 hover:bg-slate-800/50"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                  if (pageNum > totalPages) return null
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === currentPage ? "default" : "outline"}
                      onClick={() => goToPage(pageNum)}
                      className={pageNum === currentPage ? "btn-primary" : "border-slate-600 text-slate-300 hover:bg-slate-800/50"}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              
              <Button
                variant="outline"
                onClick={() => goToPage(currentPage + 1)}
                disabled={!currentPage || currentPage >= totalPages}
                className="border-slate-600 text-slate-300 hover:bg-slate-800/50"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (query || tag || author) ? (
        <Card className="card">
          <CardContent className="p-12 text-center">
            <Search className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-slate-400 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button onClick={clearFilters} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800/50">
              Clear Search
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="card">
          <CardContent className="p-12 text-center">
            <Search className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Start searching</h3>
            <p className="text-slate-400">
              Enter keywords, tags, or author names to find relevant articles.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
