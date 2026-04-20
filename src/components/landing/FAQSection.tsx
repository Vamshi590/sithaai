import React from 'react'
import { Link } from 'react-router-dom'
import { HelpIcon, SparkleIcon } from './PremiumIcons'

const topFaqs = [
  {
    q: "How does the WhatsApp approval work?",
    a: "Sitha sends you a preview of every post via WhatsApp. You simply reply with a 1 or 'Approve' and it goes live instantly."
  },
  {
    q: "Is the content medical-safe?",
    a: "Yes. Our AI is trained on clinical guidelines to ensure 100% medical accuracy and professional tone."
  },
  {
    q: "Can I use my own clinic photos?",
    a: "Absolutely. You can upload your own photos or use our AI-generated medical visuals."
  }
]

export default function FAQSection() {
  return (
    <section id="faq" className="py-40 bg-slate-50 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          
          <div className="lg:w-1/2">
            <h2 className="inline-block px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-[13px] font-bold text-brand-cyan uppercase tracking-widest mb-6">Quick Help</h2>
            <h3 className="text-5xl md:text-7xl font-bold text-slate-950 mb-8 tracking-tighter leading-[1.05]">
               Curious about <br />
               <span className="text-brand-cyan">Automation?</span>
            </h3>
            <p className="text-xl text-slate-500 font-medium mb-10 max-w-lg leading-relaxed">
               We've answered the most common questions to help you get started with zero friction.
            </p>
            <Link 
              to="/faq" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-950 text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-slate-900/10"
            >
               View All FAQs <HelpIcon className="w-5 h-5" />
            </Link>
          </div>

          <div className="lg:w-1/2 space-y-4">
             {topFaqs.map((faq, idx) => (
                <div key={idx} className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-500 group">
                   <h4 className="text-xl font-bold text-slate-950 mb-4 flex items-center gap-3">
                      <SparkleIcon className="w-5 h-5 text-brand-cyan group-hover:rotate-12 transition-transform" />
                      {faq.q}
                   </h4>
                   <p className="text-slate-500 font-medium leading-relaxed">
                      {faq.a}
                   </p>
                </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  )
}
