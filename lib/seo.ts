import type { Metadata } from 'next'
import { SITE_CONTENT } from './content'

// Base SEO configuration - now centralized
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `https://${SITE_CONTENT.site.domain}`
export const SITE_NAME = SITE_CONTENT.site.name
export const SITE_DESCRIPTION = SITE_CONTENT.site.description
export const SITE_KEYWORDS = SITE_CONTENT.seo.keywords

// Default metadata for the site
export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} - ${SITE_DESCRIPTION}`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [
    { name: `${SITE_NAME} Team`, url: BASE_URL }
  ],
  creator: `${SITE_NAME} Team`,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'technology',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_DESCRIPTION}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/api/og?title=${encodeURIComponent(SITE_NAME)}`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - ${SITE_DESCRIPTION}`,
        type: 'image/png'
      }
    ]
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    site: '@techblog',
    creator: '@techblog',
    title: `${SITE_NAME} - ${SITE_DESCRIPTION}`,
    description: SITE_DESCRIPTION,
    images: [`${BASE_URL}/api/og?title=${encodeURIComponent(SITE_NAME)}`]
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#0f172a',
      },
    ],
  },
  
  // Manifest
  manifest: '/site.webmanifest',
  
  // Apple Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_NAME,
  },
  

  
  // Alternates
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-US': BASE_URL,
    },
  },
}

// Generate metadata for blog posts
export function generatePostMetadata(post: {
  title: string
  description?: string
  author?: string
  date: string
  tags?: string[]
  image?: string
  canonical?: string
  slug: string
}): Metadata {
  const postUrl = `${BASE_URL}/posts/${post.slug}`
  const description = post.description || post.title
  const keywords = post.tags ? [...SITE_KEYWORDS, ...post.tags] : SITE_KEYWORDS
  
  // Calculate reading time (rough estimate)
  const wordCount = post.title.split(/\s+/).length + (post.description?.split(/\s+/) || []).length
  const readingTime = Math.ceil(wordCount / 200)

  return {
    title: post.title,
    description,
    keywords,
    authors: post.author ? [{ name: post.author }] : undefined,
    creator: post.author,
    publisher: SITE_NAME,
    category: post.tags?.[0] || 'Technology',
    
    // Open Graph
    openGraph: {
      title: post.title,
      description,
      url: postUrl,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: post.author ? [post.author] : [],
      section: post.tags?.[0] || 'Technology',
      tags: post.tags || [],
      images: [
        {
          url: post.image || `${BASE_URL}/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/png'
        }
      ]
    },
    
    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.image || `${BASE_URL}/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(description)}`],
      creator: '@techblog',
      site: '@techblog'
    },
    
    // Canonical URL
    alternates: {
      canonical: post.canonical || postUrl
    },
    
    // Additional metadata
    other: {
      'article:published_time': post.date,
      'article:modified_time': post.date,
      'article:author': post.author || `${SITE_NAME} Team`,
      'article:section': post.tags?.[0] || 'Technology',
      'article:tag': post.tags?.join(', ') || 'web development, technology, programming',
      'reading-time': `${readingTime} min read`,
      'word-count': wordCount.toString(),
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  }
}

// Generate metadata for blog listing page
export function generateBlogMetadata(): Metadata {
  return {
    title: 'Blog',
    description: 'Explore our collection of web development articles, programming tutorials, and technology insights. Stay updated with the latest trends and best practices.',
    keywords: [
      'blog',
      'web development blog',
      'programming articles',
      'technology blog',
      'developer tutorials',
      'coding tips',
      'software engineering blog',
      ...SITE_KEYWORDS
    ],
    openGraph: {
      title: 'Blog',
      description: 'Explore our collection of web development articles, programming tutorials, and technology insights.',
      url: `${BASE_URL}/blog`,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/api/og?title=Blog&description=${encodeURIComponent('Explore our collection of web development articles')}`,
          width: 1200,
          height: 630,
          alt: 'Blog'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog',
      description: 'Explore our collection of web development articles, programming tutorials, and technology insights.',
      images: [`${BASE_URL}/api/og?title=Blog&description=${encodeURIComponent('Explore our collection of web development articles')}`]
    },
    alternates: {
      canonical: `${BASE_URL}/blog`
    }
  }
}

// Generate metadata for about page
export function generateAboutMetadata(): Metadata {
  return {
    title: 'About',
    description: 'Learn more about TechBlog, our mission to provide cutting-edge web development insights, and our commitment to sharing knowledge with the developer community.',
    keywords: [
      'about',
      'about us',
      'techblog about',
      'developer community',
      'web development community',
      ...SITE_KEYWORDS
    ],
    openGraph: {
      title: 'About',
      description: 'Learn more about TechBlog, our mission to provide cutting-edge web development insights, and our commitment to sharing knowledge with the developer community.',
      url: `${BASE_URL}/about`,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/api/og?title=About&description=${encodeURIComponent('Learn more about TechBlog')}`,
          width: 1200,
          height: 630,
          alt: 'About TechBlog'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About',
      description: 'Learn more about TechBlog, our mission to provide cutting-edge web development insights, and our commitment to sharing knowledge with the developer community.',
      images: [`${BASE_URL}/api/og?title=About&description=${encodeURIComponent('Learn more about TechBlog')}`]
    },
    alternates: {
      canonical: `${BASE_URL}/about`
    }
  }
}

