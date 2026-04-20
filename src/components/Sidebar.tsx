import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { apiFetch } from '@/lib/api'
import { useAppContext } from '@/context/AppContext'
import type { Plan } from '@/types'

const NAV = [
  { label: 'Posts',      href: '/dashboard',            icon: '📋' },
  { label: 'Generate',   href: '/dashboard/generate',   icon: '✨' },
  { label: 'Campaigns',  href: '/dashboard/campaigns',  icon: '📨' },
  { label: 'Settings',   href: '/dashboard/settings',   icon: '⚙️' },
]

export function Sidebar() {
  const { user, clinic } = useAppContext()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [plan, setPlan] = useState<Plan | null>(null)

  useEffect(() => {
    apiFetch('/api/plan')
      .then(r => r.ok ? r.json() : null)
      .then(data => data && setPlan(data))
      .catch(() => {})
  }, [clinic.id])

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <aside className="w-52 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="font-bold text-sm text-gray-900">ClinicGrow</div>
        <div className="text-xs text-gray-400 mt-0.5 truncate">{clinic.name}</div>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {NAV.map(item => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {plan && plan.monthly_msg_limit > 0 && (
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="text-xs text-gray-400 mb-1">Messages this month</div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
            <div
              className="bg-indigo-400 h-1.5 rounded-full"
              style={{ width: `${Math.min(100, (plan.messages_used / plan.monthly_msg_limit) * 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500">
            {plan.messages_used} / {plan.monthly_msg_limit}
          </div>
        </div>
      )}

      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div className="text-xs text-gray-500 truncate flex-1">{user.email}</div>
        </div>
        <button
          onClick={handleSignOut}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
