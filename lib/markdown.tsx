"use client"

import React, { useMemo, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkDeflist from "remark-deflist"
import remarkBreaks from "remark-breaks"
import remarkEmoji from "remark-emoji"
import remarkSupersub from "remark-supersub"
import remarkDirective from "remark-directive"
import remarkFrontmatter from "remark-frontmatter"
import remarkWikiLink from "remark-wiki-link"
import remarkAbbr from "remark-abbr"
import remarkGemoji from "remark-gemoji"
import remarkIns from "remark-ins"
import remarkMark from "remark-mark"
import remarkSmartypants from "remark-smartypants"
import remarkToc from "remark-toc"
import rehypeSlug from "rehype-slug"
import rehypeRaw from "rehype-raw"
import rehypeKatex from "rehype-katex"
import rehypeExternalLinks from "rehype-external-links"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import rehypeFigure from "rehype-figure"
import rehypeHighlight from "rehype-highlight"
import rehypeToc from "rehype-toc"
import { visit } from "unist-util-visit"
import "katex/dist/katex.min.css"
// Syntax highlighting is handled by Shiki (via rehype-pretty-code)

// Custom plugin to handle mixed HTML/Markdown better
function remarkMixedContent() {
  return (tree: any) => {
    visit(tree, 'paragraph', (node) => {
      // Handle cases where HTML and markdown are mixed in paragraphs
      if (node.children) {
        node.children = node.children.map((child: any) => {
          if (child.type === 'text' && child.value) {
            // Handle inline HTML that might be mixed with markdown
            const htmlRegex = /<[^>]+>/g
            if (htmlRegex.test(child.value)) {
              return {
                type: 'html',
                value: child.value
              }
            }
          }
          return child
        })
      }
    })
  }
}

// Custom plugin for handling special directives and admonitions
function remarkAdmonitions() {
  return (tree: any) => {
    visit(tree, 'containerDirective', (node) => {
      if (node.name === 'note' || node.name === 'warning' || node.name === 'tip' || node.name === 'info') {
        const data = node.data || (node.data = {})
        const tagName = 'div'
        const properties = {
          className: [`admonition`, `admonition-${node.name}`]
        }
        data.hName = tagName
        data.hProperties = properties
      }
    })
  }
}

// Enhanced YouTube embed detection
function maybeYoutubeEmbed(href?: string): string | null {
  if (!href) return null
  try {
    const url = new URL(href)
    // Support multiple YouTube URL formats
    if (url.hostname.includes("youtube.com") || url.hostname.includes("m.youtube.com")) {
      const id = url.searchParams.get("v")
      if (id) return id
    }
    if (url.hostname === "youtu.be") {
      const id = url.pathname.slice(1).split('?')[0]
      if (id) return id
    }
    // Support YouTube Shorts
    if (url.hostname.includes("youtube.com") && url.pathname.includes("/shorts/")) {
      const match = url.pathname.match(/\/shorts\/([^/?]+)/)
      if (match?.[1]) return match[1]
    }
    // Support YouTube embed URLs
    if (url.hostname.includes("youtube.com") && url.pathname.includes("/embed/")) {
      const match = url.pathname.match(/\/embed\/([^/?]+)/)
      if (match?.[1]) return match[1]
    }
  } catch {}
  return null
}

// Enhanced video embed detection (supports more platforms)
function maybeVideoEmbed(href?: string): { platform: string; id: string } | null {
  if (!href) return null
  try {
    const url = new URL(href)
    
    // YouTube
    const youtubeId = maybeYoutubeEmbed(href)
    if (youtubeId) return { platform: 'youtube', id: youtubeId }
    
    // Vimeo
    if (url.hostname.includes('vimeo.com')) {
      const match = url.pathname.match(/\/(\d+)/)
      if (match?.[1]) return { platform: 'vimeo', id: match[1] }
    }
    
    // Twitch
    if (url.hostname.includes('twitch.tv')) {
      const match = url.pathname.match(/\/videos\/(\d+)/)
      if (match?.[1]) return { platform: 'twitch', id: match[1] }
    }
  } catch {}
  return null
}

// Function to extract code from pre elements
function extractCodeText(children: any): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) {
    return children.map(child => extractCodeText(child)).join('')
  }
  if (children && typeof children === 'object') {
    if (children.props && children.props.children) {
      return extractCodeText(children.props.children)
    }
    if (children.type === 'code' && children.props && children.props.children) {
      return extractCodeText(children.props.children)
    }
  }
  return String(children || '')
}

