import { NextResponse } from 'next/server'

export async function GET() {
  // Redirect to an existing icon to avoid 404s
  return NextResponse.redirect(new URL('/placeholder-logo.png', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}


