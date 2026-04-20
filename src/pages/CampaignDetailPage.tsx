import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiFetch } from '@/lib/api'
import type { CampaignDetail, CampaignMessage } from '@/types'

const STATUS_COLORS: Record<string, string> = {
  queued:    'text-gray-400',
  sent:      'text-blue-500',
  delivered: 'text-green-600',
  failed:    'text-red-500',
}

type FilterStatus = 'all' | 'delivered' | 'sent' | 'failed' | 'queued'

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [campaign, setCampaign] = useState<CampaignDetail | null>(null)
  const [messages, setMessages] = useState<CampaignMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<FilterStatus>('all')

  useEffect(() => {
    if (!id) return
    apiFetch(`/api/campaigns/${id}`)
      .then(r => r.json())
      .then(data => {
        setCampaign(data.campaign)
        setMessages(data.messages ?? [])
      })
      .catch(() => setError('Failed to load campaign'))
      .finally(() => setLoading(false))
  }, [id])

  const filtered = filter === 'all' ? messages : messages.filter(m => m.status === filter)

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>
  if (error) return <p className="text-sm text-red-500">{error}</p>
  if (!campaign) return null

  const delivered = messages.filter(m => m.status === 'delivered').length

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link to="/dashboard/campaigns" className="text-sm text-gray-400 hover:text-gray-600">← Campaigns</Link>
        <h1 className="text-xl font-bold text-gray-900">{campaign.name}</h1>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total',     value: campaign.total_count,  color: 'text-gray-700' },
          { label: 'Sent',      value: campaign.sent_count,   color: 'text-blue-500' },
          { label: 'Delivered', value: delivered,              color: 'text-green-600' },
          { label: 'Failed',    value: campaign.failed_count, color: 'text-red-500' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 text-sm text-gray-500 space-y-1">
        <div><span className="text-gray-400">Template: </span>{campaign.message_templates?.name}</div>
        <div><span className="text-gray-400">List: </span>{campaign.contact_lists?.name ?? 'One-shot'}</div>
        <div><span className="text-gray-400">Completed: </span>{campaign.completed_at ? new Date(campaign.completed_at).toLocaleString() : '—'}</div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex gap-2 px-4 py-3 border-b border-gray-100">
          {(['all', 'delivered', 'sent', 'failed', 'queued'] as FilterStatus[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === f ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {f === 'all' ? `All (${messages.length})` : `${f} (${messages.filter(m => m.status === f).length})`}
            </button>
          ))}
        </div>
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100">
            <tr className="text-left text-xs text-gray-400">
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Sent At</th>
              <th className="px-4 py-3 font-medium">Delivered At</th>
              <th className="px-4 py-3 font-medium">Error</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(m => (
              <tr key={m.id}>
                <td className="px-4 py-3 font-mono text-xs text-gray-700">{m.phone_number}</td>
                <td className="px-4 py-3 text-gray-500">{m.contacts?.name ?? '—'}</td>
                <td className={`px-4 py-3 font-medium ${STATUS_COLORS[m.status] ?? ''}`}>{m.status}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{m.sent_at ? new Date(m.sent_at).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{m.delivered_at ? new Date(m.delivered_at).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}</td>
                <td className="px-4 py-3 text-red-400 text-xs max-w-xs truncate">{m.error_message ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">No messages match this filter.</p>
        )}
      </div>
    </div>
  )
}
