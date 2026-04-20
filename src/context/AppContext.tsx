import { createContext, useContext } from 'react'
import type { Clinic } from '@/types'

export interface AppUser {
  id: string
  email: string
}

export interface AppContextValue {
  user: AppUser
  clinic: Clinic
  /** Call this after updating clinic data (e.g. after onboarding) */
  setClinic: (clinic: Clinic) => void
}

export const AppContext = createContext<AppContextValue | null>(null)

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used inside DashboardLayout')
  return ctx
}
