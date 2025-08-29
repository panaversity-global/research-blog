import { NextResponse } from "next/server"
import { getPostBySlug } from "@/lib/posts"

interface Context {
  params: Promise<{ slug: string }>
}

export async function GET(_req: Request, { params }: Context) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return NextResponse.json({ error: "Not Found" }, { status: 404 })

  const { frontmatter, content } = post
  return NextResponse.json(
    {
      title: frontmatter.title,
      date: frontmatter.date,
      author: frontmatter.author ?? null,
      tags: frontmatter.tags ?? [],
      summary: frontmatter.summary ?? "",
      canonical: frontmatter.canonical ?? null,
      ai_readable: frontmatter.ai_readable ?? true,
      body_markdown: content,
    },
    { status: 200 },
  )
}
