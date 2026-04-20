import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL ?? ''

/**
 * Fetch with the current Supabase session token as Authorization: Bearer.
 * Use this for all calls to the clinicgrow-renderer API endpoints.
 */
export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const { data: { session } } = await supabase.auth.getSession()

  const headers: Record<string, string> = {
    Authorization: `Bearer ${session?.access_token ?? ''}`,
    // Don't set Content-Type for FormData — browser must set it with the boundary
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers as Record<string, string> ?? {}),
  }

  return fetch(`${API_URL}${path}`, { ...options, headers })
}

/**
 * Get the URL to initiate the Instagram OAuth flow.
 * The backend needs the token in the query string (can't send headers on a redirect).
 */
export async function getInstagramConnectUrl(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession()
  return `${API_URL}/api/instagram/connect?token=${session?.access_token ?? ''}`
}
