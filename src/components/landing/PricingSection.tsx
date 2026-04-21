import { Link } from "react-router-dom";
import {
  SparkleIcon,
  WorkflowIcon,
  UsersIcon,
} from "./PremiumIcons";

const snapshot = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Solo practice, getting started.",
    price: 2499,
    icon: SparkleIcon,
    highlight: false,
    headline: [
      "1 clinic · 1 Instagram",
      "30 AI posts / month",
      "500 WhatsApp broadcasts",
      "WhatsApp approval workflow",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "The full AI marketing team.",
    price: 5999,
    icon: WorkflowIcon,
    highlight: true,
    headline: [
      "Up to 3 clinics",
      "100 AI posts / month",
      "2,500 WhatsApp broadcasts",
      "Daily auto-cron + Vision AI",
      "Bulk campaigns with tracking",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Chains, franchises & hospital groups.",
    price: 12999,
    icon: UsersIcon,
    highlight: false,
    headline: [
      "Unlimited locations & posts",
      "10,000+ WhatsApp broadcasts",
      "API access + SSO",
      "Dedicated 24/7 manager",
    ],
  },
];

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="5 12 10 17 20 7" />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-40 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[500px] bg-brand-cyan/5 rounded-[100%] blur-[120px] -z-10" />

      <div className="container mx-auto px-8">
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <h2 className="inline-block px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-[12px] font-black text-slate-950 uppercase tracking-widest mb-8">
            Pricing
          </h2>
          <h3 className="text-5xl md:text-7xl font-bold text-slate-950 mb-8 tracking-tight leading-[1.05]">
            Plans that grow <br />
            <span className="text-brand-cyan">with your clinic.</span>
          </h3>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Transparent pricing. No contracts. Cancel anytime. All prices shown per month,
            billed annually in INR.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {snapshot.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative rounded-[36px] p-10 flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                  plan.highlight
                    ? "bg-slate-950 text-white shadow-2xl shadow-cyan-500/20 border border-brand-cyan/30"
                    : "bg-slate-50 border border-slate-100 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] hover:bg-white"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-brand-cyan text-white text-[11px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-cyan-500/30">
                    Most Popular
                  </div>
                )}
                {plan.highlight && (
                  <div className="absolute top-0 right-0 w-48 h-48 bg-brand-cyan/20 rounded-full blur-[80px] pointer-events-none" />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                      plan.highlight
                        ? "bg-white/10 border border-white/10"
                        : "bg-white shadow-sm border border-slate-100"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-brand-cyan" />
                  </div>

                  <h4
                    className={`text-2xl font-bold tracking-tight mb-2 ${
                      plan.highlight ? "text-white" : "text-slate-950"
                    }`}
                  >
                    {plan.name}
                  </h4>
                  <p
                    className={`text-sm font-medium mb-7 ${
                      plan.highlight ? "text-white/60" : "text-slate-500"
                    }`}
                  >
                    {plan.tagline}
                  </p>

                  <div className="mb-7">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className={`text-4xl font-bold tracking-tighter ${
                          plan.highlight ? "text-white" : "text-slate-950"
                        }`}
                      >
                        ₹{plan.price.toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          plan.highlight ? "text-white/50" : "text-slate-400"
                        }`}
                      >
                        /mo
                      </span>
                    </div>
                    <p
                      className={`text-[11px] font-black uppercase tracking-widest mt-1.5 ${
                        plan.highlight ? "text-brand-cyan" : "text-slate-400"
                      }`}
                    >
                      Billed annually
                    </p>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.headline.map((item, idx) => (
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
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/pricing#${plan.id}`}
                    className={`block text-center w-full py-3.5 rounded-xl text-[14px] font-bold transition-all ${
                      plan.highlight
                        ? "bg-brand-cyan text-white hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
                        : "bg-slate-950 text-white hover:bg-slate-800"
                    }`}
                  >
                    Choose {plan.name}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-slate-950 font-bold text-sm hover:text-brand-cyan transition-colors"
          >
            See full feature comparison
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
