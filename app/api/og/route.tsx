import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'TechBlog'
    const description = searchParams.get('description') || 'Modern Development Insights & Best Practices'
    const author = searchParams.get('author') || 'TechBlog Team'
    
    // Calculate font sizes based on title length
    const titleFontSize = title.length > 50 ? 48 : title.length > 30 ? 56 : 64
    const descFontSize = description.length > 100 ? 20 : 24
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
            padding: '40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
            }}
          />
          
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              TB
            </div>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              TechBlog
            </span>
          </div>
          
          {/* Title */}
          <h1
            style={{
              fontSize: titleFontSize,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              margin: '0 0 20px 0',
              lineHeight: 1.2,
              maxWidth: '900px',
              wordWrap: 'break-word',
            }}
          >
            {title}
          </h1>
          
          {/* Description */}
          {description && (
            <p
              style={{
                fontSize: descFontSize,
                color: '#cbd5e1',
                textAlign: 'center',
                margin: '0 0 30px 0',
                maxWidth: '800px',
                lineHeight: 1.4,
              }}
            >
              {description}
            </p>
          )}
          
          {/* Author and Date */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              color: '#94a3b8',
              fontSize: '18px',
            }}
          >
            <span>By {author}</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          {/* Bottom Accent */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(90deg, #3b82f6 0%, #9333ea 50%, #ec4899 100%)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred'
    console.log(`${errorMessage}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
