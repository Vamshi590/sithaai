import { useRef, useState } from 'react'
import { apiFetch } from '@/lib/api'

interface ImageUploadProps {
  folder: 'logos' | 'doctors'
  value: string | null          // current S3 public URL
  onChange: (url: string | null) => void
  shape?: 'square' | 'circle'
  placeholder?: string
}

export function ImageUpload({
  folder,
  value,
  onChange,
  shape = 'square',
  placeholder = 'Upload photo',
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const display = preview ?? value   // prefer local preview while uploading
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-xl'

  async function handleFile(file: File) {
    setError('')
    setPreview(URL.createObjectURL(file))
    setUploading(true)

    try {
      // Send file to our server — it uploads to S3 (no browser CORS needed)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const res = await apiFetch('/api/upload', { method: 'POST', body: formData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Upload failed')

      onChange(json.publicUrl)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
      setPreview(null)
      onChange(null)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`relative w-28 h-28 ${radius} border-2 border-dashed border-gray-200 hover:border-gray-400 transition-colors overflow-hidden bg-gray-50 flex items-center justify-center`}
      >
        {display ? (
          <img src={display} alt="preview" className={`w-full h-full object-cover ${radius}`} />
        ) : (
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-2xl">📷</span>
            <span className="text-xs text-center px-2">{placeholder}</span>
          </div>
        )}
        {uploading && (
          <div className={`absolute inset-0 bg-white/75 ${radius} flex items-center justify-center`}>
            <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin" />
          </div>
        )}
      </button>

      {display && !uploading && (
        <button
          type="button"
          onClick={() => { setPreview(null); onChange(null) }}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          Remove
        </button>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />
    </div>
  )
}
