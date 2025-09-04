'use client'

import { useState } from 'react'
import { FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TopicsSectionProps {
  categories: string[]
}

export default function TopicsSection({ categories }: TopicsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  
  // Show only first 6 by default, or all if showAll is true
  const displayedCategories = showAll ? categories : categories.slice(0, 6)
  const hasMore = categories.length > 6

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Topics
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our content by category
          </p>
        </div>

        {/* Cookbook-style large topic tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {displayedCategories.map((category, index) => {
            const categoryColors = [
              'from-rose-500/80 to-orange-500/80',
              'from-sky-500/80 to-indigo-600/80', 
              'from-emerald-500/80 to-teal-600/80',
              'from-fuchsia-500/80 to-pink-600/80',
              'from-amber-500/80 to-red-600/80',
              'from-blue-500/80 to-cyan-600/80'
            ]

            return (
              <div 
                key={category}
                className="group block rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-transform duration-300 hover:scale-[1.01]"
              >
                <div className={`relative aspect-[16/9] bg-gradient-to-br ${categoryColors[index % categoryColors.length]} flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="relative text-center text-white px-6">
                    <FolderOpen className="h-8 w-8 mx-auto mb-3 opacity-90" />
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {category}
                    </h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Show More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              size="lg"
              className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-3"
            >
              {showAll ? 'Show Less' : `Show More (${categories.length - 6} more)`}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
