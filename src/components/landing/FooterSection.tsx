import { Link } from "react-router-dom";

const Instagram = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const Twitter = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-1 2.17-2 3.5c1.17 0 2.17 1 2.17 2.17 0 1.17-1 2.17-2.17 2.17-2.17 0-4.17-2-4.17-4.17 0-1.17.83-2.17 2-3.17-1.17-.17-2.17-.17-3.17-.17-2.17 0-4.17 2-4.17 4.17 0 1.17.83 2.17 2 3.17-5.17-3-8.17-7-9.17-12 0 0 1 3 4 3-.83-1.17-1.33-2.67-1.33-4.17 0-3.33 2.67-6 6-6 1.67 0 3.17.67 4.17 1.83 1.33-.33 2.5-.83 3.67-1.5-.5 1.5-1.5 2.67-2.83 3.5 1.17-.17 2.33-.5 3.33-1z" />
  </svg>
);
const Linkedin = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const Facebook = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function FooterSection() {
  return (
    <footer className="bg-white pt-32 pb-12 text-slate-500 border-t border-slate-100 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-cyan/10 blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-10 group">
              <div className="bg-brand-cyan/20 p-2 rounded-xl transition-all group-hover:scale-110">
                <img
                  src="/src/assets/logo.png"
                  alt="Sitha"
                  className="h-6 w-6"
                  style={{
                    filter:
                      "brightness(0) drop-shadow(0 0 8px rgba(0,212,255,0.3))",
                  }}
                />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-slate-900 transition-colors">
                Sitha
                <span className="text-brand-cyan font-light group-hover:text-cyan-600">
                  ai
                </span>
              </span>
            </Link>
            <p className="text-lg font-medium leading-relaxed mb-10 text-slate-500">
              Helping modern clinics dominate the digital landscape through
              automated, medical-grade marketing.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-brand-cyan hover:border-brand-cyan hover:text-white text-slate-400 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-slate-900 font-bold mb-8 text-[13px] uppercase tracking-widest">
              Product
            </h4>
            <ul className="space-y-4 text-sm font-bold">
              <li>
                <a
                  href="#features"
                  className="hover:text-brand-cyan text-slate-500 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="hover:text-brand-cyan text-slate-500 transition-colors"
                >
                  Process
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-cyan text-slate-500 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-cyan text-slate-500 transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-slate-900 font-bold mb-8 text-[13px] uppercase tracking-widest">
              Legal
            </h4>
            <ul className="space-y-4 text-sm font-bold">
              <li>
                <Link
                  to="/terms"
                  className="hover:text-brand-cyan text-slate-500 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-brand-cyan text-slate-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund"
                  className="hover:text-brand-cyan text-slate-500 transition-colors"
                >
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-brand-cyan text-slate-500 transition-colors"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-cyan text-slate-500 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="p-8 rounded-[30px] bg-slate-50 border border-slate-100">
              <h4 className="text-slate-900 font-bold mb-4 tracking-tight">
                Join our news
              </h4>
              <p className="text-sm font-medium mb-6 text-slate-500">
                Weekly insights for clinic growth.
              </p>
              <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent border-none focus:ring-0 text-slate-900 px-4 flex-1 text-sm outline-none placeholder:text-slate-400"
                />
                <button className="bg-brand-cyan text-white text-[11px] font-black uppercase tracking-widest px-4 py-3 rounded-md hover:bg-cyan-400 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[13px] font-bold text-slate-400">
            © {new Date().getFullYear()} Sitha-ai. Part of Sitha Health.
          </p>
          <div className="flex gap-8 text-[13px] font-bold text-slate-400">
            <a href="#" className="hover:text-slate-900 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
