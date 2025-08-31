'use client'

import { useEffect } from 'react'

interface StructuredDataProps {
  data: Record<string, any>
}

export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach(script => script.remove())
    
    // Add new structured data
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    document.head.appendChild(script)
    
    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [data])
  
  return null
}

// Predefined structured data schemas
export const createBlogPostSchema = (post: {
  title: string
  description: string
  author: string
  date: string
  image?: string
  tags?: string[]
  url: string
  wordCount: number
  readingTime: number
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.description,
  "image": post.image || `/api/og?title=${encodeURIComponent(post.title)}`,
  "author": {
    "@type": "Person",
    "name": post.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "TechBlog",
    "logo": {
      "@type": "ImageObject",
      "url": "/logo.png"
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
})

export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TechBlog",
  "url": "https://techblog.com",
  "logo": "https://techblog.com/logo.png",
  "description": "Modern Development Insights & Best Practices",
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
})

export const createWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TechBlog",
  "url": "https://techblog.com",
  "description": "Modern Development Insights & Best Practices",
  "publisher": {
    "@type": "Organization",
    "name": "TechBlog"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://techblog.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
})

export const createBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": breadcrumb.name,
    "item": breadcrumb.url
  }))
})

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})

export const createHowToSchema = (howTo: {
  name: string
  description: string
  steps: Array<{ name: string; text: string; image?: string }>
  totalTime: string
  tools?: string[]
  materials?: string[]
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": howTo.name,
  "description": howTo.description,
  "totalTime": howTo.totalTime,
  "tool": howTo.tools?.map(tool => ({ "@type": "HowToTool", name: tool })),
  "material": howTo.materials?.map(material => ({ "@type": "HowToSupply", name: material })),
  "step": howTo.steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    "image": step.image
  }))
})
