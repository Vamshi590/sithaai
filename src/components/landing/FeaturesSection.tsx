import { 
  SparkleIcon, 
  InstagramIcon, 
  SendIcon, 
  ShieldIcon, 
  WorkflowIcon, 
  UsersIcon,
} from './PremiumIcons'

export default function FeaturesSection() {
  return (
    <section id="features" className="py-40 bg-white relative z-10 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-brand-cyan/5 rounded-[100%] blur-[120px] -z-10" />

      <div className="container mx-auto px-8">
        <div className="max-w-4xl mb-32">
          <h2 className="inline-block px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-[12px] font-black text-slate-950 uppercase tracking-widest mb-8">Capabilities</h2>
          <h3 className="text-5xl md:text-7xl font-bold text-slate-950 mb-8 tracking-tight leading-[1.05]">
            Superpowers for <br />
            <span className="text-brand-cyan">Modern Practices.</span>
          </h3>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed">
            Stop firefighting your social media. Sitha is the dedicated AI marketing 
            department your clinic always needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* HUGE BENTO: AI Content Machine */}
          <div className="md:col-span-8 bg-slate-50 border border-slate-100 rounded-[40px] p-12 flex flex-col justify-between group relative overflow-hidden transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-2">
            <div className="relative z-10 max-w-md">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform duration-500">
                 <SparkleIcon className="w-8 h-8 text-brand-cyan" />
               </div>
               <h4 className="text-4xl md:text-5xl font-bold text-slate-950 mb-6 tracking-tight">Vision AI & Generation</h4>
               <p className="text-xl text-slate-500 font-medium mb-8">
                 Click auto-generate, or upload up to 5 patient photos. Sitha's built-in Vision AI and rendering engine instantly writes, designs, and formats your clinical stories into high-end carousels.
               </p>
               <div className="flex gap-3 flex-wrap">
                 <span className="px-4 py-2 bg-white rounded-full text-xs font-bold text-slate-600 border border-slate-100 shadow-sm">Auto-Generate</span>
                 <span className="px-4 py-2 bg-white rounded-full text-xs font-bold text-slate-600 border border-slate-100 shadow-sm">Vision AI Engine</span>
                 <span className="px-4 py-2 bg-white rounded-full text-xs font-bold text-slate-600 border border-slate-100 shadow-sm">Dynamic Carousels</span>
               </div>
            </div>
            
            {/* Visual element: Animated Glass Post */}
            <div className="absolute top-10 -right-20 w-80 h-96 bg-white/60 backdrop-blur-xl border border-white p-8 rounded-[32px] shadow-2xl rotate-[15deg] group-hover:rotate-[8deg] transition-all duration-700">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-brand-cyan rounded-full shrink-0" />
                 <div className="space-y-2 w-full">
                    <div className="h-2 w-1/2 bg-slate-200 rounded-full" />
                    <div className="h-2 w-1/3 bg-slate-100 rounded-full" />
                 </div>
               </div>
               <div className="w-full aspect-[4/5] bg-slate-100 rounded-2xl mb-4 shrink-0 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-blue-200/20" />
               </div>
            </div>
          </div>

          {/* SQUARE BENTO: Instagram Sync */}
          <div className="md:col-span-4 bg-slate-950 text-white rounded-[40px] p-12 flex flex-col justify-between group relative overflow-hidden transition-all duration-700 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/20 rounded-full blur-[80px] -z-0" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-brand-cyan group-hover:text-slate-950 transition-colors">
                <InstagramIcon className="w-7 h-7" />
              </div>
              <h4 className="text-3xl font-bold mb-4 tracking-tight">Official Meta Sync</h4>
              <p className="text-slate-400 font-medium leading-relaxed">Direct integration with the Instagram Professional Graph API for guaranteed, instant publishing with zero third-party scheduling tools.</p>
            </div>
            <div className="relative z-10 mt-12 bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="flex justify-between items-center text-xs font-bold opacity-60 uppercase mb-4">
                  <span>Queue</span>
                  <span>4 Pending</span>
                </div>
                <div className="space-y-2">
                  <div className="h-1 w-full bg-brand-cyan rounded-full" />
                  <div className="h-1 w-2/3 bg-white/20 rounded-full" />
                </div>
            </div>
          </div>

          {/* NEXT-LEVEL BENTO: WhatsApp Flow */}
          <div className="md:col-span-12 lg:col-span-5 bg-slate-950 text-white rounded-[40px] p-12 flex flex-col justify-between group relative overflow-hidden transition-all duration-700 hover:-translate-y-2">
            {/* Ambient Singularity Glow */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-cyan/20 rounded-full blur-[100px] pointer-events-none" />
            {/* Visual element: Premium Chat Layout */}
            <div className="absolute top-10 -right-20 w-64 md:w-[320px] h-full bg-black/20 backdrop-blur-xl border border-white/10 rounded-[48px] p-8 shadow-2xl translate-x-12 group-hover:translate-x-0 transition-transform duration-1000">
               <div className="flex flex-col gap-6">
                  {/* Sitha AI Message */}
                  <div className="bg-[#DCF8C6] text-slate-900 self-start p-5 rounded-3xl rounded-tl-none shadow-xl max-w-[90%] relative group/msg">
                     <p className="text-[13px] font-bold leading-tight">Post is ready! 🎉</p>
                     <div className="w-full aspect-video bg-slate-200/50 rounded-xl mt-3 mb-3 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-transparent animate-pulse" />
                     </div>
                     <p className="text-[10px] opacity-60 font-medium">Approve to go live.</p>
                     <div className="absolute -left-2 top-0 w-4 h-4 bg-[#DCF8C6] rotate-45 -z-10" />
                  </div>
                  {/* User Approval */}
                  <div className="bg-emerald-500 text-white self-end p-4 px-8 rounded-3xl rounded-tr-none shadow-xl shadow-emerald-900/20 animate-bounce [animation-duration:3s]">
                     <span className="text-[12px] font-black uppercase tracking-[0.2em]">Approve</span>
                  </div>
               </div>
            </div>

            <div className="relative z-10 max-w-xs">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-10 shadow-inner group-hover:bg-brand-cyan group-hover:text-slate-950 transition-all duration-500">
                <SendIcon className="w-8 h-8" />
              </div>
              <h4 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter leading-[1.1] pb-1">The Singularity <br /> Workflow</h4>
              <p className="text-white/80 font-medium text-lg leading-relaxed">
                Take a photo, send it to our WhatsApp bot, provide quick context, and instantly receive a masterpiece. Tapping 'Approve' bridges the chat right to your Instagram feed securely.
              </p>
            </div>
          </div>

          {/* MEDIUM BENTO: Analytics / Growth Map */}
          <div className="md:col-span-7 bg-slate-50 border border-slate-100 rounded-[40px] p-12 flex flex-col lg:flex-row justify-between items-center gap-12 group transition-all duration-700 hover:-translate-y-2 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)]">
            <div className="max-w-xs">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                <WorkflowIcon className="w-7 h-7 text-brand-cyan" />
              </div>
              <h4 className="text-4xl font-bold text-slate-950 mb-4 tracking-tighter">Bulk WhatsApp Campaigns</h4>
              <p className="text-slate-500 font-medium">Go beyond social media. Utilize Meta-approved message templates to launch mass patient outreach campaigns with live delivery tracking.</p>
            </div>
            
            <div className="w-full bg-slate-950 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group/chart min-h-[220px] flex flex-col justify-between">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/20 blur-[60px] rounded-full" />
               
               <div className="flex justify-between items-start relative z-10 mb-4">
                  <div>
                    <span className="text-brand-cyan text-[10px] font-black uppercase tracking-widest block mb-1">Live Campaign Status</span>
                    <h5 className="text-3xl font-black text-white">482 Sent</h5>
                  </div>
                  <div className="px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full text-brand-cyan text-[10px] font-black uppercase tracking-widest">
                    High Engagement
                  </div>
               </div>

               {/* Amazing High-End Chart */}
               <div className="relative h-20 w-full mb-2">
                  <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Strictly Upward Path */}
                    <path 
                      d="M0,90 Q50,85 100,70 T200,50 T300,20 T400,5" 
                      fill="none" 
                      stroke="#00D4FF" 
                      strokeWidth="4" 
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]"
                    />
                    <path 
                      d="M0,90 Q50,85 100,70 T200,50 T300,20 T400,5 L400,100 L0,100 Z" 
                      fill="url(#profitGrad)"
                    />
                    {/* Glowing nodes */}
                    <circle cx="200" cy="50" r="4" fill="#00D4FF" className="animate-pulse" />
                    <circle cx="400" cy="5" r="5" fill="#00D4FF" stroke="white" strokeWidth="2" />
                  </svg>
               </div>
               
               <div className="h-[1px] w-full bg-white/5 relative z-10" />
               <div className="flex justify-between text-[9px] font-black text-white/20 uppercase tracking-[0.2em] relative z-10 pt-2">
                  <span>Failed</span>
                  <span>Pending</span>
                  <span>Sending</span>
                  <span>Completed</span>
               </div>
            </div>
          </div>

          {/* UPGRADED COMPLIANCE BENTO */}
          <div className="md:col-span-6 bg-slate-950 text-white rounded-[40px] p-12 flex flex-col md:flex-row items-center gap-10 group transition-all duration-700 hover:-translate-y-2 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="w-24 h-24 bg-brand-cyan/10 rounded-[32px] flex items-center justify-center border border-brand-cyan/20 group-hover:scale-110 transition-transform relative z-10 shrink-0 shadow-[0_0_40px_rgba(0,212,255,0.1)]">
                <ShieldIcon className="w-12 h-12 text-brand-cyan" />
             </div>
             <div className="relative z-10">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-[10px] font-black text-brand-cyan uppercase tracking-widest mb-4">
                   <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse" />
                   12+ Languages
                 </div>
                 <h4 className="text-3xl font-bold mb-3 tracking-tight">Global Localization</h4>
                 <p className="text-slate-400 font-medium leading-relaxed">
                   Connect with diverse patients. Sitha natively supports generating stories in English, Hindi, Telugu, Marathi, Spanish, and more.
                 </p>
             </div>
          </div>

          {/* UPGRADED MULTI-CLINIC BENTO */}
          <div className="md:col-span-6 bg-slate-50 border border-slate-100 rounded-[40px] p-12 flex flex-col md:flex-row items-center gap-10 group transition-all duration-700 hover:-translate-y-2 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
             <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-8 group-hover:rotate-12 transition-transform">
                   <UsersIcon className="w-8 h-8 text-brand-cyan" />
                </div>
                 <h4 className="text-3xl font-bold text-slate-950 mb-3 tracking-tight">Automated Daily Cron</h4>
                 <p className="text-slate-500 font-medium leading-relaxed">
                    Set & forget. Our background robots automatically synthesize fresh clinic posts every 24 hours, sending you a morning preview on WhatsApp.
                 </p>
             </div>
             {/* Visual element: High-end stacked cards */}
             <div className="relative w-full h-32 md:w-56 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                <div className="absolute w-28 h-18 bg-white border border-slate-100 rounded-2xl shadow-lg -rotate-12 translate-x-[-30%] opacity-40 transition-transform group-hover:translate-x-[-40%]" />
                <div className="absolute w-32 h-22 bg-white border border-slate-100 rounded-[28px] shadow-xl rotate-[5deg] z-10 flex flex-col justify-center p-4">
                   <div className="h-2 w-12 bg-brand-cyan/20 rounded-full mb-2" />
                   <div className="space-y-1.5">
                      <div className="h-1.5 w-full bg-slate-50 rounded-full" />
                      <div className="h-1.5 w-2/3 bg-slate-50 rounded-full" />
                   </div>
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-brand-cyan rounded-xl shadow-lg flex items-center justify-center text-white font-black text-xs border-4 border-white">
                   +1
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}
