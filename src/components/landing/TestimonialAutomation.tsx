import { useState, useEffect, useRef } from "react";
import { SparkleIcon, SendIcon } from "./PremiumIcons";

export default function TestimonialAutomation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestRunning = false;
    const handleScroll = () => {
      if (requestRunning || !containerRef.current) return;
      requestRunning = true;

      window.requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const height = rect.height;
        const viewHeight = window.innerHeight;

        const progress = Math.min(
          Math.max(-rect.top / (height - viewHeight), 0),
          1,
        );
        setScrollProgress(progress);
        requestRunning = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getProgress = (start: number, end: number) => {
    return Math.min(Math.max((scrollProgress - start) / (end - start), 0), 1);
  };

  const p1 = 1 - getProgress(0.2, 0.3);
  const p2 = getProgress(0.25, 0.35) * (1 - getProgress(0.45, 0.55));
  const p3 = getProgress(0.5, 0.6) * (1 - getProgress(0.7, 0.8));
  const p4 = getProgress(0.75, 0.85);

  const activeIndex =
    scrollProgress < 0.25
      ? 0
      : scrollProgress < 0.5
        ? 1
        : scrollProgress < 0.75
          ? 2
          : 3;

  const scenes = [
    {
      title: "Zero-Friction Capture.",
      sub: "CLINIC WORKFLOW",
      desc: "Securely document patient successes. A staff member snaps a photo and sends it to your unified WhatsApp Assistant.",
    },
    {
      title: "Empathetic Narratives.",
      sub: "MEDICAL AI",
      desc: "Sitha extracts the clinical context and localizes the patient's success story into 12+ regional languages to build deep community trust.",
    },
    {
      title: "Hospital-Grade Branding.",
      sub: "BRAND ENGINE",
      desc: "The AI instantly wraps the raw photo in your practice's premium visual identity, creating high-authority proof of care.",
    },
    {
      title: "Drive Patient Acquisition.",
      sub: "SOCIAL FOOTFALL",
      desc: 'Review on WhatsApp. Tap "Approve" to instantly broadcast the testimonial to Instagram and attract new patients on autopilot.',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white block"
      style={{ height: "800vh" }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row bg-white z-[5] overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-white">
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2000px] h-[1000px] rounded-full blur-[200px] transition-all duration-1000 ${activeIndex === 0 ? "bg-emerald-500/5" : activeIndex === 1 ? "bg-indigo-500/5" : activeIndex === 2 ? "bg-brand-cyan/10" : "bg-brand-cyan/5"}`}
          />
        </div>

        <div className="w-full md:w-[45%] h-full flex flex-col justify-center px-12 md:px-24 relative z-50 bg-white/40 backdrop-blur-3xl border-r border-slate-100/50">
          <div className="relative h-96 w-full">
            {scenes.map((scene, i) => {
              const isActive = activeIndex === i;
              const isPast = activeIndex > i;
              return (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: `translateY(${isActive ? 0 : isPast ? -60 : 60}px)`,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-[2px] w-12 bg-brand-cyan shadow-[0_0_10px_rgba(0,212,255,0.5)]" />
                    <span className="text-brand-cyan text-[10px] font-black uppercase tracking-[0.6em]">
                      {scene.sub}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-7xl lg:text-8xl font-black text-slate-950 tracking-[-0.05em] mb-10 leading-[0.85]">
                    {scene.title}
                  </h3>
                  <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-sm">
                    {scene.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-20 left-12 md:left-24 flex gap-4">
            {scenes.map((_, i) => (
              <div
                key={i}
                className={`h-1 transition-all duration-500 ${activeIndex === i ? "w-12 bg-brand-cyan shadow-[0_0_15px_rgba(0,212,255,0.4)]" : "w-4 bg-slate-100"}`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 h-full relative flex items-center justify-center p-12 lg:p-24 overflow-hidden perspective-1000">
          {/* ASSET 1 */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-500"
            style={{
              opacity: p1,
              transform: `scale(${0.9 + p1 * 0.1}) rotateY(${(1 - p1) * 20}deg)`,
            }}
          >
            <div className="w-[450px] h-[550px] bg-white rounded-[60px] shadow-2xl border border-slate-100 p-4 relative pointer-events-none group">
              <img
                src="/images/staff-taking-photo.png"
                alt="Staff taking patient photo"
                className="w-full h-full object-cover rounded-[50px]"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-xl shadow-sm">
                  📸
                </div>
                <div>
                  <p className="text-slate-950 font-bold text-sm tracking-tight mb-0.5">
                    Snap & Send
                  </p>
                  <p className="text-slate-500 text-xs font-medium">
                    Directly via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ASSET 2 */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-500"
            style={{
              opacity: p2,
              transform: `translateY(${(1 - p2) * 100}px) scale(${0.8 + p2 * 0.2})`,
            }}
          >
            <div className="flex gap-8 w-full max-w-4xl px-20 pointer-events-none">
              <div className="flex-1 bg-white p-6 rounded-[56px] shadow-2xl border border-slate-100 rotate-[-5deg]">
                <div className="aspect-[4/5] bg-slate-50 rounded-[40px] relative overflow-hidden">
                  <img
                    src="/images/patient-testimonial.png"
                    alt="Professional Clinic Patient"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 self-center relative">
                <div className="bg-slate-950 p-12 rounded-[60px] shadow-2xl rotate-[5deg] relative z-10">
                  <p className="text-2xl text-white font-black italic leading-tight">
                    "I was nervous about the procedure, but the care and
                    personal attention I received here truly changed my life."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ASSET 3: THE SMART BRANDED POST */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-500"
            style={{
              opacity: p3,
              transform: `scale(${0.85 + p3 * 0.15}) rotate(${-(1 - p3) * 10}deg)`,
            }}
          >
            <div className="w-[450px] aspect-[4/5] bg-white rounded-[60px] shadow-4xl border border-white/20 relative overflow-hidden group">
              {/* 1. Background Photo */}
              <img
                src="/images/patient-testimonial.png"
                alt="Branded Post"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* 2. Top Branding Overlay (Transparent) */}
              <div className="absolute top-0 left-0 w-full h-24 flex items-center px-10">
                <div className="w-10 h-10 bg-brand-cyan/90 rounded-xl flex items-center justify-center shadow-lg">
                  <SparkleIcon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* 3. Bottom Text Overlay (Feathered Gradient) */}
              <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <p className="text-xl text-white font-bold italic leading-tight drop-shadow-md">
                  "I was nervous about the procedure, but the care and personal
                  attention I received here truly changed my life."
                </p>
              </div>

              {/* Branded Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/20 animate-pulse">
                  <SparkleIcon className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* ASSET 4: THE DEPLOYMENT (ONE-TAP APPROVE) */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-700"
            style={{
              opacity: p4,
              transform: `translateY(${(1 - p4) * 200}px) scale(${0.8 + p4 * 0.2})`,
            }}
          >
            <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
              {/* 1. MAGNIFIED MASTER POST */}
              <div className="w-full max-w-[600px] aspect-[4/5] bg-white rounded-[60px] shadow-4xl border border-white/20 relative overflow-hidden transition-all">
                <img
                  src="/images/patient-testimonial.png"
                  alt="Final Branded Post"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-24 flex items-center px-10">
                  <div className="w-10 h-10 bg-brand-cyan/90 rounded-xl flex items-center justify-center shadow-lg">
                    <SparkleIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <p className="text-2xl text-white font-bold italic leading-tight mb-4 shadow-sm">
                    "I was nervous about the procedure, but the care and
                    personal attention I received here changed my life."
                  </p>
                </div>
              </div>

              {/* 2. FLOATING WHATSAPP OVERLAY */}
              <div className="absolute -right-20 bottom-20 w-96 transform rotate-[-3deg] animate-[float_6s_ease-in-out_infinite]">
                <div className="bg-white/95 backdrop-blur-3xl p-10 rounded-[60px] shadow-4xl border border-slate-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-[#25D366] rounded-[24px] flex items-center justify-center shadow-xl shadow-green-500/20">
                      <SendIcon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] block mb-1 uppercase">
                        Instant Growth
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        Sitha AI Assistant
                      </span>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-slate-950 mb-8 leading-tight">
                    Your story is ready for 1,200+ reach. Reply 1 to post.
                  </p>
                  <button className="w-full py-6 bg-slate-950 text-white rounded-[35px] text-[12px] font-black uppercase tracking-[0.4em] shadow-3xl hover:bg-slate-800 transition-all hover:scale-[1.05]">
                    Approve & Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
