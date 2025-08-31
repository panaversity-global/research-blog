import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    // Construct the path to the markdown file
    const markdownPath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`)
    
    // Check if the file exists
    if (!fs.existsSync(markdownPath)) {
      return new Response('Markdown file not found', { status: 404 })
    }
    
    // Read the markdown file
    const markdownContent = fs.readFileSync(markdownPath, 'utf-8')
    
    // Return the raw markdown content with proper headers
    return new Response(markdownContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'noindex, nofollow', // Prevent search engines from indexing raw markdown
      },
    })
  } catch (error) {
    console.error('Error serving markdown file:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
