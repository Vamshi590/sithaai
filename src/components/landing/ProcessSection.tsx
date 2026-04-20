import React from 'react'
import { ArrowRight } from 'lucide-react'
import { UsersIcon, WandIcon, SendIcon } from './PremiumIcons'

const steps = [
  {
    title: 'Clinic Analysis',
    description: 'We analyze your clinics departments, doctors, and tone to create a personalized profile.',
    icon: UsersIcon,
  },
  {
    title: 'AI Generation',
    description: 'Our proprietary models generate high-end social media content tailored to your specialty.',
    icon: WandIcon,
  },
  {
    title: 'Smart Approval',
    description: 'Review and post via our automated WhatsApp flow. One tap and you are live.',
    icon: SendIcon,
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-32 bg-white relative">
      <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl -z-10" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="inline-block px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-[13px] font-bold text-brand-cyan uppercase tracking-widest mb-6">The Workflow</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-slate-950 tracking-tighter leading-[1.1]">
              From Zero to Viral in Minutes
            </h3>
          </div>
          <p className="text-xl text-slate-500 font-medium max-w-sm pb-2">
            Automating your clinic's digital presence has never been this seamless.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-12 rounded-[30px] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="text-[120px] font-black text-slate-100 absolute top-4 right-8 leading-none group-hover:text-brand-cyan/10 transition-colors">
                0{idx + 1}
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-brand-cyan" />
                </div>
                
                <h4 className="text-3xl font-bold text-slate-950 mb-6 tracking-tight">{step.title}</h4>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  {step.description}
                </p>
                
                {idx < 2 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-slate-300 group-hover:text-brand-cyan/50 transition-colors">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
