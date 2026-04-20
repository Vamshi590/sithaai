import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL ?? ''

interface PreviewPost {
  id: string
  caption: string
  hashtags: string[]
  image_url: string
  slide_urls: string[] | null
  post_type: string
  status: string
}

interface PreviewData {
  post: PreviewPost
  clinic_name: string
  instagram_connected: boolean
  already_posted: boolean
}

export default function PreviewPage() {
  const { token } = useParams<{ token: string }>()
  const [data, setData] = useState<PreviewData | null>(null)
  const [error, setError] = useState('')
  const [slideIndex, setSlideIndex] = useState(0)
  const [posting, setPosting] = useState(false)
  const [posted, setPosted] = useState(false)

  useEffect(() => {
    if (!token) return
    fetch(`${API_URL}/api/preview/${token}`)
      .then(r => r.json())
      .then((d: PreviewData & { error?: string }) => {
        if (d.error) { setError(d.error); return }
        setData(d)
        if (d.already_posted) setPosted(true)
      })
      .catch(() => setError('Failed to load preview.'))
  }, [token])

  async function handleApprove() {
    if (!token) return
    setPosting(true)
    try {
      const res = await fetch(`${API_URL}/api/preview/${token}/approve`, { method: 'POST' })
      const d = await res.json() as { success?: boolean; error?: string }
      if (!res.ok || d.error) { setError(d.error ?? 'Failed to post'); return }
      setPosted(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setPosting(false)
    }
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (!data && !error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading preview…</p>
      </div>
    )
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-gray-100 p-8 max-w-sm w-full text-center space-y-3">
          <div className="text-3xl">⚠️</div>
          <p className="text-sm font-medium text-gray-700">{error}</p>
          <p className="text-xs text-gray-400">This link may have expired or already been used.</p>
        </div>
      </div>
    )
  }

  const post = data!.post
  const slides = post.slide_urls && post.slide_urls.length > 1 ? post.slide_urls : null
  const currentImage = slides ? slides[slideIndex] : post.image_url

  // ── Success ────────────────────────────────────────────────────────────────
  if (posted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-gray-100 p-8 max-w-sm w-full text-center space-y-4">
          <div className="text-4xl">🎉</div>
          <h2 className="text-lg font-bold text-gray-900">Posted to Instagram!</h2>
          <p className="text-sm text-gray-500">
            The testimonial has been published to <strong>{data!.clinic_name}</strong>'s Instagram page.
          </p>
        </div>
      </div>
    )
  }

  // ── Preview ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-sm space-y-5">

        {/* Header */}
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Post preview</p>
          <h1 className="text-lg font-bold text-gray-900">{data!.clinic_name}</h1>
        </div>

        {/* Image with slide nav */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="relative aspect-square">
            <img
              src={currentImage}
              alt="Post preview"
              className="w-full h-full object-cover"
            />
            {slides && (
              <>
                <button
                  onClick={() => setSlideIndex(i => Math.max(0, i - 1))}
                  disabled={slideIndex === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg disabled:opacity-20"
                >‹</button>
                <button
                  onClick={() => setSlideIndex(i => Math.min(slides.length - 1, i + 1))}
                  disabled={slideIndex === slides.length - 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg disabled:opacity-20"
                >›</button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${i === slideIndex ? 'bg-white' : 'bg-white/40'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Caption + hashtags */}
          <div className="p-4 space-y-2">
            <p className="text-sm text-gray-700 leading-relaxed">{post.caption}</p>
            <p className="text-xs text-gray-400">{post.hashtags.map(h => `#${h}`).join(' ')}</p>
          </div>
        </div>

        {/* Action */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {data!.instagram_connected ? (
          <button
            onClick={handleApprove}
            disabled={posting}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3.5 rounded-xl text-sm transition-all disabled:opacity-60"
          >
            {posting ? 'Publishing…' : '🚀 Approve & Post to Instagram'}
          </button>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800 text-center">
            Instagram is not connected for this clinic. Connect it in Settings to publish.
          </div>
        )}

      </div>
    </div>
  )
}
