'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Eye, 
  Share2, 
  Code, 
  Globe, 
  Twitter, 
  Facebook, 
  Linkedin,
  Copy,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface SEOData {
  title: string
  description: string
  keywords: string[]
  canonicalUrl: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogType: 'article' | 'website'
  twitterCard: 'summary' | 'summary_large_image'
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  structuredData: {
    articleType: 'BlogPosting' | 'Article' | 'TechArticle'
    authorName: string
    authorUrl: string
    publisherName: string
    publisherLogo: string
    articleSection: string
    articleTags: string[]
  }
}

interface PostSEOProps {
  initialData?: Partial<SEOData>
  postSlug?: string
  postTitle?: string
  postContent?: string
  postAuthor?: string
  postDate?: string
  postTags?: string[]
  onSEOChange: (seoData: SEOData) => void
}

export default function PostSEO({ 
  initialData, 
  postSlug, 
  postTitle, 
  postContent, 
  postAuthor, 
  postDate, 
  postTags = [],
  onSEOChange 
}: PostSEOProps) {
  const [seoData, setSeoData] = useState<SEOData>({
    title: initialData?.title || postTitle || '',
    description: initialData?.description || '',
    keywords: initialData?.keywords || postTags || [],
    canonicalUrl: initialData?.canonicalUrl || '',
    ogTitle: initialData?.ogTitle || postTitle || '',
    ogDescription: initialData?.ogDescription || '',
    ogImage: initialData?.ogImage || '',
    ogType: initialData?.ogType || 'article',
    twitterCard: initialData?.twitterCard || 'summary_large_image',
    twitterTitle: initialData?.twitterTitle || postTitle || '',
    twitterDescription: initialData?.twitterDescription || '',
    twitterImage: initialData?.twitterImage || '',
    structuredData: {
      articleType: initialData?.structuredData?.articleType || 'BlogPosting',
      authorName: initialData?.structuredData?.authorName || postAuthor || '',
      authorUrl: initialData?.structuredData?.authorUrl || '',
      publisherName: initialData?.structuredData?.publisherName || 'TechBlog',
      publisherLogo: initialData?.structuredData?.publisherLogo || '/logo.png',
      articleSection: initialData?.structuredData?.articleSection || postTags[0] || 'Technology',
      articleTags: initialData?.structuredData?.articleTags || postTags || []
    }
  })

  const [keywordInput, setKeywordInput] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Update parent component when SEO data changes
  useEffect(() => {
    onSEOChange(seoData)
  }, [seoData, onSEOChange])

  // Auto-generate SEO data from post content
  const generateSEOFromContent = () => {
    if (!postContent || !postTitle) return

    // Generate description from content (first 160 characters)
    const cleanContent = postContent.replace(/[#*`]/g, '').replace(/\n/g, ' ')
    const description = cleanContent.length > 160 
      ? cleanContent.substring(0, 157) + '...'
      : cleanContent

    // Extract potential keywords from content
    const words = cleanContent.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .filter(word => !['this', 'that', 'with', 'from', 'have', 'they', 'will', 'your', 'said', 'each', 'which', 'their', 'time', 'would', 'there', 'could', 'other', 'about', 'many', 'then', 'them', 'these', 'some', 'very', 'into', 'just', 'only', 'know', 'take', 'than', 'more', 'over', 'such', 'most', 'even', 'make', 'like', 'after', 'also', 'first', 'well', 'should', 'through', 'back', 'years', 'where', 'much', 'before', 'mean', 'those', 'right', 'think', 'three', 'never', 'become', 'between', 'really', 'something', 'another', 'rather', 'family', 'already', 'probably', 'anything', 'someone', 'everything', 'nothing', 'anything', 'everything', 'nothing', 'anything', 'everything', 'nothing'].includes(word))
    
    const keywordCounts: Record<string, number> = {}
    words.forEach(word => {
      keywordCounts[word] = (keywordCounts[word] || 0) + 1
    })

    const topKeywords = Object.entries(keywordCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word)

    setSeoData(prev => ({
      ...prev,
      description: description || prev.description,
      keywords: topKeywords.length > 0 ? topKeywords : prev.keywords,
      ogTitle: postTitle || prev.ogTitle,
      ogDescription: description || prev.ogDescription,
      twitterTitle: postTitle || prev.twitterTitle,
      twitterDescription: description || prev.twitterDescription
    }))
  }

  // Add keyword
  const addKeyword = () => {
    if (keywordInput.trim() && !seoData.keywords.includes(keywordInput.trim())) {
      setSeoData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }))
      setKeywordInput('')
    }
  }

  // Remove keyword
  const removeKeyword = (keyword: string) => {
    setSeoData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }))
  }

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !seoData.structuredData.articleTags.includes(tagInput.trim())) {
      setSeoData(prev => ({
        ...prev,
        structuredData: {
          ...prev.structuredData,
          articleTags: [...prev.structuredData.articleTags, tagInput.trim()]
        }
      }))
      setTagInput('')
    }
  }

  // Remove tag
  const removeTag = (tag: string) => {
    setSeoData(prev => ({
      ...prev,
      structuredData: {
        ...prev.structuredData,
        articleTags: prev.structuredData.articleTags.filter(t => t !== tag)
      }
    }))
  }

  // Copy field value
  const copyToClipboard = async (value: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(fieldName)
      toast({
        title: "Copied!",
        description: `${fieldName} copied to clipboard`,
      })
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      })
    }
  }

  // SEO Score calculation
  const calculateSEOScore = () => {
    let score = 0
    let total = 0

    // Title (25 points)
    total += 25
    if (seoData.title.length >= 30 && seoData.title.length <= 60) score += 25
    else if (seoData.title.length > 0) score += 15

    // Description (25 points)
    total += 25
    if (seoData.description.length >= 120 && seoData.description.length <= 160) score += 25
    else if (seoData.description.length > 0) score += 15

    // Keywords (15 points)
    total += 15
    if (seoData.keywords.length >= 3 && seoData.keywords.length <= 10) score += 15
    else if (seoData.keywords.length > 0) score += 8

    // Canonical URL (10 points)
    total += 10
    if (seoData.canonicalUrl) score += 10

    // Open Graph (15 points)
    total += 15
    if (seoData.ogTitle && seoData.ogDescription && seoData.ogImage) score += 15
    else if (seoData.ogTitle || seoData.ogDescription) score += 8

    // Twitter Cards (10 points)
    total += 10
    if (seoData.twitterTitle && seoData.twitterDescription) score += 10
    else if (seoData.twitterTitle || seoData.twitterDescription) score += 5

    return Math.round((score / total) * 100)
  }

  const seoScore = calculateSEOScore()

  return (
    <div className="space-y-6">
      {/* SEO Score Card */}
      <Card className="border-2 border-blue-200 bg-blue-50/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              SEO Score
            </CardTitle>
            <Badge 
              variant={seoScore >= 80 ? "default" : seoScore >= 60 ? "secondary" : "destructive"}
              className="text-sm px-3 py-1"
            >
              {seoScore}/100
            </Badge>
          </div>
          <CardDescription>
            {seoScore >= 80 ? "Excellent SEO optimization!" : 
             seoScore >= 60 ? "Good SEO, room for improvement" : 
             "Needs significant SEO improvements"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                seoScore >= 80 ? 'bg-green-500' : 
                seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${seoScore}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="structured">Structured Data</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Basic SEO Tab */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Basic SEO Settings
              </CardTitle>
              <CardDescription>
                Configure the fundamental SEO elements for your post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seo-title">SEO Title *</Label>
                  <Input
                    id="seo-title"
                    value={seoData.title}
                    onChange={(e) => setSeoData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter SEO title (30-60 characters)"
                    maxLength={60}
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{seoData.title.length}/60 characters</span>
                    {seoData.title.length < 30 && (
                      <span className="text-orange-500">Too short</span>
                    )}
                    {seoData.title.length > 60 && (
                      <span className="text-red-500">Too long</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="canonical-url">Canonical URL</Label>
                  <Input
                    id="canonical-url"
                    value={seoData.canonicalUrl}
                    onChange={(e) => setSeoData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                    placeholder="https://example.com/original-post"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo-description">Meta Description *</Label>
                <Textarea
                  id="seo-description"
                  value={seoData.description}
                  onChange={(e) => setSeoData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter meta description (120-160 characters)"
                  rows={3}
                  maxLength={160}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{seoData.description.length}/160 characters</span>
                  {seoData.description.length < 120 && (
                    <span className="text-orange-500">Too short</span>
                  )}
                  {seoData.description.length > 160 && (
                    <span className="text-red-500">Too long</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Keywords</Label>
                <div className="flex gap-2">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="Add keyword"
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  />
                  <Button onClick={addKeyword} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {seoData.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="gap-2">
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                onClick={generateSEOFromContent} 
                variant="outline" 
                className="w-full"
                disabled={!postContent}
              >
                <Code className="w-4 h-4 mr-2" />
                Auto-generate SEO from Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Social Media Optimization
              </CardTitle>
              <CardDescription>
                Configure how your post appears when shared on social media
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="og-title">Open Graph Title</Label>
                  <Input
                    id="og-title"
                    value={seoData.ogTitle}
                    onChange={(e) => setSeoData(prev => ({ ...prev, ogTitle: e.target.value }))}
                    placeholder="Title for social media sharing"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="og-type">Open Graph Type</Label>
                  <select
                    id="og-type"
                    value={seoData.ogType}
                    onChange={(e) => setSeoData(prev => ({ ...prev, ogType: e.target.value as 'article' | 'website' }))}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="article">Article</option>
                    <option value="website">Website</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="og-description">Open Graph Description</Label>
                <Textarea
                  id="og-description"
                  value={seoData.ogDescription}
                  onChange={(e) => setSeoData(prev => ({ ...prev, ogDescription: e.target.value }))}
                  placeholder="Description for social media sharing"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="og-image">Open Graph Image URL</Label>
                <Input
                  id="og-image"
                  value={seoData.ogImage}
                  onChange={(e) => setSeoData(prev => ({ ...prev, ogImage: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter-title">Twitter Title</Label>
                  <Input
                    id="twitter-title"
                    value={seoData.twitterTitle}
                    onChange={(e) => setSeoData(prev => ({ ...prev, twitterTitle: e.target.value }))}
                    placeholder="Title for Twitter sharing"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter-card">Twitter Card Type</Label>
                  <select
                    id="twitter-card"
                    value={seoData.twitterCard}
                    onChange={(e) => setSeoData(prev => ({ ...prev, twitterCard: e.target.value as 'summary' | 'summary_large_image' }))}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary Large Image</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter-description">Twitter Description</Label>
                <Textarea
                  id="twitter-description"
                  value={seoData.twitterDescription}
                  onChange={(e) => setSeoData(prev => ({ ...prev, twitterDescription: e.target.value }))}
                  placeholder="Description for Twitter sharing"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter-image">Twitter Image URL</Label>
                <Input
                  id="twitter-image"
                  value={seoData.twitterImage}
                  onChange={(e) => setSeoData(prev => ({ ...prev, twitterImage: e.target.value }))}
                  placeholder="https://example.com/twitter-image.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Structured Data Tab */}
        <TabsContent value="structured" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Structured Data (JSON-LD)
              </CardTitle>
              <CardDescription>
                Configure structured data for better search engine understanding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="article-type">Article Type</Label>
                  <select
                    id="article-type"
                    value={seoData.structuredData.articleType}
                    onChange={(e) => setSeoData(prev => ({
                      ...prev,
                      structuredData: {
                        ...prev.structuredData,
                        articleType: e.target.value as 'BlogPosting' | 'Article' | 'TechArticle'
                      }
                    }))}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="BlogPosting">Blog Posting</option>
                    <option value="Article">Article</option>
                    <option value="TechArticle">Tech Article</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author-name">Author Name</Label>
                  <Input
                    id="author-name"
                    value={seoData.structuredData.authorName}
                    onChange={(e) => setSeoData(prev => ({
                      ...prev,
                      structuredData: {
                        ...prev.structuredData,
                        authorName: e.target.value
                      }
                    }))}
                    placeholder="Author name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author-url">Author URL</Label>
                  <Input
                    id="author-url"
                    value={seoData.structuredData.authorUrl}
                    onChange={(e) => setSeoData(prev => ({
                      ...prev,
                      structuredData: {
                        ...prev.structuredData,
                        authorUrl: e.target.value
                      }
                    }))}
                    placeholder="https://example.com/author"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publisher-name">Publisher Name</Label>
                  <Input
                    id="publisher-name"
                    value={seoData.structuredData.publisherName}
                    onChange={(e) => setSeoData(prev => ({
                      ...prev,
                      structuredData: {
                        ...prev.structuredData,
                        publisherName: e.target.value
                      }
                    }))}
                    placeholder="Publisher name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publisher-logo">Publisher Logo URL</Label>
                <Input
                  id="publisher-logo"
                  value={seoData.structuredData.publisherLogo}
                  onChange={(e) => setSeoData(prev => ({
                    ...prev,
                    structuredData: {
                      ...prev.structuredData,
                      publisherLogo: e.target.value
                    }
                  }))}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="article-section">Article Section</Label>
                <Input
                  id="article-section"
                  value={seoData.structuredData.articleSection}
                  onChange={(e) => setSeoData(prev => ({
                    ...prev,
                    structuredData: {
                      ...prev.structuredData,
                      articleSection: e.target.value
                    }
                  }))}
                  placeholder="e.g., Technology, Programming, Web Development"
                />
              </div>

              <div className="space-y-2">
                <Label>Article Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {seoData.structuredData.articleTags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="gap-2">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                SEO Preview
              </CardTitle>
              <CardDescription>
                See how your post will appear in search results and social media
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google Search Preview */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground">Google Search Preview</h4>
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <div className="text-blue-600 text-sm mb-1">
                    {seoData.canonicalUrl || 'https://techblog.com/posts/...'}
                  </div>
                  <div className="text-xl text-blue-800 dark:text-blue-400 font-medium mb-1">
                    {seoData.title || 'SEO Title'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {seoData.description || 'Meta description will appear here...'}
                  </div>
                </div>
              </div>

              {/* Facebook/Open Graph Preview */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  Facebook/Open Graph Preview
                </h4>
                <div className="border rounded-lg overflow-hidden max-w-sm">
                  {seoData.ogImage && (
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                      <img 
                        src={seoData.ogImage} 
                        alt="OG Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {seoData.canonicalUrl || 'techblog.com'}
                    </div>
                    <div className="font-semibold text-sm mb-1">
                      {seoData.ogTitle || 'Open Graph Title'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {seoData.ogDescription || 'Open Graph description...'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Twitter Preview */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter Preview
                </h4>
                <div className="border rounded-lg overflow-hidden max-w-sm">
                  {seoData.twitterImage && (
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                      <img 
                        src={seoData.twitterImage} 
                        alt="Twitter Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {seoData.canonicalUrl || 'techblog.com'}
                    </div>
                    <div className="font-semibold text-sm mb-1">
                      {seoData.twitterTitle || 'Twitter Title'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {seoData.twitterDescription || 'Twitter description...'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Copy Generated Code */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground">Generated Code</h4>
                <div className="space-y-2">
                  <Button
                    onClick={() => copyToClipboard(JSON.stringify(seoData, null, 2), 'SEO Data')}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    {copiedField === 'SEO Data' ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy SEO Data JSON
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
