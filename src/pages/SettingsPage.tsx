import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '@/context/AppContext'
import { getInstagramConnectUrl, apiFetch } from '@/lib/api'
import { Button } from '@/components/ui/button'
import type { MessageTemplate } from '@/types'

const BOT_NUMBER = import.meta.env.VITE_WHATSAPP_BOT_NUMBER ?? ''

export default function SettingsPage() {
  const { clinic, setClinic } = useAppContext()
  const [searchParams] = useSearchParams()
  const [igConnectUrl, setIgConnectUrl] = useState('')

  // WhatsApp state
  const [waNumber, setWaNumber] = useState(clinic.whatsapp_number ?? '')
  const [waSaving, setWaSaving] = useState(false)
  const [waError, setWaError] = useState('')
  const [waSaved, setWaSaved] = useState(false)

  type SettingsTab = 'integrations' | 'templates'
  const [activeTab, setActiveTab] = useState<SettingsTab>('integrations')
  const [templates, setTemplates] = useState<MessageTemplate[]>([])
  const [tplLoading, setTplLoading] = useState(false)
  const [showTplForm, setShowTplForm] = useState(false)
  const [newTplName, setNewTplName] = useState('')
  const [newTplBody, setNewTplBody] = useState('')
  const [tplSubmitting, setTplSubmitting] = useState(false)
  const [tplError, setTplError] = useState('')

  function loadTemplates() {
    setTplLoading(true)
    apiFetch('/api/templates')
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(d => setTemplates((d.templates ?? []).filter((t: MessageTemplate) => t.clinic_id !== null)))
      .catch(() => setTplError('Failed to load templates.'))
      .finally(() => setTplLoading(false))
  }

  async function handleCreateTemplate() {
    if (!newTplName.trim() || !newTplBody.trim()) return
    setTplSubmitting(true)
    setTplError('')
    try {
      const res = await apiFetch('/api/templates', {
        method: 'POST',
        body: JSON.stringify({ name: newTplName.trim(), body: newTplBody.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setTplError(data.error ?? 'Failed'); return }
      setTemplates(prev => [...prev, data.template])
      setShowTplForm(false)
      setNewTplName('')
      setNewTplBody('')
    } catch {
      setTplError('Network error. Please try again.')
    } finally {
      setTplSubmitting(false)
    }
  }

  const igConnectedParam = searchParams.get('ig_connected')
  const igErrorParam = searchParams.get('ig_error')

  useEffect(() => {
    getInstagramConnectUrl().then(setIgConnectUrl)
  }, [])

  const igConnected = !!clinic.ig_user_id
  const waConnected = !!clinic.whatsapp_number

  async function handleSaveWhatsApp() {
    setWaSaving(true)
    setWaError('')
    setWaSaved(false)
    try {
      const res = await apiFetch('/api/clinic/whatsapp', {
        method: 'PUT',
        body: JSON.stringify({ whatsapp_number: waNumber }),
      })
      const data = await res.json()
      if (!res.ok) { setWaError(data.error ?? 'Failed to save'); return }
      setClinic({ ...clinic, whatsapp_number: waNumber.replace(/\D/g, '') })
      setWaSaved(true)
    } catch {
      setWaError('Network error. Please try again.')
    } finally {
      setWaSaving(false)
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Settings</h1>

      {/* Tab switcher */}
      <div className="flex gap-2 border-b border-gray-100">
        {(['integrations', 'templates'] as SettingsTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); if (tab === 'templates' && templates.length === 0) loadTemplates() }}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors capitalize ${
              activeTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Your custom message templates</p>
            <Button onClick={() => setShowTplForm(v => !v)}>Add Template</Button>
          </div>

          {showTplForm && (
            <div className="border border-gray-200 rounded-xl p-4 space-y-3">
              <p className="text-xs text-gray-400">{'Use {{variableName}} for dynamic values (e.g. {{name}}, {{date}}).'}</p>
              <input
                type="text"
                placeholder="Template name"
                value={newTplName}
                onChange={e => setNewTplName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
              <textarea
                placeholder={'Hi {{name}}, your appointment is on {{date}}.'}
                value={newTplBody}
                onChange={e => setNewTplBody(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono resize-none"
              />
              {tplError && <p className="text-xs text-red-500">{tplError}</p>}
              <div className="flex gap-2">
                <button onClick={() => setShowTplForm(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <Button disabled={tplSubmitting || !newTplName.trim() || !newTplBody.trim()} onClick={handleCreateTemplate}>
                  {tplSubmitting ? 'Submitting...' : 'Submit for Approval'}
                </Button>
              </div>
            </div>
          )}

          {tplLoading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : templates.length === 0 ? (
            <p className="text-sm text-gray-400">No custom templates yet.</p>
          ) : (
            <div className="space-y-2">
              {templates.map(t => (
                <div key={t.id} className="flex items-start justify-between p-4 bg-white border border-gray-100 rounded-xl">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{t.name}</div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">{t.body.slice(0, 80)}{t.body.length > 80 ? '...' : ''}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-3 ${
                    t.status === 'approved' ? 'bg-green-100 text-green-600'
                    : t.status === 'rejected' ? 'bg-red-100 text-red-500'
                    : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {t.status === 'pending_approval' ? 'Pending' : t.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'integrations' && (
        <>
        {/* Clinic info */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700">Clinic</h2>
        <div className="space-y-1 text-sm text-gray-600">
          <div><span className="text-gray-400">Name: </span>{clinic.name}</div>
          <div><span className="text-gray-400">Location: </span>{clinic.location ?? '—'}</div>
          <div><span className="text-gray-400">Tone: </span>{clinic.tone}</div>
          <div>
            <span className="text-gray-400">Departments: </span>
            {clinic.departments?.join(', ') || '—'}
          </div>
        </div>
      </div>

      {/* Instagram */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700">Instagram</h2>

        {igConnectedParam && (
          <div className="text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
            ✓ Instagram connected successfully
          </div>
        )}
        {igErrorParam && (
          <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            Error: {(() => { try { return decodeURIComponent(igErrorParam) } catch { return igErrorParam } })()}
          </div>
        )}

        {igConnected ? (
          <div className="flex items-center justify-between">
            <div className="text-sm text-emerald-600 font-medium">✓ Connected</div>
            <a href={igConnectUrl}>
              <Button variant="outline" size="sm">Reconnect</Button>
            </a>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Connect your Instagram Business account to post directly from ClinicGrow.
            </p>
            <a href={igConnectUrl}>
              <Button size="sm" disabled={!igConnectUrl}>Connect Instagram</Button>
            </a>
          </div>
        )}
      </div>

      {/* WhatsApp */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">WhatsApp Integration</h2>
          {waConnected && (
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              ✓ Active
            </span>
          )}
        </div>

        {/* How it works */}
        <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
          <p className="text-xs font-semibold text-indigo-700">How it works</p>
          <ol className="text-xs text-indigo-600 space-y-1 list-decimal list-inside leading-relaxed">
            <li>Register the WhatsApp number you'll use to send photos below</li>
            <li>Send a patient photo to our bot from that number</li>
            <li>Answer a few quick questions — language, any context</li>
            <li>Receive a preview link — approve to publish to Instagram</li>
          </ol>
        </div>

        {/* Bot number */}
        {BOT_NUMBER && (
          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Send your photos to this number</p>
              <p className="text-sm font-semibold text-gray-800">+{BOT_NUMBER}</p>
            </div>
            <a href={`https://wa.me/${BOT_NUMBER}`} target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm">Open WhatsApp</Button>
            </a>
          </div>
        )}

        {/* Register sending number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Your WhatsApp number
            <span className="text-gray-400 font-normal ml-1">(the number you'll send photos from)</span>
          </label>
          <div className="flex gap-2">
            <input
              type="tel"
              value={waNumber}
              onChange={e => { setWaNumber(e.target.value); setWaSaved(false) }}
              placeholder="919876543210"
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
            />
            <Button
              onClick={handleSaveWhatsApp}
              disabled={waSaving || !waNumber.trim()}
              size="sm"
            >
              {waSaving ? 'Saving…' : 'Save'}
            </Button>
          </div>
          <p className="text-xs text-gray-400">
            Country code + number, no spaces or +. Example: 919876543210
          </p>
          {waError && <p className="text-xs text-red-500">{waError}</p>}
          {waSaved && <p className="text-xs text-emerald-600">✓ Saved — you're ready to send photos!</p>}
        </div>
      </div>
        </>
      )}
    </div>
  )
}
