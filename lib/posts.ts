import { promises as fs } from "fs"
import path from "path"
import matter from "gray-matter"

export interface PostFrontmatter {
  title: string
  date: string
  author?: string
  tags?: string[]
  summary?: string
  canonical?: string
  ai_readable?: boolean
}

export interface PostData {
  slug: string
  frontmatter: PostFrontmatter
  content: string
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts")

async function ensurePostsDir(): Promise<void> {
  try {
    await fs.mkdir(POSTS_DIR, { recursive: true })
  } catch {}
}

function formatDateString(value: unknown): string {
  if (!value) return ""
  if (typeof value === "string") {
    const m = value.match(/^\d{4}-\d{2}-\d{2}$/)
    if (m) return value
    const d = new Date(value)
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10)
    return String(value)
  }
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }
  return String(value)
}

function assertIsMarkdownFile(fileName: string): void {
  if (!/\.(md|mdx)$/i.test(fileName)) {
    throw new Error(`Unsupported file extension for post: ${fileName}`)
  }
}

async function resolvePostPath(slug: string): Promise<string | null> {
  await ensurePostsDir()
  const mdPath = path.join(POSTS_DIR, `${slug}.md`)
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`)
  try {
    await fs.access(mdxPath)
    return mdxPath
  } catch {}
  try {
    await fs.access(mdPath)
    return mdPath
  } catch {}
  return null
}

export async function getPostSlugs(): Promise<string[]> {
  await ensurePostsDir()
  let entries: string[] = []
  try {
    entries = await fs.readdir(POSTS_DIR)
  } catch {
    return []
  }
  return entries
    .filter((file) => /\.(md|mdx)$/i.test(file))
    .map((file) => file.replace(/\.(md|mdx)$/i, ""))
}

export async function getRawPostBySlug(slug: string): Promise<string | null> {
  const filePath = await resolvePostPath(slug)
  if (!filePath) return null
  return fs.readFile(filePath, "utf8")
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const filePath = await resolvePostPath(slug)
  if (!filePath) return null

  const raw = await fs.readFile(filePath, "utf8")
  const parsed = matter(raw)

  const fm = parsed.data as Record<string, unknown>
  const frontmatter: PostFrontmatter = {
    title: String(fm.title || "Untitled"),
    date: formatDateString(fm.date),
    author: fm.author ? String(fm.author) : undefined,
    tags: Array.isArray(fm.tags) ? (fm.tags as unknown[]).map(String) : undefined,
    summary: fm.summary ? String(fm.summary) : undefined,
    canonical: fm.canonical ? String(fm.canonical) : undefined,
    ai_readable: Boolean(fm.ai_readable ?? true),
  }
  const content = parsed.content

  return {
    slug,
    frontmatter,
    content,
  }
}

export async function getAllPosts(): Promise<PostData[]> {
  const slugs = await getPostSlugs()
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)))
  return (posts.filter(Boolean) as PostData[]).sort(
    (a, b) => new Date(a.frontmatter.date).getTime() < new Date(b.frontmatter.date).getTime() ? 1 : -1,
  )
}
