import { SparkleIcon } from './PremiumIcons'

const testimonials = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Owner, Mitchell Dental Care',
    quote: 'Sitha has completely changed how I run my marketing. I used to spend hours thinking about what to post. Now, it takes me less than a minute a day.',
    avatar: 'SM',
  },
  {
    name: 'James Reynolds',
    role: 'Clinic Manager, Vitality Physio',
    quote: 'The WhatsApp approval flow is a game-changer. I get the preview, I reply with a 1, and it is posted. Our engagement has tripled.',
    avatar: 'JR',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-40 bg-white relative z-10 border-t border-slate-100 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-cyan/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-8">
        {/* LOGO WALL - Representative medical partners */}
        <div className="mb-32">
           <p className="text-center text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-12">Trusted by 50+ Modern Clinics</p>
           <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              <span className="text-2xl font-black tracking-tighter text-slate-900">MEDI<span className="text-brand-cyan">GLOW</span></span>
              <span className="text-2xl font-black tracking-tighter text-slate-900">DENTA<span className="text-brand-cyan">SYNC</span></span>
              <span className="text-2xl font-black tracking-tighter text-slate-900">VITAlity</span>
              <span className="text-2xl font-black tracking-tighter text-slate-900">CLINIC<span className="text-brand-cyan">HQ</span></span>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20 items-end justify-between mb-24">
          <div className="max-w-2xl">
            <h2 className="inline-block px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-[13px] font-bold text-brand-cyan uppercase tracking-widest mb-6">Social Proof</h2>
            <h3 className="text-5xl md:text-7xl font-bold text-slate-950 mb-8 tracking-tighter leading-[1.05]">
              Real Results. <br /> Real Growth.
            </h3>
          </div>
          <p className="text-xl text-slate-500 font-medium max-w-sm pb-2">
            Join the elite clinics that have automated their digital world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {testimonials.map((t, idx) => (
            <div key={idx} className={`p-12 rounded-[40px] bg-slate-50 border border-slate-100 relative group transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,212,255,0.15)] hover:-translate-y-2 ${idx % 2 === 1 ? 'md:mt-12' : ''}`}>
              <div className="absolute top-8 right-12 opacity-5 scale-150 group-hover:opacity-10 transition-opacity">
                 <SparkleIcon className="w-24 h-24 text-brand-cyan" />
              </div>
              
              <div className="flex gap-1 mb-10">
                 {[...Array(5)].map((_, i) => (
                   <span key={i} className="text-brand-cyan text-lg">★</span>
                 ))}
              </div>

              <p className="text-2xl text-slate-850 font-medium leading-[1.4] mb-12 tracking-tight relative z-10">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-5 relative z-10 pt-10 border-t border-slate-200/50">
                <div className="w-14 h-14 bg-white border border-slate-100 shadow-sm rounded-[18px] flex items-center justify-center font-black text-brand-cyan text-lg">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-950 text-base tracking-tight">{t.name}</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
