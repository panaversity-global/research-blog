import "./globals.css"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"

export const metadata: Metadata = {
  title: "Markdown Blog",
  description: "A dual-format markdown/MDX blog",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
