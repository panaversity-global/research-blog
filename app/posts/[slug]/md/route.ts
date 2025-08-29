import { NextResponse } from "next/server"
import { getRawPostBySlug } from "@/lib/posts"

interface Context {
  params: Promise<{ slug: string }>
}

export async function GET(_req: Request, { params }: Context) {
  const { slug } = await params
  const raw = await getRawPostBySlug(slug)
  if (!raw) return new NextResponse("Not Found", { status: 404 })

  return new NextResponse(raw, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
