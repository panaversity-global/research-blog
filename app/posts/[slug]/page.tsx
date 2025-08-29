import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { Markdown } from "@/lib/markdown"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }
  const { frontmatter } = post
  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    alternates: { canonical: frontmatter.canonical },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const { frontmatter, content } = post!

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Link href="/" className="text-primary hover:underline">← Back</Link>
        <h1 className="mt-6 text-4xl font-bold">{frontmatter.title}</h1>
        <div className="mt-2 text-muted-foreground text-sm flex gap-4 flex-wrap">
          <span>{frontmatter.date}</span>
          {frontmatter.tags?.length ? <span>Tags: {frontmatter.tags.join(", ")}</span> : null}
        </div>

        <div className="mt-8">
          <Markdown content={content} />
        </div>

        <div className="mt-8 flex gap-4">
          <Link href={`/posts/${slug}/md`} className="text-primary hover:underline">Raw (.md)</Link>
          <Link href={`/posts/${slug}/json`} className="text-primary hover:underline">JSON</Link>
        </div>
      </div>
    </div>
  )
}
