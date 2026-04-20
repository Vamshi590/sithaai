import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api'
import type { Post } from '@/types'

type Tab = 'ai-generate' | 'upload-create'
type UploadType = 'patient' | 'infrastructure'

export default function GeneratePage() {
  const navigate = useNavigate()

  // ── Shared post list (both tabs write here) ──────────────────────────────
  const [posts, setPosts] = useState<Post[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)

  // ── Tab ──────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<Tab>('ai-generate')

  // ── AI Generate tab ──────────────────────────────────────────────────────
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  // ── Upload & Create tab ──────────────────────────────────────────────────
  const [uploadType, setUploadType] = useState<UploadType>('patient')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [filePreviews, setFilePreviews] = useState<string[]>([])
  const [uploadText, setUploadText] = useState('')
  const [language, setLanguage] = useState('English')
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const post = posts[currentIndex] ?? null

  // ── Helpers ───────────────────────────────────────────────────────────────

  function addPost(newPost: Post) {
    setPosts(prev => {
      const updated = [...prev, newPost]
      setCurrentIndex(updated.length - 1)
      setSlideIndex(0)
      return updated
    })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? [])
    if (!selected.length) return
    const merged = [...uploadedFiles, ...selected].slice(0, 5)
    setUploadedFiles(merged)
    setFilePreviews(merged.map(f => URL.createObjectURL(f)))
    // reset input so same file can be re-added after removal
    e.target.value = ''
  }

  function removeFile(index: number) {
    const next = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(next)
    setFilePreviews(next.map(f => URL.createObjectURL(f)))
  }

  // ── AI Generate ──────────────────────────────────────────────────────────

  async function handleAiGenerate() {
    setAiLoading(true)
    setAiError('')
    try {
      const res = await apiFetch('/api/generate', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) { setAiError(data.error ?? 'Generation failed. Please try again.'); return }
      addPost(data.post)
    } catch {
      setAiError('Network error. Please try again.')
    } finally {
      setAiLoading(false)
    }
  }

  // ── Upload & Create ───────────────────────────────────────────────────────

  async function handleUploadCreate() {
    if (uploadedFiles.length === 0) return
    setUploadLoading(true)
    setUploadError('')
    try {
      const formData = new FormData()
      uploadedFiles.forEach(f => formData.append('images', f))
      formData.append('upload_type', uploadType)
      if (uploadText.trim()) formData.append('text', uploadText.trim())
      if (uploadType === 'patient') formData.append('language', language)

      const res = await apiFetch('/api/generate-from-image', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) { setUploadError(data.error ?? 'Failed to create post.'); return }

      addPost(data.post)
      // Switch to AI tab to reveal the result in the shared preview
      setActiveTab('ai-generate')
      // Reset form
      setUploadedFiles([])
      setFilePreviews([])
      setUploadText('')
    } catch {
      setUploadError('Network error. Please try again.')
    } finally {
      setUploadLoading(false)
    }
  }

  // ── Slide image renderer (shared by both tabs) ────────────────────────────

  function renderPostPreview() {
    if (!post) return null
    const slides = post.slide_urls && post.slide_urls.length > 1 ? post.slide_urls : null
    const currentImage = slides ? slides[slideIndex] : post.image_url

    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Post navigator (when multiple posts exist) */}
        {posts.length > 1 && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-gray-50">
            <button
              onClick={() => { setCurrentIndex(i => Math.max(0, i - 1)); setSlideIndex(0) }}
              disabled={currentIndex === 0}
              className="p-1 rounded text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              ← Prev
            </button>
            <span className="text-xs text-gray-500 font-medium">{currentIndex + 1} / {posts.length}</span>
            <button
              onClick={() => { setCurrentIndex(i => Math.min(posts.length - 1, i + 1)); setSlideIndex(0) }}
              disabled={currentIndex === posts.length - 1}
              className="p-1 rounded text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              Next →
            </button>
          </div>
        )}

        {/* Slide image */}
        <div className="relative aspect-square">
          <img src={currentImage} alt={post.caption.slice(0, 80)} className="w-full h-full object-cover" />
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

        {/* Meta */}
        <div className="p-4 space-y-3">
          <div>
            <div className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">{post.post_type}</div>
            <p className="text-sm text-gray-700 leading-relaxed">{post.caption}</p>
          </div>
          <div className="text-xs text-gray-400">{post.hashtags.map(h => `#${h}`).join(' ')}</div>
          <p className="text-xs text-gray-400">✓ Post saved automatically</p>

          {posts.length > 1 && (
            <div className="flex justify-center gap-1.5">
              {posts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIndex(i); setSlideIndex(0) }}
                  className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-indigo-600' : 'bg-gray-200 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <Button variant="outline" size="sm" className="flex-1" onClick={handleAiGenerate} disabled={aiLoading}>
              + Generate More
            </Button>
            <Button size="sm" className="flex-1" onClick={() => navigate('/dashboard')}>
              View Dashboard →
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Generate Post</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          AI will create a branded Instagram post for your clinic.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b border-gray-200">
        {(['ai-generate', 'upload-create'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'ai-generate' ? '✨ AI Generate' : '📷 Upload & Create'}
          </button>
        ))}
      </div>

      {/* ── AI Generate tab ─────────────────────────────────────────────── */}
      {activeTab === 'ai-generate' && (
        <>
          <Button onClick={handleAiGenerate} disabled={aiLoading} size="lg" className="w-full">
            {aiLoading ? 'Generating...' : '✨ Generate Post'}
          </Button>

          {aiError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {aiError}
            </div>
          )}

          {renderPostPreview()}
        </>
      )}

      {/* ── Upload & Create tab ──────────────────────────────────────────── */}
      {activeTab === 'upload-create' && (
        <div className="space-y-5">

          {/* Type selector */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">What are you uploading?</p>
            <div className="flex gap-2">
              {(['patient', 'infrastructure'] as UploadType[]).map(type => (
                <button
                  key={type}
                  onClick={() => { setUploadType(type); if (type === 'infrastructure') setLanguage('English') }}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium border transition-colors ${
                    uploadType === type
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {type === 'patient' ? '🤝 Patient Testimonial' : '🏥 Clinic Facility'}
                </button>
              ))}
            </div>
          </div>

          {/* Consent notice for patient type */}
          {uploadType === 'patient' && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex gap-3">
              <span className="text-amber-500 text-base mt-0.5 flex-shrink-0">⚠</span>
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-semibold">Patient consent required.</span> Please obtain written consent from the patient before uploading or publishing their photo. Do not upload photos without explicit consent.
              </p>
            </div>
          )}

          {/* Language selector — patient only */}
          {uploadType === 'patient' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Testimonial language
              </label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
              >
                {[
                  'English',
                  'Hindi',
                  'Tamil',
                  'Telugu',
                  'Kannada',
                  'Malayalam',
                  'Marathi',
                  'Gujarati',
                  'Bengali',
                  'Punjabi',
                  'Odia',
                  'Urdu',
                ].map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                The testimonial text will be written in this language. Hashtags stay in English.
              </p>
            </div>
          )}

          {/* Image upload area */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Photos <span className="text-gray-400 font-normal">(max 5)</span>
            </p>

            {/* Previews grid */}
            {filePreviews.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mb-3">
                {filePreviews.map((src, i) => (
                  <div key={i} className="relative aspect-square">
                    <img src={src} className="w-full h-full object-cover rounded-lg border border-gray-200" />
                    <button
                      onClick={() => removeFile(i)}
                      className="absolute -top-1.5 -right-1.5 bg-gray-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Drop zone / add button */}
            {uploadedFiles.length < 5 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 px-4 text-center hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors"
              >
                <div className="text-2xl mb-1">+</div>
                <p className="text-sm text-gray-500">
                  {uploadedFiles.length === 0 ? 'Click to upload photos' : 'Add more photos'}
                </p>
                <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP · max 10 MB each</p>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Optional text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {uploadType === 'patient' ? "Patient's own words" : 'Note about this space'}
              <span className="text-gray-400 font-normal ml-1">(optional)</span>
            </label>
            <textarea
              value={uploadText}
              onChange={e => setUploadText(e.target.value)}
              placeholder={
                uploadType === 'patient'
                  ? 'e.g. "The doctors here are so caring and took the time to explain everything…"'
                  : 'e.g. "Our newly renovated OT with the latest laparoscopic equipment"'
              }
              rows={3}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 resize-none placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
            />
            {uploadType === 'patient' && (
              <p className="text-xs text-gray-400 mt-1">
                If left blank, AI will generate the testimonial text.
              </p>
            )}
          </div>

          {uploadError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {uploadError}
            </div>
          )}

          <Button
            onClick={handleUploadCreate}
            disabled={uploadedFiles.length === 0 || uploadLoading}
            size="lg"
            className="w-full"
          >
            {uploadLoading ? 'Analyzing & creating post…' : '✨ Create Post'}
          </Button>
        </div>
      )}
    </div>
  )
}
