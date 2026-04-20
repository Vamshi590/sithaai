import React from 'react'

export default function TrustBar() {
  const logos = [
    { name: 'City Dental', id: 1 },
    { name: 'Prime Cardio', id: 2 },
    { name: 'Wellness Center', id: 3 },
    { name: 'Ortho Plus', id: 4 },
    { name: 'Global Skin Care', id: 5 },
  ]

  return (
    <section className="py-12 border-y border-slate-100 bg-slate-50/30">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
          Trusted by 50+ Modern Clinics Across the Globe
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo) => (
            <div key={logo.id} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-300" />
              <span className="text-xl font-bold font-serif text-slate-900">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
