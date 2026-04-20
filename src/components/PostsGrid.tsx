import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { apiFetch } from '@/lib/api'
import { useAppContext } from '@/context/AppContext'
import { PostCard } from './PostCard'
import type { Post } from '@/types'

interface PostsGridProps {
  onCountChange?: (count: number) => void
}

export function PostsGrid({ onCountChange }: PostsGridProps) {
  const { clinic } = useAppContext()
  const [posts, setPosts] = useState<Post[]>([])
  const [filter, setFilter] = useState<'all' | 'draft' | 'posted'>('all')
  const [loading, setLoading] = useState(true)
  const [igError, setIgError] = useState('')

  useEffect(() => {
    // clinic.id comes from context — no user/clinic fetch needed
    supabase
      .from('posts')
      .select('*')
      .eq('clinic_id', clinic.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        const p = data ?? []
        setPosts(p)
        onCountChange?.(p.length)
        setLoading(false)
      })
  }, [clinic.id, onCountChange])

  async function handleDelete(id: string) {
    await supabase.from('posts').delete().eq('id', id)
    setPosts(prev => {
      const next = prev.filter(p => p.id !== id)
      onCountChange?.(next.length)
      return next
    })
  }

  async function handlePostToIG(id: string) {
    setIgError('')
    const res = await apiFetch('/api/instagram/post', {
      method: 'POST',
      body: JSON.stringify({ postId: id }),
    })
    const data = await res.json()
    if (!res.ok) {
      if (data.error === 'TOKEN_EXPIRED') {
        setIgError('Instagram disconnected. Reconnect in Settings.')
        throw new Error('Instagram disconnected. Reconnect in Settings.')
      }
      throw new Error(data.error ?? 'Failed to post to Instagram')
    }
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'posted' as const } : p))
  }

  const filtered = filter === 'all' ? posts : posts.filter(p => p.status === filter)

  if (loading) return <div className="text-sm text-gray-400">Loading posts...</div>

  return (
    <div className="space-y-6">
      {igError && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm px-4 py-3 rounded-lg">
          {igError}
        </div>
      )}

      <div className="flex gap-2">
        {(['all', 'draft', 'posted'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          {filter === 'all' ? 'No posts yet. Click Generate to create your first post.' : `No ${filter} posts.`}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onPostToIG={handlePostToIG}
            />
          ))}
        </div>
      )}
    </div>
  )
}
