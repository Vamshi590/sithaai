import { Link } from "react-router-dom";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TestimonialAutomation from "@/components/landing/TestimonialAutomation";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import FooterSection from "@/components/landing/FooterSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand-cyan/20 selection:text-slate-900">
      <LandingNavbar />
      <main>
        <HeroSection />

        {/* Trust Section / Trusted By */}
        <div className="py-12 bg-white border-b border-slate-100 relative z-10">
          <div className="container mx-auto px-8 text-center text-slate-400 font-bold text-sm uppercase tracking-widest flex flex-col md:flex-row items-center justify-center gap-12 mt-[-40px]">
            <span className="mb-4 md:mb-0">Trusted by modern practices</span>
            <div className="flex items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
              <span className="text-xl tracking-tighter">AlignerCo</span>
              <span className="text-xl tracking-tighter">ClearSmile</span>
              <span className="text-xl tracking-tighter">DentalWorks</span>
              <span className="text-xl tracking-tighter">SmileDirect</span>
            </div>
          </div>
        </div>

        <FeaturesSection />
        <ProcessSection />
        <TestimonialAutomation />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />

        {/* Final CTA mimicking PatientDesk (White Mode) */}
        <section className="relative py-40 overflow-hidden bg-slate-50 text-slate-950 flex flex-col items-center min-h-[50vh] justify-center text-center">
          {/* Subtle light mode glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-200 via-cyan-100 to-indigo-200 rounded-[100%] blur-[100px] opacity-60 -z-10 pointer-events-none" />

          <div className="container mx-auto px-8 relative z-10 flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-slate-950">
              Ready to grow on autopilot?
            </h2>
            <p className="text-xl text-slate-500 font-medium mb-12 max-w-2xl px-4">
              Join the clinics saving 20+ hours a month by automating their
              social media presence. Sitha is the only tool you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
              <Link
                to="/login?signup=true"
                className="px-10 py-4 bg-brand-cyan text-white shadow-xl shadow-cyan-500/20 rounded-lg text-lg font-bold hover:bg-cyan-400 transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
