import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Supabase handles the code exchange automatically via onAuthStateChange.
    // We just wait for the session to be established then redirect.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        subscription.unsubscribe()

        // Check if clinic exists
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { navigate('/'); return }

        const { data: clinic } = await supabase
          .from('clinics')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle()

        navigate(clinic ? '/dashboard' : '/onboarding')
      } else if (event === 'SIGNED_OUT') {
        subscription.unsubscribe()
        navigate('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-400">Signing you in...</p>
    </div>
  )
}
