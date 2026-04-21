import { useState } from "react";
import { Link } from "react-router-dom";
import LandingNavbar from "@/components/landing/LandingNavbar";
import FooterSection from "@/components/landing/FooterSection";
import {
  SparkleIcon,
  ShieldIcon,
  UsersIcon,
  InstagramIcon,
  SendIcon,
  WorkflowIcon,
  ChartBarIcon,
} from "@/components/landing/PremiumIcons";

type BillingCycle = "monthly" | "annual";

interface Plan {
  id: "starter" | "growth" | "scale";
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  highlight: boolean;
  ctaLabel: string;
  ctaLink: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For solo practices getting started with automated growth.",
    monthly: 2999,
    annual: 2499,
    icon: SparkleIcon,
    highlight: false,
    ctaLabel: "Start Starter",
    ctaLink: "/login?signup=true&plan=starter",
    features: [
      "1 clinic location",
      "1 Instagram account sync (Meta official API)",
      "30 AI-generated posts / month",
      "500 WhatsApp broadcasts / month",
      "WhatsApp one-tap approval workflow",
      "Vision AI — upload up to 3 patient photos per post",
      "12+ language localization (English, Hindi, Telugu & more)",
      "Clinical Guardrail safety layer",
      "5 pre-built medical content templates",
      "Email support (48h response)",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "The complete AI marketing department for growing clinics.",
    monthly: 6999,
    annual: 5999,
    icon: WorkflowIcon,
    highlight: true,
    ctaLabel: "Start 7-day Growth Pilot",
    ctaLink: "/login?signup=true&plan=growth",
    features: [
      "Up to 3 clinic locations",
      "Instagram + Facebook sync",
      "100 AI-generated posts / month",
      "2,500 WhatsApp broadcasts / month",
      "Automated daily cron — fresh posts every 24h",
      "Vision AI — upload up to 5 patient photos per post",
      "Meta-approved bulk WhatsApp campaigns with live tracking",
      "Per-doctor persona & tone modeling",
      "Custom clinic branding on carousels",
      "Campaign analytics & engagement insights",
      "Priority WhatsApp support (4h response)",
      "Everything in Starter",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Built for multi-location chains, franchises & hospital groups.",
    monthly: 14999,
    annual: 12999,
    icon: UsersIcon,
    highlight: false,
    ctaLabel: "Talk to Sales",
    ctaLink: "/contact?topic=scale",
    features: [
      "Unlimited clinic locations",
      "Instagram + Facebook + LinkedIn sync",
      "Unlimited AI-generated posts",
      "10,000+ WhatsApp broadcasts / month",
      "Multi-clinic command center & team roles",
      "Advanced Vision AI with custom model tuning",
      "Dedicated campaign manager",
      "API access & webhook integrations",
      "SSO / role-based access control",
      "Custom medical compliance rules per region",
      "24/7 dedicated support with SLA",
      "Everything in Growth",
    ],
  },
];

const featureMatrix: { section: string; rows: { label: string; values: [string | boolean, string | boolean, string | boolean] }[] }[] = [
  {
    section: "Content & AI",
    rows: [
      { label: "AI-generated posts / month", values: ["30", "100", "Unlimited"] },
      { label: "Vision AI photo uploads per post", values: ["3", "5", "Unlimited"] },
      { label: "Per-doctor persona modeling", values: [false, true, true] },
      { label: "Custom model tuning", values: [false, false, true] },
      { label: "Automated daily cron posts", values: [false, true, true] },
    ],
  },
  {
    section: "Social & WhatsApp",
    rows: [
      { label: "Instagram sync (Meta official API)", values: [true, true, true] },
      { label: "Facebook sync", values: [false, true, true] },
      { label: "LinkedIn sync", values: [false, false, true] },
      { label: "WhatsApp broadcasts / month", values: ["500", "2,500", "10,000+"] },
      { label: "Meta-approved bulk campaigns", values: [false, true, true] },
      { label: "Campaign analytics & tracking", values: [false, true, true] },
    ],
  },
  {
    section: "Team & Clinics",
    rows: [
      { label: "Clinic locations", values: ["1", "Up to 3", "Unlimited"] },
      { label: "Multi-clinic command center", values: [false, false, true] },
      { label: "Team roles & permissions", values: [false, false, true] },
      { label: "SSO / SAML", values: [false, false, true] },
    ],
  },
  {
    section: "Compliance & Support",
    rows: [
      { label: "Clinical Guardrail safety layer", values: [true, true, true] },
      { label: "12+ language localization", values: [true, true, true] },
      { label: "Custom regional compliance rules", values: [false, false, true] },
      { label: "API access & webhooks", values: [false, false, true] },
      { label: "Support SLA", values: ["Email 48h", "WhatsApp 4h", "24/7 Dedicated"] },
    ],
  },
];

const faqs = [
  {
    q: "Can I switch or cancel my plan at any time?",
    a: "Yes. You can upgrade, downgrade, or cancel from your dashboard settings at any time. On cancellation, your plan stays active until the end of the current billing period.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Growth includes a 7-day Growth Pilot where we generate and publish your first week of content for free. You can cancel at any point during the pilot with no charge.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Yes — we offer a 7-day money-back guarantee for first-time subscribers on all plans. See our Refund Policy for details.",
  },
  {
    q: "What happens if I exceed my monthly message quota?",
    a: "We'll notify you at 80% and 100% usage. You can either upgrade your plan or top-up additional messages at per-unit rates from your dashboard.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "All payments are processed securely via Razorpay. We accept UPI, credit/debit cards, net banking, and wallet payments for Indian clinics.",
  },
  {
    q: "Do you offer custom plans for hospital chains?",
    a: "Yes. For hospital groups, DSOs, or franchises with 10+ locations we offer bespoke pricing, onboarding, and compliance packages. Contact our sales team.",
  },
];

function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="5 12 10 17 20 7" />
    </svg>
  );
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <line x1="6" y1="12" x2="18" y2="12" />
    </svg>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-slate-950 selection:bg-brand-cyan/20">
      <LandingNavbar />

      {/* Hero */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-100/50 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-brand-cyan/20 via-blue-100/40 to-indigo-100/20 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-[12px] font-black text-slate-950 uppercase tracking-widest mb-8">
            Pricing
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8 max-w-4xl mx-auto">
            <span className="text-slate-950">Simple pricing.</span>
            <br />
            <span className="bg-gradient-to-r from-slate-900 via-brand-cyan to-slate-900 bg-clip-text text-transparent">
              Autopilot growth.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            Pick the plan that matches your clinic today. Upgrade, downgrade, or cancel anytime —
            no contracts, no hidden fees.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                billing === "monthly"
                  ? "bg-white text-slate-950 shadow"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                billing === "annual"
                  ? "bg-white text-slate-950 shadow"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Annual
              <span className="px-2 py-0.5 bg-brand-cyan/10 text-brand-cyan text-[10px] font-black uppercase tracking-widest rounded-full">
                Save ~16%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const price = billing === "annual" ? plan.annual : plan.monthly;
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-[40px] p-10 flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                    plan.highlight
                      ? "bg-slate-950 text-white shadow-2xl shadow-cyan-500/20 border border-brand-cyan/30"
                      : "bg-slate-50 border border-slate-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:bg-white"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-brand-cyan text-white text-[11px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-cyan-500/30">
                      Most Popular
                    </div>
                  )}
                  {plan.highlight && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/20 rounded-full blur-[100px] pointer-events-none" />
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                        plan.highlight
                          ? "bg-white/10 border border-white/10"
                          : "bg-white shadow-sm border border-slate-100"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 ${
                          plan.highlight ? "text-brand-cyan" : "text-brand-cyan"
                        }`}
                      />
                    </div>

                    <h3
                      className={`text-3xl font-bold tracking-tight mb-3 ${
                        plan.highlight ? "text-white" : "text-slate-950"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-base font-medium leading-relaxed mb-8 min-h-[48px] ${
                        plan.highlight ? "text-white/70" : "text-slate-500"
                      }`}
                    >
                      {plan.tagline}
                    </p>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-5xl font-bold tracking-tighter ${
                            plan.highlight ? "text-white" : "text-slate-950"
                          }`}
                        >
                          {formatINR(price)}
                        </span>
                        <span
                          className={`text-sm font-bold ${
                            plan.highlight ? "text-white/50" : "text-slate-400"
                          }`}
                        >
                          /month
                        </span>
                      </div>
                      <p
                        className={`text-xs font-bold mt-2 uppercase tracking-widest ${
                          plan.highlight ? "text-brand-cyan" : "text-slate-400"
                        }`}
                      >
                        {billing === "annual"
                          ? `Billed annually · ${formatINR(price * 12)}/yr`
                          : "Billed monthly · cancel anytime"}
                      </p>
                    </div>

                    <Link
                      to={plan.ctaLink}
                      className={`block text-center w-full py-4 rounded-xl text-[15px] font-bold transition-all shadow-lg ${
                        plan.highlight
                          ? "bg-brand-cyan text-white hover:bg-cyan-400 shadow-cyan-500/30"
                          : "bg-slate-950 text-white hover:bg-slate-800 shadow-slate-900/10"
                      }`}
                    >
                      {plan.ctaLabel}
                    </Link>

                    <div
                      className={`my-8 h-px ${
                        plan.highlight ? "bg-white/10" : "bg-slate-200"
                      }`}
                    />

                    <p
                      className={`text-[11px] font-black uppercase tracking-widest mb-5 ${
                        plan.highlight ? "text-white/60" : "text-slate-500"
                      }`}
                    >
                      What's included
                    </p>

                    <ul className="space-y-3.5 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div
                            className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                              plan.highlight
                                ? "bg-brand-cyan/20 text-brand-cyan"
                                : "bg-brand-cyan/10 text-brand-cyan"
                            }`}
                          >
                            <CheckIcon className="w-3 h-3" />
                          </div>
                          <span
                            className={`text-sm font-medium leading-snug ${
                              plan.highlight ? "text-white/90" : "text-slate-700"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-slate-400 font-medium mt-10">
            All prices in INR, exclusive of applicable GST. Secure payments powered by Razorpay.
          </p>
        </div>
      </section>

      {/* Feature Matrix */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-8">
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[12px] font-black text-slate-950 uppercase tracking-widest mb-6">
              Full Comparison
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-950 mb-6">
              Compare every feature
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Here's exactly what you get at each tier — so there are no surprises.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
            {/* Header row */}
            <div className="grid grid-cols-4 bg-slate-950 text-white px-8 py-6">
              <div className="text-xs font-black uppercase tracking-widest text-white/50">
                Feature
              </div>
              {plans.map((p) => (
                <div key={p.id} className="text-center">
                  <div className="text-sm font-bold">{p.name}</div>
                  <div className="text-xs text-white/50 font-medium mt-1">
                    {formatINR(billing === "annual" ? p.annual : p.monthly)}/mo
                  </div>
                </div>
              ))}
            </div>

            {featureMatrix.map((section) => (
              <div key={section.section}>
                <div className="px-8 py-4 bg-slate-50 border-y border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">
                    {section.section}
                  </h4>
                </div>
                {section.rows.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 px-8 py-4 border-b border-slate-50 items-center hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="text-sm font-medium text-slate-700 pr-4">
                      {row.label}
                    </div>
                    {row.values.map((val, i) => (
                      <div key={i} className="text-center flex justify-center items-center">
                        {typeof val === "boolean" ? (
                          val ? (
                            <div className="w-6 h-6 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan">
                              <CheckIcon className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <MinusIcon className="w-4 h-4 text-slate-300" />
                          )
                        ) : (
                          <span className="text-sm font-bold text-slate-900">{val}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldIcon,
                title: "Medical-grade safety",
                body: "Clinical Guardrail cross-references content against verified medical sources before any draft reaches you.",
              },
              {
                icon: InstagramIcon,
                title: "Official Meta APIs",
                body: "Posts publish through the Instagram Professional Graph API — no third-party schedulers, no token risks.",
              },
              {
                icon: SendIcon,
                title: "100% approval control",
                body: "Nothing goes live without your WhatsApp tap. You stay in the driver's seat, Sitha handles the work.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-8 rounded-[28px] bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-brand-cyan" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-950 mb-2 tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-8 max-w-4xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[12px] font-black text-slate-950 uppercase tracking-widest mb-6">
              Pricing FAQ
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-950 mb-6">
              Answers before you ask
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Have more questions?{" "}
              <Link to="/contact" className="text-brand-cyan font-bold hover:underline">
                Chat with our team
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-[28px] transition-all duration-500 overflow-hidden ${
                    isOpen
                      ? "bg-white border-brand-cyan/20 shadow-sm"
                      : "bg-white border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-7 text-left flex items-center justify-between gap-6"
                  >
                    <span className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                      {faq.q}
                    </span>
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                        isOpen
                          ? "bg-brand-cyan border-brand-cyan text-white rotate-45"
                          : "border-slate-200 text-slate-400"
                      }`}
                    >
                      +
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "max-h-[300px] opacity-100"
                        : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="px-7 pb-7 pt-0">
                      <p className="text-base text-slate-500 font-medium leading-relaxed border-t border-slate-100 pt-5">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden bg-white text-slate-950 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-200 via-cyan-100 to-indigo-200 rounded-[100%] blur-[100px] opacity-60 -z-10 pointer-events-none" />
        <div className="container mx-auto px-8 relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-brand-cyan/10 rounded-2xl flex items-center justify-center mb-8 border border-brand-cyan/20">
            <ChartBarIcon className="w-8 h-8 text-brand-cyan" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            Still deciding? Let us do a week for free.
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mb-10">
            Our Growth Pilot generates and publishes your first 7 days of content at no cost.
            No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              to="/login?signup=true&plan=growth"
              className="px-10 py-4 bg-brand-cyan text-white shadow-xl shadow-cyan-500/20 rounded-xl text-lg font-bold hover:bg-cyan-400 transition-colors"
            >
              Start 7-day Pilot
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 bg-white border border-slate-200 text-slate-950 rounded-xl text-lg font-bold hover:bg-slate-50 transition-colors shadow-sm"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
