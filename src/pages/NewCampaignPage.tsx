import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '@/lib/api'
import { Button } from '@/components/ui/button'
import type { ContactList, MessageTemplate } from '@/types'

type RecipientMode = 'list' | 'oneshot'

export default function NewCampaignPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // Step 1 — Recipients
  const [recipientMode, setRecipientMode] = useState<RecipientMode>('list')
  const [lists, setLists] = useState<ContactList[]>([])
  const [selectedListId, setSelectedListId] = useState('')
  const [phones, setPhones] = useState('')
  const [saveListName, setSaveListName] = useState('')
  const [saveList, setSaveList] = useState(false)
  const csvInputRef = useRef<HTMLInputElement>(null)

  // Step 2 — Template
  const [templates, setTemplates] = useState<MessageTemplate[]>([])
  const [selectedTemplateId, setSelectedTemplateId] = useState('')
  const [showNewTemplateForm, setShowNewTemplateForm] = useState(false)
  const [newTplName, setNewTplName] = useState('')
  const [newTplBody, setNewTplBody] = useState('')
  const [tplSubmitting, setTplSubmitting] = useState(false)
  const [tplError, setTplError] = useState('')

  // Step 3 — Variables
  const [variableValues, setVariableValues] = useState<Record<string, string>>({})

  // Step 4 — Launch
  const [campaignName, setCampaignName] = useState('')
  const [launching, setLaunching] = useState(false)
  const [launchError, setLaunchError] = useState('')

  useEffect(() => {
    apiFetch('/api/contacts/lists')
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Failed to load lists')))
      .then(d => setLists(d.lists ?? []))
      .catch(() => {}) // non-fatal — list mode will show "no lists"
    apiFetch('/api/templates')
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Failed to load templates')))
      .then(d => setTemplates(d.templates ?? []))
      .catch(() => {}) // non-fatal — empty grid will be shown
  }, [])

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId) ?? null

  function handleCSVFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPhones(ev.target?.result as string ?? '')
    reader.readAsText(file)
  }

  function step1Valid() {
    if (recipientMode === 'list') return !!selectedListId
    return phones.trim().length > 0
  }

  function step2Valid() {
    return !!selectedTemplateId && selectedTemplate?.status === 'approved'
  }

  function step3Valid() {
    if (!selectedTemplate) return false
    if (selectedTemplate.variables.length === 0) return true
    return selectedTemplate.variables.every(v => variableValues[v]?.trim())
  }

  async function handleSubmitNewTemplate() {
    if (!newTplName.trim() || !newTplBody.trim()) return
    setTplSubmitting(true)
    setTplError('')
    try {
      const res = await apiFetch('/api/templates', {
        method: 'POST',
        body: JSON.stringify({ name: newTplName, body: newTplBody }),
      })
      const data = await res.json()
      if (!res.ok) { setTplError(data.error ?? 'Failed to create template'); return }
      setTemplates(prev => [...prev, data.template])
      setShowNewTemplateForm(false)
      setNewTplName('')
      setNewTplBody('')
    } catch {
      setTplError('Network error. Please try again.')
    } finally {
      setTplSubmitting(false)
    }
  }

  async function handleLaunch() {
    if (!campaignName.trim()) { setLaunchError('Campaign name is required'); return }
    setLaunching(true)
    setLaunchError('')
    try {
      const body: Record<string, unknown> = {
        name: campaignName.trim(),
        template_id: selectedTemplateId,
        variable_values: variableValues,
      }
      if (recipientMode === 'list') {
        body.contact_list_id = selectedListId
      } else {
        body.phones = phones
        if (saveList && saveListName.trim()) body.save_list_name = saveListName.trim()
      }
      const res = await apiFetch('/api/campaigns', { method: 'POST', body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) {
        setLaunchError(data.error ?? 'Failed to launch campaign')
        return
      }
      navigate(`/dashboard/campaigns/${data.campaign.id}`)
    } catch {
      setLaunchError('Network error. Please try again.')
    } finally {
      setLaunching(false)
    }
  }

  const selectedList = lists.find(l => l.id === selectedListId) ?? null
  const recipientCount = recipientMode === 'list'
    ? selectedList?.contact_count ?? 0
    : phones.split('\n').filter(l => l.trim()).length

  function previewMessage() {
    if (!selectedTemplate) return ''
    let preview = selectedTemplate.body
    for (const [k, v] of Object.entries(variableValues)) {
      preview = preview.replaceAll(`{{${k}}}`, v || `{{${k}}}`)
    }
    return preview
  }

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/dashboard/campaigns')} className="text-sm text-gray-400 hover:text-gray-600">← Back</button>
        <h1 className="text-xl font-bold text-gray-900">New Campaign</h1>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className={`h-1 flex-1 rounded-full ${step >= s ? 'bg-indigo-500' : 'bg-gray-100'}`} />
        ))}
      </div>
      <p className="text-xs text-gray-400">
        Step {step} of 4 — {['Recipients', 'Template', 'Message Variables', 'Review & Send'][step - 1]}
      </p>

      {step === 1 && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['list', 'oneshot'] as RecipientMode[]).map(m => (
              <button
                key={m}
                onClick={() => setRecipientMode(m)}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  recipientMode === m ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-500'
                }`}
              >
                {m === 'list' ? 'Saved List' : 'One-shot'}
              </button>
            ))}
          </div>

          {recipientMode === 'list' ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Choose a list</label>
              {lists.length === 0 ? (
                <p className="text-sm text-gray-400">No lists yet. Switch to One-shot or create a list first.</p>
              ) : (
                <select
                  value={selectedListId}
                  onChange={e => setSelectedListId(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select a list...</option>
                  {lists.map(l => (
                    <option key={l.id} value={l.id}>{l.name} ({l.contact_count} contacts)</option>
                  ))}
                </select>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Phone numbers</label>
              <textarea
                value={phones}
                onChange={e => setPhones(e.target.value)}
                placeholder={"+919876543210\n+917890123456"}
                rows={6}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono resize-none"
              />
              <div className="text-xs text-gray-400">One number per line. E.164 format: +countrycode number</div>
              <div>
                <button
                  className="text-xs text-indigo-500 hover:underline"
                  onClick={() => csvInputRef.current?.click()}
                >
                  Or upload CSV
                </button>
                <input ref={csvInputRef} type="file" accept=".csv,.txt" className="hidden" onChange={handleCSVFile} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="saveList" checked={saveList} onChange={e => setSaveList(e.target.checked)} />
                <label htmlFor="saveList" className="text-sm text-gray-600">Save as list</label>
              </div>
              {saveList && (
                <input
                  type="text"
                  value={saveListName}
                  onChange={e => setSaveListName(e.target.value)}
                  placeholder="List name (e.g. Diabetic Patients)"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              )}
            </div>
          )}

          {recipientCount > 0 && (
            <p className="text-sm text-gray-500">{recipientCount} recipient(s) selected</p>
          )}

          <Button disabled={!step1Valid()} onClick={() => setStep(2)} className="w-full">
            Next: Choose Template
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid gap-3">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => t.status === 'approved' && setSelectedTemplateId(t.id)}
                disabled={t.status !== 'approved'}
                className={`text-left p-4 rounded-xl border transition-colors ${
                  selectedTemplateId === t.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : t.status === 'approved' ? 'border-gray-200 hover:border-gray-300' : 'border-gray-100 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">{t.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    t.status === 'approved' ? 'bg-green-100 text-green-600'
                    : t.status === 'rejected' ? 'bg-red-100 text-red-500'
                    : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {t.status === 'pending_approval' ? 'Pending' : t.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 font-mono">{t.body.slice(0, 80)}{t.body.length > 80 ? '...' : ''}</p>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowNewTemplateForm(v => !v)}
            className="text-sm text-indigo-500 hover:underline"
          >
            + Request new template
          </button>

          {showNewTemplateForm && (
            <div className="border border-gray-200 rounded-xl p-4 space-y-3">
              <p className="text-xs text-gray-400">Template will be submitted to Meta for approval. Use {'{{'+'variableName'+'}}'} for dynamic values.</p>
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
              <Button disabled={tplSubmitting || !newTplName.trim() || !newTplBody.trim()} onClick={handleSubmitNewTemplate}>
                {tplSubmitting ? 'Submitting...' : 'Submit for Approval'}
              </Button>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Back</button>
            <Button disabled={!step2Valid()} onClick={() => setStep(3)} className="flex-1">
              Next: Variables
            </Button>
          </div>
        </div>
      )}

      {step === 3 && selectedTemplate && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Fill in the values for each variable. Same values for all recipients.</p>
          {selectedTemplate.variables.length === 0 ? (
            <p className="text-sm text-gray-400">This template has no variables.</p>
          ) : (
            <div className="space-y-3">
              {selectedTemplate.variables.map(v => (
                <div key={v}>
                  <label className="text-sm font-medium text-gray-700 capitalize">{v}</label>
                  <input
                    type="text"
                    value={variableValues[v] ?? ''}
                    onChange={e => setVariableValues(prev => ({ ...prev, [v]: e.target.value }))}
                    placeholder={`Value for {{${v}}}`}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                  />
                </div>
              ))}
            </div>
          )}
          {selectedTemplate.variables.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 font-mono">
              <p className="text-xs text-gray-400 mb-1">Preview:</p>
              {previewMessage()}
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Back</button>
            <Button disabled={!step3Valid()} onClick={() => setStep(4)} className="flex-1">
              Next: Review
            </Button>
          </div>
        </div>
      )}

      {step === 4 && selectedTemplate && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Campaign name</label>
            <input
              type="text"
              value={campaignName}
              onChange={e => setCampaignName(e.target.value)}
              placeholder="e.g. April Health Tips"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Recipients</span>
              <span className="font-medium text-gray-700">{recipientCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Template</span>
              <span className="font-medium text-gray-700">{selectedTemplate.name}</span>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-400 mb-1">Message preview:</p>
              <p className="font-mono text-xs text-gray-600">{previewMessage()}</p>
            </div>
          </div>

          {launchError && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-sm text-red-600">
              {launchError}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Back</button>
            <Button
              disabled={launching || !campaignName.trim()}
              onClick={handleLaunch}
              className="flex-1"
            >
              {launching ? 'Launching...' : `Send to ${recipientCount} recipients`}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
