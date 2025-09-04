import type { Metadata, Viewport } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import Markdown from "@/components/MarkdownWrapper"
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShareButton } from "@/components/ShareButton"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

// Enable ISR for better performance and SEO
export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }
  
  const { frontmatter } = post
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://panaversity.org'
  const postUrl = `${baseUrl}/posts/${slug}`
  
  // Calculate reading time
  const wordsPerMinute = 200
  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  
  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": frontmatter.title,
    "description": frontmatter.summary,
    "image": frontmatter.image || `${baseUrl}/api/og?title=${encodeURIComponent(frontmatter.title)}`,
    "author": {
      "@type": "Person",
      "name": frontmatter.author,
      "url": `${baseUrl}/author/${frontmatter.author?.toLowerCase().replace(/\s+/g, '-')}`
    },
    "publisher": {
      "@type": "Organization",
              "name": "Panaversity",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.webp`
      }
    },
    "datePublished": frontmatter.date,
    "dateModified": frontmatter.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "articleSection": frontmatter.tags?.[0] || "Technology",
    "keywords": frontmatter.tags?.join(", ") || "web development, technology, programming",
    "wordCount": wordCount,
    "timeRequired": `PT${readingTime}M`,
    "inLanguage": "en-US"
  }

  return {
          title: `${frontmatter.title} - Panaversity`,
    description: frontmatter.summary,
    keywords: frontmatter.tags?.join(", ") || "web development, technology, programming",
    authors: [{ name: frontmatter.author }],
    creator: frontmatter.author,
            publisher: "Panaversity",

    category: frontmatter.tags?.[0] || "Technology",
    
    // Open Graph
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      url: postUrl,
              siteName: "Panaversity",
      locale: "en_US",
      type: "article",
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.date,
      authors: frontmatter.author ? [frontmatter.author] : [],
      section: frontmatter.tags?.[0] || "Technology",
      tags: frontmatter.tags || [],
      images: [
        {
          url: frontmatter.image || `${baseUrl}/api/og?title=${encodeURIComponent(frontmatter.title)}`,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
          type: "image/png"
        }
      ]
    },
    
    // Twitter Cards
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.summary,
      images: [frontmatter.image || `${baseUrl}/api/og?title=${encodeURIComponent(frontmatter.title)}`],
              creator: "@panaversity",
        site: "@panaversity"
    },
    
    // Canonical URL
    alternates: {
      canonical: postUrl
    },
    
    // Additional metadata
    other: {
      "article:published_time": frontmatter.date,
      "article:modified_time": frontmatter.date,
              "article:author": frontmatter.author || "Panaversity Team",
      "article:section": frontmatter.tags?.[0] || "Technology",
      "article:tag": frontmatter.tags?.join(", ") || "web development, technology, programming",
      "application/ld+json": JSON.stringify(structuredData)
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const { frontmatter, content } = post

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center"
              >
                <span className="text-sm">Home</span>
              </Link>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <Link
                href="/blog"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-200 text-sm"
              >
                Blog
              </Link>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-gray-700 font-medium text-sm" aria-current="page">
                {frontmatter.title}
              </span>
            </li>
          </ol>
        </nav>
        
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {/* Article Header */}
        <article className="mb-12">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {frontmatter.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{frontmatter.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={frontmatter.date} className="text-sm">{frontmatter.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {Math.ceil(content.split(/\s+/).length / 200)} min read
                </span>
              </div>
            </div>

            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {frontmatter.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Summary */}
            {frontmatter.summary && (
              <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-blue-500 pl-6 py-2 bg-blue-50 rounded-r-lg">
                {frontmatter.summary}
              </p>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-code:text-red-600 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200">
            <Markdown content={content} />
          </div>
        </article>

        {/* Article Footer */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <ShareButton title={frontmatter.title} summary={frontmatter.summary} />
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={frontmatter.date}>Published on {frontmatter.date}</time>
              {frontmatter.canonical && typeof frontmatter.canonical === 'string' && (
                <a 
                  href={frontmatter.canonical} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  View Original
                </a>
              )}
            </div>
          </div>
        </footer>

        {/* Navigation Links */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 transition-colors duration-200">
            ← Back to Home
          </Link>
          <div className="flex gap-4 ml-auto">
            <Link 
              href={`/posts/${slug}/md`} 
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors duration-200 hover:bg-gray-100 px-3 py-2 rounded-lg"
              title="View raw markdown content"
            >
              <FileText className="h-4 w-4" />
              Raw (.md)
            </Link>
            <Link 
              href={`/posts/${slug}/json`} 
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors duration-200 hover:bg-gray-100 px-3 py-2 rounded-lg"
              title="View JSON metadata"
            >
              <FileText className="h-4 w-4" />
              JSON
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

