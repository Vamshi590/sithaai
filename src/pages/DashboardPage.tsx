import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { PostsGrid } from '@/components/PostsGrid'

export default function DashboardPage() {
  const [postCount, setPostCount] = useState(0)

  // useCallback so PostsGrid's useEffect dep array stays stable
  const handleCountChange = useCallback((count: number) => {
    setPostCount(count)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Posts</h1>
          <p className="text-sm text-gray-400 mt-0.5">{postCount} posts generated</p>
        </div>
        <Link to="/dashboard/generate">
          <Button>+ Generate Post</Button>
        </Link>
      </div>
      <PostsGrid onCountChange={handleCountChange} />
    </div>
  )
}
