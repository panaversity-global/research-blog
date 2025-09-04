import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://panaversity.com'
  
  // Get all blog posts
  const posts = await getAllPosts()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]
  
  // Blog post pages
  const blogPages = posts.map((post) => {
    try {
      const date = new Date(post.frontmatter.date)
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date for post ${post.slug}: ${post.frontmatter.date}`)
        return {
          url: `${baseUrl}/posts/${post.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }
      }
      return {
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: date,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    } catch (error) {
      console.warn(`Error processing date for post ${post.slug}: ${post.frontmatter.date}`)
      return {
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    }
  })
  
  // Author pages (if you have author pages)
  const authors = [...new Set(posts.map(post => post.frontmatter.author).filter((author): author is string => Boolean(author)))]
  const authorPages = authors.map((author) => ({
    url: `${baseUrl}/author/${author.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  // Tag pages (if you have tag pages)
  const allTags = posts.flatMap(post => post.frontmatter.tags || []).filter(Boolean)
  const uniqueTags = [...new Set(allTags)]
  const tagPages = uniqueTags.map((tag) => ({
    url: `${baseUrl}/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
  
  return [...staticPages, ...blogPages, ...authorPages, ...tagPages]
}
