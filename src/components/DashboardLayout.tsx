import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { AppContext } from '@/context/AppContext'
import { Sidebar } from './Sidebar'
import type { Clinic } from '@/types'
import type { AppUser } from '@/context/AppContext'

export default function DashboardLayout() {
  const navigate = useNavigate()
  const [user, setUser] = useState<AppUser | null>(null)
  const [clinic, setClinic] = useState<Clinic | null>(null)

  useEffect(() => {
    async function bootstrap() {
      // getSession() reads from localStorage — no network call
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) { navigate('/'); return }

      const u = session.user

      // Single clinic query with ALL fields needed by every child page
      const { data } = await supabase
        .from('clinics')
        .select('id, user_id, name, location, tone, departments, logo_url, ig_user_id, whatsapp_number')
        .eq('user_id', u.id)
        .maybeSingle()

      if (!data) { navigate('/onboarding'); return }

      setUser({ id: u.id, email: u.email ?? '' })
      setClinic(data as Clinic)
    }
    bootstrap()
  }, [navigate])

  if (!user || !clinic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
    <AppContext.Provider value={{ user, clinic, setClinic }}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 min-h-screen">
          <Outlet />
        </main>
      </div>
    </AppContext.Provider>
  )
}