// Generate metadata for contact page
export function generateContactMetadata(): Metadata {
  return {
    title: 'Contact',
    description: 'Get in touch with the TechBlog team. We welcome feedback, collaboration opportunities, and questions about web development and technology.',
    keywords: [
      'contact',
      'contact us',
      'get in touch',
      'feedback',
      'collaboration',
      'support',
      ...SITE_KEYWORDS
    ],
    openGraph: {
      title: 'Contact',
      description: 'Get in touch with the TechBlog team. We welcome feedback, collaboration opportunities, and questions about web development and technology.',
      url: `${BASE_URL}/contact`,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/api/og?title=Contact&description=${encodeURIComponent('Get in touch with TechBlog')}`,
          width: 1200,
          height: 630,
          alt: 'Contact TechBlog'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact',
      description: 'Get in touch with the TechBlog team. We welcome feedback, collaboration opportunities, and questions about web development and technology.',
      images: [`${BASE_URL}/api/og?title=Contact&description=${encodeURIComponent('Get in touch with TechBlog')}`]
    },
    alternates: {
      canonical: `${BASE_URL}/contact`
    }
  }
}

// Generate metadata for search page
export function generateSearchMetadata(): Metadata {
  return {
    title: 'Search',
    description: 'Search through our comprehensive collection of web development articles, tutorials, and technology insights. Find exactly what you need to advance your skills.',
    keywords: [
      'search',
      'search articles',
      'find tutorials',
      'web development search',
      'programming search',
      ...SITE_KEYWORDS
    ],
    openGraph: {
      title: 'Search',
      description: 'Search through our comprehensive collection of web development articles, tutorials, and technology insights.',
      url: `${BASE_URL}/search`,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/api/og?title=Search&description=${encodeURIComponent('Search our articles and tutorials')}`,
          width: 1200,
          height: 630,
          alt: 'Search TechBlog'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Search',
      description: 'Search through our comprehensive collection of web development articles, tutorials, and technology insights.',
      images: [`${BASE_URL}/api/og?title=Search&description=${encodeURIComponent('Search our articles and tutorials')}`]
    },
    alternates: {
      canonical: `${BASE_URL}/search`
    }
  }
}

// Generate structured data for blog posts
export function generatePostStructuredData(post: {
  title: string
  description: string
  author: string
  date: string
  image?: string
  tags?: string[]
  url: string
  wordCount: number
  readingTime: number
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image || `${BASE_URL}/api/og?title=${encodeURIComponent(post.title)}`,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.webp`
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url
    },
    "articleSection": post.tags?.[0] || "Technology",
    "keywords": post.tags?.join(", ") || "web development, technology, programming",
    "wordCount": post.wordCount,
    "timeRequired": `PT${post.readingTime}M`,
    "inLanguage": "en-US"
  }
}

// Generate structured data for organization
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.webp`,
    "description": SITE_DESCRIPTION,
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "customer service",
      "email": "contact@techblog.com"
    },
    "sameAs": [
      "https://twitter.com/techblog",
      "https://facebook.com/techblog",
      "https://linkedin.com/company/techblog",
      "https://github.com/techblog"
    ]
  }
}

// Generate structured data for website
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": BASE_URL,
    "description": SITE_DESCRIPTION,
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.url
    }))
  }
}

