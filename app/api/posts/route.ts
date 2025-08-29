import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import matter from "gray-matter"

const POSTS_DIR = path.join(process.cwd(), "content", "posts")

async function ensureDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {}
}

export async function POST(request: Request) {
  await ensureDir(POSTS_DIR)

  const contentType = request.headers.get("content-type") || ""

  // JSON submission: { frontmatter, body_markdown, slug? }
  if (contentType.includes("application/json")) {
    const { frontmatter, body_markdown, slug } = await request.json()
    if (!frontmatter?.title || !frontmatter?.date) {
      return NextResponse.json({ error: "Missing required frontmatter: title, date" }, { status: 400 })
    }
    const safeSlug = (slug || frontmatter.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")).slice(0, 120)
    const filePath = path.join(POSTS_DIR, `${safeSlug}.md`)
    const fileContent = matter.stringify(body_markdown || "", frontmatter)
    await fs.writeFile(filePath, fileContent, "utf8")
    return NextResponse.json({ ok: true, slug: safeSlug })
  }

  // Multipart upload: field "file" with .md/.mdx
  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData()
    const file = form.get("file") as File | null
    if (!file) return NextResponse.json({ error: "file is required" }, { status: 400 })

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const name = file.name
    if (!/\.(md|mdx)$/i.test(name)) {
      return NextResponse.json({ error: "Only .md or .mdx allowed" }, { status: 400 })
    }

    const slug = name.replace(/\.(md|mdx)$/i, "")
    const dest = path.join(POSTS_DIR, name)
    await fs.writeFile(dest, buffer)
    return NextResponse.json({ ok: true, slug })
  }

  return NextResponse.json({ error: "Unsupported content-type" }, { status: 415 })
}
