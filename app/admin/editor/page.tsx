"use client"

import { useState, useRef, useEffect } from "react"
import { Markdown } from "@/lib/markdown"
import dynamic from "next/dynamic"
import { 
  Upload, 
  Save, 
  Eye, 
  FileText, 
  Image, 
  Link, 
  Bold, 
  Italic, 
  Code, 
  List, 
  Quote, 
  Table, 
  Heading1, 
  Heading2, 
  Heading3,
  Palette,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2
} from "lucide-react"

// Dynamically import the markdown editor to avoid SSR issues
const MarkdownEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gradient-to-br from-muted/50 to-muted rounded-xl animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-3 animate-bounce"></div>
        <p className="text-muted-foreground">Loading Editor...</p>
      </div>
    </div>
  )
})

// Import the CSS for the markdown editor
import "react-markdown-editor-lite/lib/index.css"
import "./editor-styles.css"

export default function EditorPage() {
  const DRAFT_STORAGE_KEY = "editor_draft_v1"
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0] // Format: YYYY-MM-DD
  })
  const [author, setAuthor] = useState("")
  const [tags, setTags] = useState("")
  const [category, setCategory] = useState("")
  const [summary, setSummary] = useState("")
  const [canonical, setCanonical] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [editorMode, setEditorMode] = useState<'raw' | 'rich'>('raw')
  const [previewExpanded, setPreviewExpanded] = useState(false)
  const [fullscreenPreview, setFullscreenPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null)

  const [seoData, setSeoData] = useState({
    title: '' as string,
    description: '' as string,
    keywords: [] as string[],
    canonicalUrl: '' as string,
    ogTitle: '' as string,
    ogDescription: '' as string,
    ogImage: '' as string,
    ogType: 'article' as const,
    twitterCard: 'summary_large_image' as const,
    twitterTitle: '' as string,
    twitterDescription: '' as string,
    twitterImage: '' as string,
    structuredData: {
      articleType: 'BlogPosting' as const,
      authorName: '' as string,
      authorUrl: '' as string,
      publisherName: 'TechBlog' as string,
      publisherLogo: '/logo.webp' as string,
      articleSection: 'Technology' as string,
      articleTags: [] as string[]
    }
  })

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(DRAFT_STORAGE_KEY) : null
      if (raw) {
        const draft = JSON.parse(raw) as Partial<Record<string, string>>
        if (draft.title) setTitle(draft.title)
        if (draft.date) setDate(draft.date)
        if (draft.author) setAuthor(draft.author)
        if (draft.tags) setTags(draft.tags)
        if (draft.category) setCategory(draft.category)
        if (draft.summary) setSummary(draft.summary)
        if (draft.canonical) setCanonical(draft.canonical)
        if (draft.content) setContent(draft.content)
        setStatus((prev) => prev ?? "Draft restored from local storage")
      }
    } catch {}
  }, [])

  // Autosave draft to localStorage (debounced)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current)
    autosaveTimerRef.current = setTimeout(() => {
      try {
        const data = {
          title,
          date,
          author,
          tags,
          category,
          summary,
          canonical,
          content,
        }
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data))
        setStatus((prev) => prev === null ? null : "Draft saved locally")
      } catch {}
    }, 800)

    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current)
    }
  }, [title, date, author, tags, category, summary, canonical, content])

  // Ensure draft saved on tab close/navigation
  useEffect(() => {
    const handler = () => {
      try {
        const data = { title, date, author, tags, category, summary, canonical, content }
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data))
      } catch {}
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [title, date, author, tags, category, summary, canonical, content])

  async function saveJson() {
    setStatus("Saving...")
    const frontmatter = {
      title,
      date,
      author: author || undefined,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : undefined,
      category: category || undefined,
      summary: summary || undefined,
      canonical: canonical || undefined,
      ai_readable: true,
    }
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frontmatter, body_markdown: content }),
    })
    const data = await res.json()
    setStatus(res.ok ? `Saved as ${data.slug}` : `Error: ${data.error}`)
    if (res.ok && typeof window !== 'undefined') {
      try { localStorage.removeItem(DRAFT_STORAGE_KEY) } catch {}
    }
  }

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setStatus("Uploading post file...")
    const form = new FormData()
    form.append("file", f)
    const res = await fetch("/api/posts", { method: "POST", body: form })
    const data = await res.json()
    setStatus(res.ok ? `Uploaded as ${data.slug}` : `Error: ${data.error}`)
    e.target.value = ""
  }

  async function uploadMedia() {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*,audio/*"
    input.onchange = async () => {
      const f = input.files?.[0]
      if (!f) return
      setStatus("Uploading media...")
      const form = new FormData()
      form.append("file", f)
      const res = await fetch("/api/upload", { method: "POST", body: form })
      const data = await res.json()
      if (res.ok && data.url) {
        const url = data.url as string
        const isAudio = /\.(mp3|wav|ogg)$/i.test(url)
        const snippet = isAudio ? `\n\n<audio controls src="${url}"></audio>\n\n` : `\n\n![alt text](${url})\n\n`
        setContent((prev) => prev + snippet)
        setStatus("Media inserted")
      } else {
        setStatus(`Error: ${data.error || "Upload failed"}`)
      }
    }
    input.click()
  }

  // Function to handle image upload from computer
  async function handleImageUpload() {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      setStatus("Uploading image...")
      const form = new FormData()
      form.append("file", file)

      try {
        const res = await fetch("/api/upload", { method: "POST", body: form })
        const data = await res.json()
        
        if (res.ok && data.url) {
          // Insert the uploaded image with proper markdown
          const imageMarkdown = `\n\n![${file.name.replace(/\.[^/.]+$/, "")}](${data.url})\n\n`
          setContent((prev) => prev + imageMarkdown)
          setStatus("Image uploaded and inserted successfully!")
        } else {
          setStatus(`Error: ${data.error || "Upload failed"}`)
        }
      } catch (error) {
        setStatus("Error: Upload failed")
      }
    }
    input.click()
  }

  // Function to handle image from URL
  function handleImageFromUrl() {
    const alt = prompt("Enter image alt text (description):", "")
    if (!alt) return
    
    const url = prompt("Enter image URL:", "https://")
    if (!url) return

    // Insert the image with proper markdown
    const imageMarkdown = `\n\n![${alt}](${url})\n\n`
    setContent((prev) => prev + imageMarkdown)
    setStatus("Image inserted from URL!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header Section */}
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Blog Editor
                </h1>
                <p className="text-sm text-muted-foreground">
                  Create and edit your blog posts with ease
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setPreviewExpanded(!previewExpanded)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                {previewExpanded ? 'Hide Preview' : 'Show Preview'}
                {previewExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <button 
                onClick={saveJson}
                disabled={!title || !date || !content}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{status === "Saving..." ? "Saving..." : "Save Post"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Post Details */}
          <div className="xl:col-span-1">
            {/* Post Details Card */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg shadow-black/5 xl:sticky xl:top-24 z-20">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold">Post Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                    <span>Post Title</span>
                    <span className="text-red-500">*</span>
                  </label>
              <input 
                id="title"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60" 
                placeholder="Enter your post title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
              />
            </div>
            
            <div>
                  <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                    <span>Publication Date</span>
                    <span className="text-red-500">*</span>
                  </label>
              <input 
                id="date"
                type="date" 
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required
              />
            </div>
            
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-foreground mb-2">Author</label>
              <input 
                id="author"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60" 
                placeholder="Your name" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} 
              />
            </div>
            
                <div className="md:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">Tags</label>
              <input 
                id="tags"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60" 
                placeholder="nextjs, react, web development" 
                value={tags} 
                onChange={(e) => setTags(e.target.value)} 
              />
                  <p className="text-xs text-muted-foreground mt-2 flex items-center space-x-1">
                    <span>💡</span>
                    <span>Separate tags with commas</span>
                  </p>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">Category</label>
              <select 
                id="category"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Programming">Programming</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="DevOps">DevOps</option>
                <option value="Data Science">Data Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Tutorials">Tutorials</option>
                <option value="News">News</option>
                <option value="Reviews">Reviews</option>
                <option value="Opinions">Opinions</option>
                <option value="Case Studies">Case Studies</option>
                <option value="Best Practices">Best Practices</option>
                <option value="Tools">Tools</option>
                <option value="Frameworks">Frameworks</option>
                <option value="Libraries">Libraries</option>
                <option value="Other">Other</option>
              </select>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center space-x-1">
                    <span>📂</span>
                    <span>Choose the main topic category</span>
                  </p>
            </div>
            
                <div className="md:col-span-2">
              <label htmlFor="summary" className="block text-sm font-medium text-foreground mb-2">Summary</label>
              <textarea 
                id="summary"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60 resize-none" 
                placeholder="Brief description of your post" 
                value={summary} 
                onChange={(e) => setSummary(e.target.value)} 
                rows={3}
              />
            </div>
            
                <div className="md:col-span-2">
              <label htmlFor="canonical" className="block text-sm font-medium text-foreground mb-2">Hero Image URL</label>
              <input 
                id="canonical"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60" 
                placeholder="https://example.com/cover.jpg (optional)" 
                value={canonical} 
                onChange={(e) => setCanonical(e.target.value)} 
              />
                  <p className="text-xs text-muted-foreground mt-2 flex items-center space-x-1">
                    <span>🖼️</span>
                    <span>Tip: You can also add an image in content; first image will be used automatically.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Content Editor Card */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg shadow-black/5 relative z-10">
              {/* Editor Mode Toggle - Positioned above Content */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setEditorMode('raw')}
                    className={`px-4 py-2 text-sm rounded-md transition-all duration-200 flex items-center space-x-2 ${
                        editorMode === 'raw'
                        ? 'bg-background text-foreground shadow-sm shadow-black/5'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                    <Code className="w-4 h-4" />
                    <span>Raw Markdown</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode('rich')}
                    className={`px-4 py-2 text-sm rounded-md transition-all duration-200 flex items-center space-x-2 ${
                        editorMode === 'rich'
                        ? 'bg-background text-foreground shadow-sm shadow-black/5'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                    <Palette className="w-4 h-4" />
                    <span>Rich Editor</span>
                    </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-green-500" />
                  </div>
                  <h2 className="text-xl font-semibold">Content</h2>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                    {editorMode === 'raw' ? 'Raw Markdown' : 'Rich Editor'}
                  </span>
                </div>
              </div>
              
              {/* Editor Mode Tips */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-500 text-sm">💡</span>
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    <strong>Raw Markdown:</strong> Write markdown directly with syntax highlighting
                    <br />
                    <strong>Rich Editor:</strong> Use toolbar buttons for formatting, tables, images, and more
                    <br />
                    <strong>Both modes:</strong> Content is always saved as markdown format
                  </div>
                </div>
              </div>
              
              {editorMode === 'raw' ? (
                <>
                  <textarea 
                    id="content"
                    className="w-full h-80 px-4 py-4 rounded-xl bg-muted/30 font-mono border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60 resize-none" 
                    placeholder="# Start writing your post here...\n\nUse markdown syntax for formatting.\n\n## Examples:\n- **Bold text**\n- *Italic text*\n- `Inline code`\n- [Links](url)" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <span>📝</span>
                        <span>{content.length} characters</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>📄</span>
                        <span>{content.split('\n').length} lines</span>
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                      <span className="font-medium">Markdown:</span>
                      <code className="bg-muted px-1 rounded ml-1">#</code>
                      <code className="bg-muted px-1 rounded ml-1">**bold**</code>
                      <code className="bg-muted px-1 rounded ml-1">*italic*</code>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Enhanced Visual Toolbar */}
                  <div className="mb-4 p-4 bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50 rounded-xl relative z-0">
                    <div className="flex flex-wrap gap-3 items-center">
                      <span className="text-sm font-medium text-foreground mr-2">Formatting Tools:</span>
                      
                      {/* Heading Buttons */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const text = prompt('Enter heading text:', '');
                            if (text) setContent(prev => prev + `\n# ${text}\n`);
                          }}
                          className="px-3 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                          title="H1 Heading"
                        >
                          <Heading1 className="w-4 h-4" />
                          <span>H1</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const text = prompt('Enter heading text:', '');
                            if (text) setContent(prev => prev + `\n## ${text}\n`);
                          }}
                          className="px-3 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                          title="H2 Heading"
                        >
                          <Heading2 className="w-4 h-4" />
                          <span>H2</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const text = prompt('Enter heading text:', '');
                            if (text) setContent(prev => prev + `\n### ${text}\n`);
                          }}
                          className="px-3 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                          title="H3 Heading"
                        >
                          <Heading3 className="w-4 h-4" />
                          <span>H3</span>
                        </button>
                      </div>

                      {/* Text Formatting */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const text = prompt('Enter bold text:', '');
                            if (text) setContent(prev => prev + `**${text}**`);
                          }}
                          className="px-3 py-2 text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                          title="Bold Text"
                        >
                          <Bold className="w-4 h-4" />
                          <span>Bold</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const text = prompt('Enter italic text:', '');
                            if (text) setContent(prev => prev + `*${text}*`);
                          }}
                          className="px-3 py-2 text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                          title="Italic Text"
                        >
                          <Italic className="w-4 h-4" />
                          <span>Italic</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const text = prompt('Enter code text:', '');
                            if (text) setContent(prev => prev + `\`${text}\``);
                          }}
                          className="px-3 py-2 text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                          title="Inline Code"
                        >
                          <Code className="w-4 h-4" />
                          <span>Code</span>
                        </button>
                      </div>

                      {/* Lists and Blocks */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const text = prompt('Enter list item:', '');
                            if (text) setContent(prev => prev + `\n- ${text}`);
                          }}
                          className="px-3 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                          title="Unordered List"
                        >
                          <List className="w-4 h-4" />
                          <span>List</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const text = prompt('Enter quote text:', '');
                            if (text) setContent(prev => prev + `\n> ${text}\n`);
                          }}
                          className="px-3 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                          title="Blockquote"
                        >
                          <Quote className="w-4 h-4" />
                          <span>Quote</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const text = prompt('Enter code block text:', '');
                            if (text) setContent(prev => prev + `\n\`\`\`\n${text}\n\`\`\`\n`);
                          }}
                          className="px-3 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                          title="Code Block"
                        >
                          <Code className="w-4 h-4" />
                          <span>Code Block</span>
                        </button>
                      </div>

                      {/* Links and Images */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const text = prompt('Enter link text:', '');
                            const url = prompt('Enter URL:', '');
                            if (text && url) setContent(prev => prev + `[${text}](${url})`);
                          }}
                          className="px-3 py-2 text-sm bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                          title="Insert Link"
                        >
                          <Link className="w-4 h-4" />
                          <span>Link</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleImageUpload}
                          className="px-3 py-2 text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                          title="Upload Image from Computer"
                        >
                          <Image className="w-4 h-4" />
                          <span>Upload</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleImageFromUrl}
                          className="px-3 py-2 text-sm bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                          title="Insert Image from URL"
                        >
                          <span>🌐</span>
                          <span>URL</span>
                        </button>
                      </div>

                      {/* Table */}
                      <button
                        type="button"
                        onClick={() => {
                          setContent(prev => prev + `\n| Header 1 | Header 2 | Header 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n`);
                        }}
                        className="px-3 py-2 text-sm bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-lg hover:from-violet-600 hover:to-violet-700 transition-all duration-200 flex items-center space-x-2 shadow-sm"
                        title="Insert Table"
                      >
                        <Table className="w-4 h-4" />
                        <span>Table</span>
                      </button>
                    </div>
                  </div>

                  <div className="border border-border/50 rounded-xl overflow-hidden shadow-sm relative z-0">
                    <MarkdownEditor
                      value={content}
                      onChange={({ text }) => setContent(text)}
                      renderHTML={(text) => text}
                      style={{ height: '500px' }}
                      config={{
                        view: { menu: true, md: true, html: false },
                        canView: { menu: true, md: true, html: false },
                        htmlClass: 'custom-html-style',
                        markdownClass: 'custom-markdown-style',
                        logger: false,
                        shortcuts: true,
                        scrollSync: true,
                        syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
                        imageAccept: '.jpg,.jpeg,.png,.gif,.webp',
                        linkTarget: '_blank',
                        table: {
                          maxRow: 20,
                          maxCol: 6
                        }
                      }}
                      plugins={[
                        'header',
                        'font-bold',
                        'font-italic',
                        'font-underline',
                        'font-strikethrough',
                        'list-unordered',
                        'list-ordered',
                        'block-quote',
                        'block-code',
                        'table',
                        'link',
                        'image',
                        'clear',
                        'logger',
                        'mode-toggle',
                        'full-screen'
                      ]}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg shadow-black/5">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3">
              <button 
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg shadow-primary/25" 
                onClick={saveJson}
                disabled={!title || !date || !content}
              >
                    <Save className="w-4 h-4" />
                    <span>{status === "Saving..." ? "Saving..." : "Save Post"}</span>
              </button>
              
                  <label className="px-6 py-3 rounded-xl bg-gradient-to-r from-muted to-muted/80 hover:from-muted/80 hover:to-muted/60 cursor-pointer transition-all duration-200 font-medium border border-border/50 flex items-center space-x-2 shadow-sm">
                    <Upload className="w-4 h-4" />
                    <span>Upload .md/.mdx</span>
                <input ref={fileInputRef} className="hidden" type="file" accept=".md,.mdx" onChange={uploadFile} />
              </label>
              
              <button 
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-muted to-muted/80 hover:from-muted/80 hover:to-muted/60 transition-all duration-200 font-medium border border-border/50 flex items-center space-x-2 shadow-sm" 
                onClick={uploadMedia}
              >
                    <Image className="w-4 h-4" />
                    <span>Insert Media</span>
              </button>
                </div>
              
              {status && (
                  <div className={`text-sm px-4 py-3 rounded-xl border flex items-center space-x-2 ${
                  status.includes('Error') 
                      ? 'bg-destructive/10 text-destructive border-destructive/20' 
                      : 'bg-green-500/10 text-green-600 border-green-500/20'
                  }`}>
                    {status.includes('Error') ? (
                      <AlertCircle className="w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    <span>{status}</span>
                </div>
              )}
            </div>
          </div>
        </div>

          {/* Right Column - Editor + Preview */}
          <div className="xl:col-span-2 space-y-6">
            {/* Preview Header */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg shadow-black/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-orange-500" />
                  </div>
                  <h2 className="text-xl font-semibold">Live Preview</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => setPreviewExpanded(!previewExpanded)}
                    className="px-3 py-1.5 text-xs rounded-md bg-muted/50 hover:bg-muted transition-colors"
                  >
                    {previewExpanded ? 'Hide' : 'Show'}
                  </button>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    editorMode === 'raw' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                      : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                    {editorMode === 'raw' ? 'Raw Markdown' : 'Rich Editor'}
                  </span>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Toggle to preview your content in real-time.
              </div>
            </div>
            
            {/* Preview Content */}
            {previewExpanded && (
              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg shadow-black/5 min-h-[600px]">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <Markdown content={content || "# Start writing...\n\n```ts\nconsole.log('hello world')\n```\n\nThis is where your content preview will appear."} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