// SEO validation utilities
export function validateSEOTitle(title: string): { isValid: boolean; score: number; issues: string[] } {
  const issues: string[] = []
  let score = 100

  if (title.length < 30) {
    issues.push('Title is too short (should be 30-60 characters)')
    score -= 30
  } else if (title.length > 60) {
    issues.push('Title is too long (should be 30-60 characters)')
    score -= 20
  }

  if (!title.includes(' ')) {
    issues.push('Title should contain multiple words')
    score -= 10
  }

  if (title.length > 0 && title.length < 30) {
    score -= 15
  }

  return {
    isValid: score >= 70,
    score: Math.max(0, score),
    issues
  }
}

export function validateSEODescription(description: string): { isValid: boolean; score: number; issues: string[] } {
  const issues: string[] = []
  let score = 100

  if (description.length < 120) {
    issues.push('Description is too short (should be 120-160 characters)')
    score -= 30
  } else if (description.length > 160) {
    issues.push('Description is too long (should be 120-160 characters)')
    score -= 20
  }

  if (!description.includes(' ')) {
    issues.push('Description should contain multiple words')
    score -= 10
  }

  if (description.length > 0 && description.length < 120) {
    score -= 15
  }

  return {
    isValid: score >= 70,
    score: Math.max(0, score),
    issues
  }
}

export function validateSEOKeywords(keywords: string[]): { isValid: boolean; score: number; issues: string[] } {
  const issues: string[] = []
  let score = 100

  if (keywords.length < 3) {
    issues.push('Should have at least 3 keywords')
    score -= 30
  } else if (keywords.length > 10) {
    issues.push('Should have no more than 10 keywords')
    score -= 20
  }

  if (keywords.some(keyword => keyword.length < 2)) {
    issues.push('Keywords should be at least 2 characters long')
    score -= 15
  }

  if (keywords.some(keyword => keyword.includes(' '))) {
    issues.push('Keywords should not contain spaces (use hyphens instead)')
    score -= 10
  }

  return {
    isValid: score >= 70,
    score: Math.max(0, score),
    issues
  }
}

// Calculate overall SEO score
export function calculateOverallSEOScore(data: {
  title: string
  description: string
  keywords: string[]
  hasCanonical: boolean
  hasOpenGraph: boolean
  hasTwitterCards: boolean
  hasStructuredData: boolean
}): { score: number; grade: string; recommendations: string[] } {
  let score = 0
  const recommendations: string[] = []

  // Title validation (25 points)
  const titleValidation = validateSEOTitle(data.title)
  score += (titleValidation.score / 100) * 25
  if (!titleValidation.isValid) {
    recommendations.push(...titleValidation.issues)
  }

  // Description validation (25 points)
  const descValidation = validateSEODescription(data.description)
  score += (descValidation.score / 100) * 25
  if (!descValidation.isValid) {
    recommendations.push(...descValidation.issues)
  }

  // Keywords validation (15 points)
  const keywordsValidation = validateSEOKeywords(data.keywords)
  score += (keywordsValidation.score / 100) * 15
  if (!keywordsValidation.isValid) {
    recommendations.push(...keywordsValidation.issues)
  }

  // Canonical URL (10 points)
  if (data.hasCanonical) {
    score += 10
  } else {
    recommendations.push('Add canonical URL to prevent duplicate content')
  }

  // Open Graph (15 points)
  if (data.hasOpenGraph) {
    score += 15
  } else {
    recommendations.push('Add Open Graph tags for better social media sharing')
  }

  // Twitter Cards (10 points)
  if (data.hasTwitterCards) {
    score += 10
  } else {
    recommendations.push('Add Twitter Card meta tags')
  }

  // Structured Data (bonus 10 points)
  if (data.hasStructuredData) {
    score += 10
  } else {
    recommendations.push('Add structured data (JSON-LD) for better search understanding')
  }

  // Determine grade
  let grade: string
  if (score >= 90) grade = 'A+'
  else if (score >= 85) grade = 'A'
  else if (score >= 80) grade = 'A-'
  else if (score >= 75) grade = 'B+'
  else if (score >= 70) grade = 'B'
  else if (score >= 65) grade = 'B-'
  else if (score >= 60) grade = 'C+'
  else if (score >= 55) grade = 'C'
  else if (score >= 50) grade = 'C-'
  else grade = 'F'

  return {
    score: Math.round(score),
    grade,
    recommendations
  }
}