export function Markdown({ content }: { content: string }) {
  // Enhanced sanitization schema for comprehensive markdown support
  const sanitizeSchema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      '*': [...(defaultSchema.attributes?.['*'] || []), 'className', 'style', 'id', 'data-*'],
      iframe: ['src', 'width', 'height', 'frameBorder', 'allow', 'allowFullScreen', 'title', 'sandbox'],
      audio: ['controls', 'src', 'preload', 'loop', 'muted', 'autoplay'],
      video: ['controls', 'src', 'width', 'height', 'preload', 'loop', 'muted', 'poster', 'autoplay'],
      details: ['open'],
      summary: [],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
      a: ['href', 'title', 'target', 'rel', 'download'],
      code: ['className', 'data-*'],
      pre: ['className', 'data-*'],
      table: ['className', 'data-*'],
      th: ['className', 'colspan', 'rowspan', 'scope'],
      td: ['className', 'colspan', 'rowspan'],
      div: ['className', 'id', 'data-*'],
      span: ['className', 'id', 'data-*'],
      figure: ['className', 'id'],
      figcaption: ['className'],
      svg: ['width', 'height', 'viewBox', 'className'],
      path: ['d', 'fill', 'stroke', 'stroke-width'],
      circle: ['cx', 'cy', 'r', 'fill', 'stroke'],
      rect: ['x', 'y', 'width', 'height', 'fill', 'stroke'],
      line: ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width'],
      polygon: ['points', 'fill', 'stroke'],
      polyline: ['points', 'fill', 'stroke'],
      text: ['x', 'y', 'fill', 'font-size', 'font-family', 'text-anchor'],
      g: ['className', 'transform'],
      defs: [],
      clipPath: ['id'],
      use: ['href', 'x', 'y', 'width', 'height'],
      foreignObject: ['x', 'y', 'width', 'height'],
      math: ['xmlns', 'className'],
      mrow: ['className'],
      mfrac: ['className'],
      msqrt: ['className'],
      mroot: ['className'],
      msub: ['className'],
      msup: ['className'],
      msubsup: ['className'],
      munder: ['className'],
      mover: ['className'],
      munderover: ['className'],
      mtext: ['className'],
      mn: ['className'],
      mo: ['className'],
      mi: ['className'],
      mspace: ['width', 'height'],
      mphantom: ['className'],
      menclose: ['notation', 'className'],
      mfenced: ['open', 'close', 'separators', 'className'],
      mtable: ['className'],
      mtr: ['className'],
      mtd: ['className'],
      mlabeledtr: ['className'],
      maction: ['actiontype', 'className'],
      semantics: ['className'],
      annotation: ['encoding', 'className'],
      'annotation-xml': ['encoding', 'className'],
      mstyle: ['className'],
      mpadded: ['width', 'height', 'depth', 'lspace', 'rspace', 'tspace', 'bspace', 'className'],
    },
    tagNames: [
      ...(defaultSchema.tagNames || []),
      'iframe', 'audio', 'video', 'details', 'summary', 'mark', 'kbd', 'sub', 'sup',
      'abbr', 'cite', 'dfn', 'time', 'var', 'samp', 'small', 'ins', 'del', 's', 'u',
      'figure', 'figcaption', 'svg', 'path', 'circle', 'rect', 'line', 'polygon', 'polyline',
      'text', 'g', 'defs', 'clipPath', 'use', 'foreignObject', 'math', 'mrow', 'mfrac',
      'msqrt', 'mroot', 'msub', 'msup', 'msubsup', 'munder', 'mover', 'munderover',
      'mtext', 'mn', 'mo', 'mi', 'mspace', 'mphantom', 'menclose', 'mfenced', 'mtable',
      'mtr', 'mtd', 'mlabeledtr', 'maction', 'semantics', 'annotation', 'annotation-xml',
      'mstyle', 'mpadded', 'aside', 'article', 'section', 'header', 'footer', 'nav',
      'main', 'address', 'blockquote', 'dl', 'dt', 'dd', 'ol', 'ul', 'li', 'p', 'br',
      'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'code', 'pre', 'a',
      'img', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup',
      'col', 'fieldset', 'legend', 'label', 'input', 'button', 'select', 'textarea',
      'optgroup', 'option', 'form', 'canvas', 'script', 'noscript', 'template', 'slot'
    ],
  }

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          // Allow limited, safe HTML like GitHub
          rehypeRaw,
          [rehypeSanitize, {
            ...defaultSchema,
            attributes: {
              ...defaultSchema.attributes,
              '*': [...(defaultSchema.attributes?.['*'] || []), 'className', 'id', 'style'],
              a: ['href', 'title', 'target', 'rel'],
              code: ['className'],
              pre: ['className'],
              img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
              mark: ['className'],
              kbd: ['className']
            },
            tagNames: [
              ...(defaultSchema.tagNames || []),
              'mark', 'kbd'
            ]
          }],
          rehypeSlug,
          [rehypeAutolinkHeadings, {
            behavior: 'append',
            content: {
              type: 'element',
              tagName: 'span',
              properties: {
                className: ['ml-2','no-underline','opacity-0','transition-opacity','group-hover:opacity-100'],
                'aria-hidden': 'true'
              },
              children: [
                {
                  type: 'text',
                  value: '#'
                }
              ]
            }
          }],
          [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
          rehypeHighlight
        ]}
        components={{
          // Enhanced link component with video embed support
          a({ href, children, ...props }) {
            const videoEmbed = maybeVideoEmbed(typeof href === "string" ? href : undefined)
            const hasImageChild = Array.isArray(children)
              ? children.some((c: any) => c?.type === "img" || (typeof c === 'object' && c?.props?.src))
              : (children as any)?.type === "img" || (typeof children === 'object' && (children as any)?.props?.src)
            
            if (videoEmbed && hasImageChild) {
              if (videoEmbed.platform === 'youtube') {
                const src = `https://www.youtube.com/embed/${videoEmbed.id}`
                return (
                  <div className="my-4 aspect-video w-full overflow-hidden rounded-lg">
                    <iframe
                      src={src}
                      title="YouTube video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                )
              } else if (videoEmbed.platform === 'vimeo') {
                const src = `https://player.vimeo.com/video/${videoEmbed.id}`
                return (
                  <div className="my-4 aspect-video w-full overflow-hidden rounded-lg">
                    <iframe
                      src={src}
                      title="Vimeo video"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                )
              }
            }
            
            return (
              <a href={href} {...props} className="text-primary hover:underline">
                {children}
              </a>
            )
          },
          
          // Enhanced image component
          img(props) {
            const { src, alt, title, ...rest } = props
            return (
              <img 
                {...rest}
                src={src}
                alt={alt}
                title={title}
                className={`rounded-lg max-w-full h-auto ${props.className ?? ""}`.trim()}
                loading="lazy"
              />
            )
          },
          
          // Enhanced pre component with better code extraction
          pre({ children, ...props }: any) {
            const codeText = extractCodeText(children)
            
            const copyToClipboard = async () => {
              if (navigator.clipboard) {
                try {
                  await navigator.clipboard.writeText(codeText)
                } catch (err) {
                  // Fallback for older browsers
                  const textArea = document.createElement('textarea')
                  textArea.value = codeText
                  document.body.appendChild(textArea)
                  textArea.select()
                  document.execCommand('copy')
                  document.body.removeChild(textArea)
                }
              }
            }
            
            return (
              <div className="relative group">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 z-10 rounded border border-border bg-background/80 px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100 hover:bg-background/90"
                  aria-label="Copy code"
                  title="Copy code"
                >
                  Copy
                </button>
                <pre {...props} className="overflow-x-auto">{children}</pre>
              </div>
            )
          },
          
          // Enhanced code component with better language and diagram support
          code({ inline, className, children, ...rest }: any) {
            const langMatch = /language-(\w+)/.exec(className || "")
            const language = langMatch?.[1]?.toLowerCase()
            const text = String(children ?? "").replace(/\n$/, '')
            
            // Handle special code blocks
            if (!inline && language) {
              // Normalize escaped triple backticks inside fenced markdown code blocks
              if (language === "markdown" || language === "md") {
                const normalized = text.replace(/\\`{3}/g, "```")
                return (
                  <pre className={`language-${language}`}>
                    <code>{normalized}</code>
                  </pre>
                )
              }
              // Mermaid diagrams
              if (language === "mermaid") {
                try {
                  const encoded = btoa(unescape(encodeURIComponent(text)))
                  const src = `https://mermaid.ink/img/${encoded}`
                  return (
                    <div className="my-4 text-center">
                      <img 
                        src={src} 
                        alt="Mermaid diagram" 
                        className="mx-auto rounded border"
                        onError={(e) => {
                          // Fallback to text if mermaid.ink fails
                          const target = e.target as HTMLImageElement
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `<pre class="language-mermaid"><code>${text}</code></pre>`
                          }
                        }}
                      />
                    </div>
                  )
                } catch {
                  // Fallback to regular code block
                  return (
                    <pre className="language-mermaid">
                      <code>{text}</code>
                    </pre>
                  )
                }
              }
              
              // PlantUML diagrams
              if (language === "plantuml" || language === "puml") {
                try {
                  const encoded = btoa(unescape(encodeURIComponent(text)))
                  const src = `http://www.plantuml.com/plantuml/png/${encoded}`
                  return (
                    <div className="my-4 text-center">
                      <img 
                        src={src} 
                        alt="PlantUML diagram" 
                        className="mx-auto rounded border"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `<pre class="language-plantuml"><code>${text}</code></pre>`
                          }
                        }}
                      />
                    </div>
                  )
                } catch {
                  return (
                    <pre className={`language-${language}`}>
                      <code>{text}</code>
                    </pre>
                  )
                }
              }
              
              // Graphviz DOT diagrams
              if (language === "dot" || language === "graphviz") {
                return (
                  <div className="my-4 p-4 border rounded bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-2">Graphviz DOT diagram:</p>
                    <pre className={`language-${language}`}>
                      <code>{text}</code>
                    </pre>
                  </div>
                )
              }
            }
            
            if (inline) {
              return (
                <code 
                  className={`bg-muted px-1.5 py-0.5 rounded text-sm font-mono ${className ?? ""}`.trim()} 
                  {...rest}
                >
                  {children}
                </code>
              )
            }
            
            return (
              <code className={className} {...rest}>
                {children}
              </code>
            )
          },
          
          // Enhanced table component with better responsive handling
          table({ children, ...rest }: any) {
            return (
              <div className="my-6 overflow-x-auto">
                <table 
                  {...rest} 
                  className="min-w-full divide-y divide-border border border-border rounded-lg"
                >
                  {children}
                </table>
              </div>
            )
          },
          
          thead({ children, ...rest }: any) {
            return (
              <thead {...rest} className="bg-muted/50">
                {children}
              </thead>
            )
          },
          
          th({ children, ...rest }: any) {
            return (
              <th 
                {...rest} 
                className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                {children}
              </th>
            )
          },
          
          td({ children, ...rest }: any) {
            return (
              <td {...rest} className="px-4 py-3 text-sm border-t border-border">
                {children}
              </td>
            )
          },
          
          // Enhanced definition list
          dl({ children, ...rest }: any) {
            return (
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2 my-6" {...rest}>
                {children}
              </dl>
            )
          },
          
          dt({ children, ...rest }: any) {
            return (
              <dt {...rest} className="font-semibold text-foreground sm:col-span-1">
                {children}
              </dt>
            )
          },
          
          dd({ children, ...rest }: any) {
            return (
              <dd {...rest} className="text-muted-foreground sm:col-span-2">
                {children}
              </dd>
            )
          },
          
          // Enhanced blockquote
          blockquote({ children, ...rest }: any) {
            return (
              <blockquote 
                {...rest} 
                className="my-6 border-l-4 border-primary pl-6 italic text-muted-foreground"
              >
                {children}
              </blockquote>
            )
          },
          
          // Enhanced headings with better styling
          h1({ children, ...rest }: any) {
            return (
              <h1 {...rest} className="group scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 mt-8 first:mt-0">
                {children}
              </h1>
            )
          },
          
          h2({ children, ...rest }: any) {
            return (
              <h2 {...rest} className="group scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-4 mt-8 first:mt-0">
                {children}
              </h2>
            )
          },
          
          h3({ children, ...rest }: any) {
            return (
              <h3 {...rest} className="group scroll-m-20 text-2xl font-semibold tracking-tight mb-4 mt-6 first:mt-0">
                {children}
              </h3>
            )
          },
          
          h4({ children, ...rest }: any) {
            return (
              <h4 {...rest} className="group scroll-m-20 text-xl font-semibold tracking-tight mb-3 mt-4 first:mt-0">
                {children}
              </h4>
            )
          },
          
          h5({ children, ...rest }: any) {
            return (
              <h5 {...rest} className="group scroll-m-20 text-lg font-semibold tracking-tight mb-2 mt-4 first:mt-0">
                {children}
              </h5>
            )
          },
          
          h6({ children, ...rest }: any) {
            return (
              <h6 {...rest} className="group scroll-m-20 text-base font-semibold tracking-tight mb-2 mt-3 first:mt-0">
                {children}
              </h6>
            )
          },
          
          // Enhanced lists
          ul({ children, ...rest }: any) {
            return (
              <ul {...rest} className="my-6 ml-6 list-disc [&>li]:mt-2">
                {children}
              </ul>
            )
          },
          
          ol({ children, ...rest }: any) {
            return (
              <ol {...rest} className="my-6 ml-6 list-decimal [&>li]:mt-2">
                {children}
              </ol>
            )
          },
          
          li({ children, ...rest }: any) {
            return <li {...rest}>{children}</li>
          },
          
          // Enhanced paragraph
          p({ children, ...rest }: any) {
            return (
              <p {...rest} className="leading-7 [&:not(:first-child)]:mt-6">
                {children}
              </p>
            )
          },
          
          // Horizontal rule
          hr({ ...rest }: any) {
            return <hr {...rest} className="my-8 border-border" />
          },
          
          // Additional elements
          mark({ children, ...rest }: any) {
            return (
              <mark {...rest} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
                {children}
              </mark>
            )
          },
          
          kbd({ children, ...rest }: any) {
            return (
              <kbd 
                {...rest} 
                className="inline-flex items-center px-2 py-1 text-xs font-mono bg-muted border border-border rounded shadow-sm"
              >
                {children}
              </kbd>
            )
          },
          
          details({ children, ...rest }: any) {
            return (
              <details {...rest} className="my-4 border border-border rounded-lg">
                {children}
              </details>
            )
          },
          
          summary({ children, ...rest }: any) {
            return (
              <summary {...rest} className="cursor-pointer px-4 py-2 bg-muted/50 font-medium hover:bg-muted/70 transition-colors">
                {children}
              </summary>
            )
          },
          
          // Admonition containers
          div({ className, children, ...rest }: any) {
            if (className?.includes('admonition')) {
              const type = className.match(/admonition-(\w+)/)?.[1] || 'info'
              const icons: Record<string, string> = {
                note: '📝',
                warning: '⚠️',
                tip: '💡',
                info: 'ℹ️'
              }
              const colors: Record<string, string> = {
                note: 'border-blue-500 bg-blue-50 dark:bg-blue-950',
                warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
                tip: 'border-green-500 bg-green-50 dark:bg-green-950',
                info: 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950'
              }
              
              return (
                <div className={`my-6 border-l-4 p-4 rounded-r ${colors[type] || colors.info}`} {...rest}>
                  <div className="flex items-start gap-2">
                    <span className="text-lg" role="img" aria-label={type}>
                      {icons[type] || icons.info}
                    </span>
                    <div className="flex-1">
                      {children}
                    </div>
                  </div>
                </div>
              )
            }
            
            return <div className={className} {...rest}>{children}</div>
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}