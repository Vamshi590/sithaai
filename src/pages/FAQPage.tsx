import { useState } from "react";
import LandingNavbar from "../components/landing/LandingNavbar";
import FooterSection from "../components/landing/FooterSection";
import {
  SparkleIcon,
  ShieldIcon,
  UsersIcon,
} from "../components/landing/PremiumIcons";

const faqCategories = [
  {
    id: "general",
    name: "Product & Vision",
    icon: SparkleIcon,
    questions: [
      {
        q: "What exactly is Sitha AI?",
        a: "Sitha is a specialized AI engine built specifically for healthcare marketing. It analyzes your unique clinic persona, generates medical-safe content, and automates your entire social media presence through a simple WhatsApp-based approval system.",
      },
      {
        q: "How is Sitha different from ChatGPT?",
        a: "ChatGPT is a generalist. Sitha is a specialist. We are trained strictly on medical guidelines, clinical ethics, and healthcare marketing trends. Plus, Sitha handles the execution—posting directly to your social media—which general AI tools cannot do.",
      },
      {
        q: "Do I need to be tech-savvy to use Sitha?",
        a: "Not at all. If you can use WhatsApp, you can use Sitha. Our goal is to remove the 'tech' barrier so you can focus on surgery and patient care.",
      },
    ],
  },
  {
    id: "safety",
    name: "Security & Safety",
    icon: ShieldIcon,
    questions: [
      {
        q: "Is my patient data safe?",
        a: "Absolutely. Sitha does not access your Patient Management Software (PMS) or any sensitive medical records. We only process the information you provide for marketing purposes, and all data is encrypted to enterprise-grade standards.",
      },
      {
        q: "How do you ensure medical accuracy?",
        a: "Our AI is restricted by a 'Clinical Guardrail' system. It cross-references generated content against verified medical sources to ensure that no misinformation is ever suggested. Additionally, you have 100% approval control before anything goes live.",
      },
    ],
  },
  {
    id: "billing",
    name: "Plans & Billing",
    icon: UsersIcon,
    questions: [
      {
        q: "Can I manage multiple clinic locations?",
        a: "Yes. Our 'Multi-Clinic Ops' plan is designed for chains and franchises. You can manage 100+ locations from a single command center with separate doctor personas for each.",
      },
      {
        q: "What is your 'One-Tap Approval' system?",
        a: "Traditional tools require you to log in to complex dashboards. Sitha sends you a preview of your content directly on WhatsApp. You just reply with a '1' to approve and post to all your social channels instantly. It takes less than 10 seconds of your day.",
      },
      {
        q: "How does the AI learn my clinic's personality?",
        a: "During onboarding, we analyze your existing website and any previous posts. Sitha then builds a 'Semantic Map' of your clinic's tone—whether it's authoritative and medical or warm and family-friendly—and maintains that voice in every post.",
      },
      {
        q: "Is there a free trial?",
        a: "We offer a 7-day 'Growth Pilot' where we generate and post your first week of content for free so you can experience the automation first-hand.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("general-0");

  return (
    <div className="min-h-screen bg-white text-slate-950 font-sans selection:bg-brand-cyan/20">
      <LandingNavbar />

      <main className="pt-40 pb-32">
        <div className="container mx-auto px-8">
          {/* Header Section */}
          <div className="max-w-4xl mb-24">
            <h2 className="inline-block px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-[11px] font-black text-slate-950 uppercase tracking-widest mb-8">
              Support Center
            </h2>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
              Questions? <br />
              <span className="text-brand-cyan">Everything Answered.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed">
              Find everything you need to know about automating your clinic's
              growth. Can't find an answer? Our team is a WhatsApp message away.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-4 space-y-4 sticky top-32 h-fit">
              {faqCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="flex items-center gap-4 p-6 rounded-[24px] bg-slate-50 border border-slate-100 hover:bg-white hover:border-brand-cyan/30 hover:shadow-xl hover:shadow-cyan-500/5 transition-all group"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <cat.icon className="w-6 h-6 text-brand-cyan" />
                  </div>
                  <span className="font-bold text-slate-900">{cat.name}</span>
                </a>
              ))}

              <div className="mt-12 p-8 rounded-[32px] bg-brand-cyan text-white shadow-2xl shadow-cyan-500/20">
                <h4 className="text-xl font-bold mb-4">Still stuck?</h4>
                <p className="text-white/80 font-medium text-sm mb-6 leading-relaxed">
                  Our clinical growth experts are available 24/7 for you.
                </p>
                <button className="w-full py-3 bg-white text-brand-cyan rounded-xl font-bold hover:bg-slate-50 transition-colors">
                  Contact Support
                </button>
              </div>
            </aside>

            {/* FAQ Content */}
            <div className="lg:col-span-8 space-y-24">
              {faqCategories.map((cat) => (
                <div key={cat.id} id={cat.id} className="scroll-mt-32">
                  <h3 className="text-3xl font-black tracking-tight mb-10 flex items-center gap-4">
                    <cat.icon className="w-8 h-8 text-brand-cyan" />
                    {cat.name}
                  </h3>
                  <div className="space-y-4">
                    {cat.questions.map((q, idx) => {
                      const id = `${cat.id}-${idx}`;
                      const isOpen = openIndex === id;
                      return (
                        <div
                          key={id}
                          className={`border rounded-[32px] transition-all duration-500 overflow-hidden ${
                            isOpen
                              ? "bg-slate-50 border-brand-cyan/20"
                              : "bg-white border-slate-100 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : id)}
                            className="w-full p-8 text-left flex items-center justify-between gap-8"
                          >
                            <span className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                              {q.q}
                            </span>
                            <div
                              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                                isOpen
                                  ? "bg-brand-cyan border-brand-cyan text-white rotate-45"
                                  : "border-slate-200 text-slate-400 rotate-0"
                              }`}
                            >
                              +
                            </div>
                          </button>
                          <div
                            className={`transition-all duration-500 ease-in-out ${
                              isOpen
                                ? "max-h-[500px] opacity-100"
                                : "max-h-0 opacity-0 pointer-events-none"
                            }`}
                          >
                            <div className="px-8 pb-8 pt-0">
                              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl border-t border-slate-200/50 pt-6">
                                {q.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
