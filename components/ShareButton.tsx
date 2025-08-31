'use client'

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  title: string
  summary?: string
}

export function ShareButton({ title, summary }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: summary || title,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="border-slate-600 text-slate-300 hover:bg-slate-800/50"
      onClick={handleShare}
    >
      <Share2 className="mr-2 h-4 w-4" />
      Share Article
    </Button>
  )
}
