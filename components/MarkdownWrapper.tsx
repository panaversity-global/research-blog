"use client"

import dynamic from "next/dynamic"

const Markdown = dynamic(() => import("@/lib/markdown").then(m => m.Markdown), {
  ssr: false,
})

export default Markdown


