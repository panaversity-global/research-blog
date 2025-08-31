import { NextRequest } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export async function GET(request: NextRequest) {
  try {
    const posts = await getAllPosts()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://techblog.com'
    
    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/">
  <channel>
    <title>TechBlog - Modern Development Insights</title>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <link>${baseUrl}</link>
    <description>Discover cutting-edge web development insights, programming tutorials, and industry best practices.</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-US</language>
    <sy:updatePeriod>daily</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <generator>Next.js</generator>
    <webMaster>contact@techblog.com</webMaster>
    <managingEditor>contact@techblog.com</managingEditor>
    <category>Technology</category>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>TechBlog</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${sortedPosts.map(post => {
      const wordCount = post.content.split(/\s+/).length
      const readingTime = Math.ceil(wordCount / 200)
      const content = post.content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .substring(0, 500) + '...'
      
      return `
    <item>
      <title>${post.frontmatter.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</title>
      <link>${baseUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <dc:creator>${post.frontmatter.author}</dc:creator>
      <category>${post.frontmatter.tags?.[0] || 'Technology'}</category>
      <description><![CDATA[${post.frontmatter.summary || content}]]></description>
      <content:encoded><![CDATA[${post.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}]]></content:encoded>
      <wfw:commentRss>${baseUrl}/posts/${post.slug}/comments/feed</wfw:commentRss>
      <slash:comments>0</slash:comments>
      <enclosure url="${baseUrl}/api/og?title=${encodeURIComponent(post.frontmatter.title)}" length="0" type="image/png" />
      <meta>
        <readingTime>${readingTime} min read</readingTime>
        <wordCount>${wordCount}</wordCount>
        <tags>${post.frontmatter.tags?.join(', ') || ''}</tags>
      </meta>
    </item>`
    }).join('')}
  </channel>
</rss>`
    
    return new Response(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
