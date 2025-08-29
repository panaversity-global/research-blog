"use client"

import React from "react"
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
import rehypeHighlight from "rehype-highlight"

import { visit } from "unist-util-visit"
import "katex/dist/katex.min.css"

/* -------------------------------
   Custom plugin for admonitions
-------------------------------- */
function remarkAdmonitions() {
  return (tree: any) => {
    visit(tree, "containerDirective", (node: any) => {
      if (["note", "warning", "tip", "info"].includes(node.name)) {
        const data = node.data || (node.data = {})
        const tagName = "div"
        const properties = {
          className: ["admonition", `admonition-${node.name}`],
        }
        data.hName = tagName
        data.hProperties = properties
      }
    })
  }
}

/* -------------------------------
   Main Markdown Component
-------------------------------- */
export function Markdown({ content }: { content: string }) {
  // extend sanitize schema to allow extra attributes
  const sanitizeSchema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      "*": [
        ...(defaultSchema.attributes?.["*"] || []),
        "className",
        "style",
        "id",
        "data-*",
      ],
      div: ["className", "id", "data-*"],
      sup: ["className", "id"],
    },
  }

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm, // ✅ includes footnotes now
          remarkMath,
          remarkDeflist,
          remarkBreaks,
          remarkEmoji,
          remarkSupersub,
          remarkDirective,
          remarkFrontmatter,
          remarkWikiLink,
          remarkAbbr,
          remarkGemoji,
          remarkIns,
          remarkMark,
          remarkSmartypants,
          remarkToc,
          remarkAdmonitions,
        ]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeSanitize, sanitizeSchema],
          rehypeRaw,
          rehypeKatex,
          rehypeHighlight,
        ]}
        components={{
          /* --------------------------
             Footnotes Rendering
          -------------------------- */
          sup({ children, ...rest }) {
            return (
              <sup
                {...rest}
                className="text-xs text-blue-400 cursor-pointer hover:underline align-super"
              >
                {children}
              </sup>
            )
          },
          section({ className, children, ...rest }) {
            if (className === "footnotes") {
              return (
                <section
                  {...rest}
                  className="mt-8 border-t border-border pt-4 text-sm text-muted-foreground"
                >
                  <h4 className="font-semibold mb-2">Footnotes</h4>
                  {children}
                </section>
              )
            }
            return (
              <section className={className} {...rest}>
                {children}
              </section>
            )
          },

          /* --------------------------
             Abbreviations
          -------------------------- */
          abbr({ title, children, ...rest }) {
            return (
              <abbr
                {...rest}
                title={title}
                className="cursor-help underline decoration-dotted"
              >
                {children}
              </abbr>
            )
          },

          /* --------------------------
             Admonition Boxes
          -------------------------- */
          div({ className, children, ...rest }: any) {
            if (className?.includes("admonition")) {
              const type = className.match(/admonition-(\w+)/)?.[1] || "info"
              const icons: Record<string, string> = {
                note: "📝",
                warning: "⚠️",
                tip: "💡",
                info: "ℹ️",
              }
              const colors: Record<string, string> = {
                note: "border-blue-500 bg-blue-50 dark:bg-blue-950",
                warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950",
                tip: "border-green-500 bg-green-50 dark:bg-green-950",
                info: "border-cyan-500 bg-cyan-50 dark:bg-cyan-950",
              }

              return (
                <div
                  className={`my-6 border-l-4 p-4 rounded-r ${colors[type]}`}
                  {...rest}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{icons[type]}</span>
                    <div className="flex-1">{children}</div>
                  </div>
                </div>
              )
            }
            return (
              <div className={className} {...rest}>
                {children}
              </div>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
