import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImageUpload } from '@/components/ImageUpload'
import type { Tone } from '@/types'

const TONE_OPTIONS: readonly Tone[] = ['professional', 'friendly', 'warm']
const DEPARTMENT_OPTIONS = ['Eye', 'Dental', 'Skin', 'General', 'Orthopedic', 'Pediatric'] as const

interface DoctorEntry {
  _key: string
  name: string
  qualification: string
  department: string
  imageUrl: string | null
}

const TOTAL_STEPS = 3

// ── Step indicator ────────────────────────────────────────────────────────
function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
            i + 1 < step ? 'bg-gray-900 text-white'
              : i + 1 === step ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-400'
          }`}>
            {i + 1 < step ? '✓' : i + 1}
          </div>
          {i < TOTAL_STEPS - 1 && (
            <div className={`h-px w-8 ${i + 1 < step ? 'bg-gray-900' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
      <span className="ml-2 text-xs text-gray-400">Step {step} of {TOTAL_STEPS}</span>
    </div>
  )
}

// ── Main form ─────────────────────────────────────────────────────────────
export function OnboardingForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Step 1 — basics
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [tone, setTone] = useState<Tone>('professional')
  const [departments, setDepartments] = useState<string[]>([])

  // Step 2 — logo
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  // Step 3 — doctors
  const [doctors, setDoctors] = useState<DoctorEntry[]>([])
  const [showDoctorForm, setShowDoctorForm] = useState(false)
  const [doctorName, setDoctorName] = useState('')
  const [doctorQual, setDoctorQual] = useState('')
  const [doctorDept, setDoctorDept] = useState('')
  const [doctorImageUrl, setDoctorImageUrl] = useState<string | null>(null)

  function toggleDepartment(dept: string) {
    setDepartments(prev =>
      prev.includes(dept) ? prev.filter(d => d !== dept)
        : prev.length < 3 ? [...prev, dept] : prev
    )
  }

  function addDoctor() {
    if (!doctorName.trim()) return
    setDoctors(prev => [...prev, {
      _key: crypto.randomUUID(),
      name: doctorName.trim(),
      qualification: doctorQual.trim(),
      department: doctorDept.trim(),
      imageUrl: doctorImageUrl,
    }])
    setDoctorName(''); setDoctorQual(''); setDoctorDept(''); setDoctorImageUrl(null)
    setShowDoctorForm(false)
  }

  function removeDoctor(key: string) {
    setDoctors(prev => prev.filter(d => d._key !== key))
  }

  // ── Validate step 1 ────────────────────────────────────────────────────
  function nextFromStep1() {
    if (!name.trim()) { setError('Clinic name is required'); return }
    setError(''); setStep(2)
  }

  // ── Final submit ───────────────────────────────────────────────────────
  async function handleSubmit() {
    setLoading(true); setError('')
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) { setError('Not authenticated'); return }

      // 1. Upsert clinic
      const { data: clinic, error: clinicErr } = await supabase
        .from('clinics')
        .upsert(
          { user_id: session.user.id, name, location, tone, departments, logo_url: logoUrl },
          { onConflict: 'user_id' }
        )
        .select('id')
        .single()

      if (clinicErr || !clinic) { setError(clinicErr?.message ?? 'Failed to save clinic'); return }

      // 2. Insert doctors (if any)
      if (doctors.length > 0) {
        const { error: docErr } = await supabase.from('doctors').insert(
          doctors.map(d => ({
            clinic_id: clinic.id,
            name: d.name,
            qualification: d.qualification || null,
            department: d.department || null,
            image_url: d.imageUrl || null,
          }))
        )
        if (docErr) console.error('Doctor insert error:', docErr.message)
      }

      navigate('/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      <StepBar step={step} />

      {/* ── Step 1: Basics ───────────────────────────────────────────── */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Clinic Name *</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)}
              placeholder="Bright Smile Dental" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={e => setLocation(e.target.value)}
              placeholder="Austin, TX" />
          </div>

          <div className="space-y-2">
            <Label>Tone</Label>
            <div className="flex gap-2">
              {TONE_OPTIONS.map(t => (
                <button key={t} type="button" onClick={() => setTone(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    tone === t ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Departments <span className="text-gray-400 font-normal">(max 3)</span></Label>
            <div className="flex flex-wrap gap-2">
              {DEPARTMENT_OPTIONS.map(dept => (
                <button key={dept} type="button" onClick={() => toggleDepartment(dept)}
                  disabled={departments.length >= 3 && !departments.includes(dept)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                    departments.includes(dept)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}>
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button onClick={nextFromStep1} className="w-full">Continue →</Button>
        </div>
      )}

      {/* ── Step 2: Logo ─────────────────────────────────────────────── */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-6">
              Your logo appears on every generated post. You can skip this and add it later.
            </p>
            <div className="flex flex-col items-center gap-4 py-6 bg-gray-50 rounded-xl border border-gray-100">
              <ImageUpload folder="logos" value={logoUrl} onChange={setLogoUrl}
                shape="square" placeholder="Upload logo" />
              {logoUrl && (
                <p className="text-xs text-emerald-600 font-medium">✓ Logo uploaded</p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>← Back</Button>
            <Button className="flex-1" onClick={() => { setError(''); setStep(3) }}>
              {logoUrl ? 'Continue →' : 'Skip for now →'}
            </Button>
          </div>
        </div>
      )}

      {/* ── Step 3: Doctors ──────────────────────────────────────────── */}
      {step === 3 && (
        <div className="space-y-5">
          <p className="text-sm text-gray-500">
            Add your doctors so AI can generate personalised "Meet Our Doctor" posts with their photo.
          </p>

          {/* Existing doctors */}
          {doctors.length > 0 && (
            <div className="space-y-2">
              {doctors.map(d => (
                <div key={d._key}
                  className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3">
                  {d.imageUrl ? (
                    <img src={d.imageUrl} alt={d.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 font-bold text-sm flex-shrink-0">
                      {d.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">{d.name}</div>
                    {(d.qualification || d.department) && (
                      <div className="text-xs text-gray-400 truncate">
                        {[d.qualification, d.department].filter(Boolean).join(' · ')}
                      </div>
                    )}
                  </div>
                  <button onClick={() => removeDoctor(d._key)}
                    className="text-gray-300 hover:text-red-400 text-sm transition-colors">✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Add doctor form */}
          {showDoctorForm ? (
            <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-3">
              <div className="flex justify-center">
                <ImageUpload folder="doctors" value={doctorImageUrl} onChange={setDoctorImageUrl}
                  shape="circle" placeholder="Photo" />
              </div>
              <Input placeholder="Doctor name *" value={doctorName}
                onChange={e => setDoctorName(e.target.value)} />
              <Input placeholder="Qualification (e.g. MBBS, MD)" value={doctorQual}
                onChange={e => setDoctorQual(e.target.value)} />
              <Input placeholder="Department (e.g. Dental)" value={doctorDept}
                onChange={e => setDoctorDept(e.target.value)} />
              <div className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1"
                  onClick={() => { setShowDoctorForm(false); setDoctorName(''); setDoctorQual(''); setDoctorDept(''); setDoctorImageUrl(null) }}>
                  Cancel
                </Button>
                <Button size="sm" className="flex-1" onClick={addDoctor}
                  disabled={!doctorName.trim()}>
                  Add Doctor
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDoctorForm(true)}
              className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
            >
              + Add a doctor
            </button>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3 pt-1">
            <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>← Back</Button>
            <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Setting up...' : 'Complete Setup ✓'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
