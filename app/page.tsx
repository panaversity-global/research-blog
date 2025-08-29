import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPosts } from "@/lib/posts"

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Markdown Blog</h1>
          <p className="text-xl text-muted-foreground">
            A dual-format blog supporting both rendered and raw markdown views
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link href={`/posts/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.frontmatter.title}
                  </Link>
                </CardTitle>
                <CardDescription>{post.frontmatter.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{post.frontmatter.date}</span>
                  <div className="flex gap-2">
                    <Link href={`/posts/${post.slug}`} className="hover:text-primary transition-colors">
                      Read
                    </Link>
                    <span>•</span>
                    <Link href={`/posts/${post.slug}.md`} className="hover:text-primary transition-colors">
                      Raw
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            View posts in rendered format or add <code className="bg-muted px-1 py-0.5 rounded">.md</code> to any URL
            for raw markdown
          </p>
        </div>
      </div>
    </div>
  )
}
