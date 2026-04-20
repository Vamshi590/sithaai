import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
  onDelete: (id: string) => void
  onPostToIG: (id: string) => Promise<void>
}

const TYPE_COLORS: Record<string, string> = {
  educational:    'bg-indigo-50 text-indigo-600',
  promo:          'bg-pink-50 text-pink-600',
  doctor:         'bg-sky-50 text-sky-600',
  trust:          'bg-teal-50 text-teal-600',
  engagement:     'bg-orange-50 text-orange-600',
  testimonial:    'bg-rose-50 text-rose-600',
  infrastructure: 'bg-emerald-50 text-emerald-600',
}

export function PostCard({ post, onDelete, onPostToIG }: PostCardProps) {
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')
  const [slideIndex, setSlideIndex] = useState(0)

  const slides = post.slide_urls && post.slide_urls.length > 1 ? post.slide_urls : null
  const currentImage = slides ? slides[slideIndex] : post.image_url

  async function handlePostToIG() {
    setPosting(true)
    setError('')
    try {
      await onPostToIG(post.id)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to post')
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="relative aspect-square">
        <img
          src={currentImage}
          alt={post.caption.slice(0, 80)}
          className="w-full h-full object-cover"
        />
        {slides && (
          <>
            <button
              onClick={() => setSlideIndex(i => Math.max(0, i - 1))}
              disabled={slideIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm disabled:opacity-20"
            >
              ‹
            </button>
            <button
              onClick={() => setSlideIndex(i => Math.min(slides.length - 1, i + 1))}
              disabled={slideIndex === slides.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm disabled:opacity-20"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === slideIndex ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TYPE_COLORS[post.post_type] ?? 'bg-gray-100 text-gray-600'}`}>
            {post.post_type}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
          {post.caption}
        </p>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <div className="flex gap-2 pt-1">
          {post.status === 'posted' ? (
            <div className="flex-1 text-xs text-emerald-600 font-medium flex items-center gap-1">
              ✓ Posted
            </div>
          ) : (
            <Button
              size="sm"
              className="flex-1 text-xs h-8"
              onClick={handlePostToIG}
              disabled={posting}
            >
              {posting ? 'Posting...' : 'Post to Instagram'}
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 px-2 text-gray-400 hover:text-red-500"
            onClick={() => onDelete(post.id)}
          >
            ✕
          </Button>
        </div>
      </div>
    </div>
  )
}
