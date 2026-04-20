import { Link } from "react-router-dom";
import { PlayIcon, SparkleIcon, InstagramIcon, SendIcon } from "./PremiumIcons";

export default function HeroSection() {
  return (
    <section className="relative pt-64 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-screen bg-white">
      {/* 
          CREATIVE BACKGROUND: 
          Moving Mesh Gradients - Multiple layered blobs with different animations for a 'Liquid' feel
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-100/50 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-100/50 rounded-full blur-[120px] animate-bounce [animation-duration:10s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-brand-cyan/20 via-blue-100/40 to-indigo-100/20 rounded-full blur-[100px] rotate-12 animate-pulse [animation-duration:8s]" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        {/* UNIQUE FLOATING DECOR: Glass Cards */}
        <div className="absolute -left-20 top-20 hidden xl:block animate-float shadow-2xl">
          <div className="bg-white/40 backdrop-blur-xl border border-white/40 p-6 rounded-3xl rotate-[-12deg] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <InstagramIcon className="w-8 h-8 text-brand-cyan mb-4" />
            <div className="h-2 w-20 bg-slate-200 rounded-full mb-2" />
            <div className="h-2 w-16 bg-slate-100 rounded-full" />
          </div>
        </div>

        <div className="absolute -right-20 bottom-40 hidden xl:block animate-float [animation-delay:2s]">
          <div className="bg-white/40 backdrop-blur-xl border border-white/40 p-6 rounded-3xl rotate-[8deg] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <SendIcon className="w-8 h-8 text-brand-cyan mb-4" />
            <div className="h-2 w-24 bg-slate-200 rounded-full mb-2" />
            <div className="h-2 w-12 bg-slate-100 rounded-full" />
          </div>
        </div>

        {/* SHIMMERING HEADLINE: Uses a background-clip masking trick for a premium light sweep */}
        <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold tracking-tight leading-[0.95] mb-10 max-w-5xl mx-auto relative">
          <span className="block text-slate-950">Dominate Search.</span>
          <span className="relative inline-block mt-4 bg-gradient-to-r from-slate-900 via-brand-cyan to-slate-900 bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
            Automate Growth.
          </span>
        </h1>

        {/* Subtitle with better typography balance */}
        <p className="text-xl md:text-2xl text-slate-500 font-medium mb-14 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in [animation-delay:0.5s] [animation-fill-mode:forwards]">
          The most powerful AI engine for modern clinics. From high-end social
          content to automated posting—all handled through your WhatsApp.
        </p>

        {/* Action Buttons: Premium Shadow & Scale effects */}
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center w-full sm:w-auto opacity-0 animate-fade-in [animation-delay:0.8s] [animation-fill-mode:forwards]">
          <Link
            to="/login?signup=true"
            className="group relative w-full sm:w-auto px-10 py-5 bg-slate-950 text-white rounded-2xl text-[16px] font-extra-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-2">
              Book a Demo <SparkleIcon className="w-5 h-5" />
            </span>
          </Link>

          <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 border border-slate-200 rounded-2xl text-[16px] font-bold hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group">
            <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-brand-cyan/20 transition-colors">
              <PlayIcon className="w-5 h-5 fill-slate-950" />
            </div>
            Watch Story
          </button>
        </div>

        {/* BOTTOM DECOR: Floating Stats (Mini glass) */}
        <div className="mt-24 flex gap-12 text-slate-400 font-bold text-sm tracking-widest opacity-0 animate-fade-in [animation-delay:1.2s] [animation-fill-mode:forwards]">
          <div className="flex flex-col items-center gap-1">
            <span className="text-slate-950 text-2xl tracking-tighter">
              500+
            </span>
            <span>Clinics</span>
          </div>
          <div className="w-[1px] h-12 bg-slate-100" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-slate-950 text-2xl tracking-tighter">
              1.2M+
            </span>
            <span>Reach</span>
          </div>
        </div>
      </div>
    </section>
  );
}
