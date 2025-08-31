import { NextRequest } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const tag = searchParams.get('tag') || ''
    const author = searchParams.get('author') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    if (!query && !tag && !author) {
      return Response.json({ 
        posts: [], 
        total: 0, 
        page: 1, 
        totalPages: 0,
        message: 'No search criteria provided' 
      })
    }
    
    const allPosts = await getAllPosts()
    let filteredPosts = allPosts
    
    // Filter by search query
    if (query) {
      const searchTerm = query.toLowerCase()
      filteredPosts = filteredPosts.filter(post => {
        const titleMatch = post.frontmatter.title.toLowerCase().includes(searchTerm)
        const contentMatch = post.content.toLowerCase().includes(searchTerm)
        const summaryMatch = post.frontmatter.summary?.toLowerCase().includes(searchTerm) || false
        const tagsMatch = post.frontmatter.tags?.some(tag => 
          tag.toLowerCase().includes(searchTerm)
        ) || false
        const authorMatch = post.frontmatter.author?.toLowerCase().includes(searchTerm) || false
        
        return titleMatch || contentMatch || summaryMatch || tagsMatch || authorMatch
      })
    }
    
    // Filter by tag
    if (tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.frontmatter.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
      )
    }
    
    // Filter by author
    if (author) {
      filteredPosts = filteredPosts.filter(post => 
        post.frontmatter.author?.toLowerCase().includes(author.toLowerCase())
      )
    }
    
    // Sort by date (newest first)
    filteredPosts.sort((a, b) => 
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )
    
    // Pagination
    const total = filteredPosts.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)
    
    // Prepare response data
    const posts = paginatedPosts.map(post => {
      const wordCount = post.content.split(/\s+/).length
      const readingTime = Math.ceil(wordCount / 200)
      
      return {
        slug: post.slug,
        title: post.frontmatter.title,
        summary: post.frontmatter.summary,
        author: post.frontmatter.author,
        date: post.frontmatter.date,
        tags: post.frontmatter.tags || [],
        image: post.frontmatter.image,
        wordCount,
        readingTime,
        excerpt: post.content.substring(0, 200) + '...'
      }
    })
    
    return Response.json({
      posts,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      message: `Found ${total} post${total !== 1 ? 's' : ''}`
    })
    
  } catch (error) {
    console.error('Search error:', error)
    return Response.json(
      { error: 'Internal server error', message: 'Failed to perform search' },
      { status: 500 }
    )
  }
}
