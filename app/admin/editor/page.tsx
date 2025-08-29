"use client"

import { useState, useRef } from "react"
import { Markdown } from "@/lib/markdown"

export default function EditorPage() {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [author, setAuthor] = useState("")
  const [tags, setTags] = useState("")
  const [summary, setSummary] = useState("")
  const [canonical, setCanonical] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  async function saveJson() {
    setStatus("Saving...")
    const frontmatter = {
      title,
      date,
      author: author || undefined,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : undefined,
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">Editor</h1>
          <div className="space-y-3">
            <input className="w-full px-3 py-2 rounded bg-muted" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="w-full px-3 py-2 rounded bg-muted" placeholder="Date (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} />
            <input className="w-full px-3 py-2 rounded bg-muted" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <input className="w-full px-3 py-2 rounded bg-muted" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
            <input className="w-full px-3 py-2 rounded bg-muted" placeholder="Canonical URL" value={canonical} onChange={(e) => setCanonical(e.target.value)} />
            <textarea className="w-full h-64 px-3 py-2 rounded bg-muted font-mono" placeholder="# Markdown here" value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="flex gap-3 items-center flex-wrap">
              <button className="px-4 py-2 rounded bg-primary text-primary-foreground" onClick={saveJson}>Save</button>
              <label className="px-4 py-2 rounded bg-muted cursor-pointer">
                Upload .md/.mdx
                <input ref={fileInputRef} className="hidden" type="file" accept=".md,.mdx" onChange={uploadFile} />
              </label>
              <button className="px-4 py-2 rounded bg-muted" onClick={uploadMedia}>Insert Image/Audio</button>
              {status ? <span className="text-sm text-muted-foreground">{status}</span> : null}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          <Markdown content={content || "# Start writing...\n\n```ts\nconsole.log('hello')\n```"} />
        </div>
      </div>
    </div>
  )
}
