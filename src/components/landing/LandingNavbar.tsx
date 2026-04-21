import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoUrl from "@/assets/logo.png";
import {
  SparkleIcon,
  WorkflowIcon,
  ChartBarIcon,
  HelpIcon,
  MailIcon,
} from "./PremiumIcons";

type NavLink = {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
} & (
  | { type: "route"; href: string }
  | { type: "anchor"; hash: string }
);

const navLinks: NavLink[] = [
  { name: "Features", type: "anchor", hash: "features", icon: SparkleIcon },
  { name: "Workflow", type: "anchor", hash: "process", icon: WorkflowIcon },
  { name: "Pricing", type: "route", href: "/pricing", icon: ChartBarIcon },
  { name: "FAQs", type: "route", href: "/faq", icon: HelpIcon },
  { name: "Support", type: "route", href: "/contact", icon: MailIcon },
];

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function goToAnchor(hash: string) {
    setIsOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${hash}`);
    }
  }

  const renderLink = (link: NavLink, className: string) => {
    if (link.type === "route") {
      return (
        <Link
          key={link.name}
          to={link.href}
          onClick={() => setIsOpen(false)}
          className={className}
        >
          <link.icon
            strokeWidth={1.5}
            className="w-0 h-4 text-brand-cyan opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-500 ease-in-out"
          />
          <span>{link.name}</span>
        </Link>
      );
    }
    return (
      <button
        key={link.name}
        type="button"
        onClick={() => goToAnchor(link.hash)}
        className={className}
      >
        <link.icon
          strokeWidth={1.5}
          className="w-0 h-4 text-brand-cyan opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-500 ease-in-out"
        />
        <span>{link.name}</span>
      </button>
    );
  };

  const desktopLinkClass =
    "group flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-slate-950 transition-all px-2 py-1 bg-transparent border-0 cursor-pointer";

  const mobileLinkClass =
    "group flex items-center gap-3 text-lg font-bold text-slate-700 hover:text-brand-cyan transition-colors w-full text-left bg-transparent border-0 py-3 cursor-pointer";

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 py-4 shadow-sm"
            : "bg-transparent py-8"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="bg-brand-cyan/10 p-2 rounded-xl transition-all group-hover:scale-110 group-hover:bg-brand-cyan/20">
              <img
                src={logoUrl}
                alt="Sitha-ai"
                className="h-6 w-6"
                style={{
                  filter:
                    "brightness(0) drop-shadow(0 0 4px rgba(0,212,255,0.2))",
                }}
              />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-slate-950 transition-colors">
              Sitha
              <span className="text-brand-cyan font-light group-hover:text-cyan-600">
                ai
              </span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => renderLink(link, desktopLinkClass))}
          </div>

          <div className="flex items-center gap-3 lg:gap-5">
            <Link
              to="/login"
              className="hidden sm:block text-[14px] font-bold text-slate-600 px-4 lg:px-6 py-3 hover:text-slate-950 transition-all hover:scale-105 transition-transform"
            >
              Login
            </Link>
            <Link
              to="/login?signup=true"
              className="bg-brand-cyan text-white px-5 lg:px-6 py-2.5 rounded-lg text-[14px] font-bold hover:bg-cyan-500 transition-all shadow-md shadow-brand-cyan/20 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[380px] bg-white shadow-2xl transition-transform duration-300 overflow-y-auto ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="bg-brand-cyan/10 p-2 rounded-xl">
                <img
                  src={logoUrl}
                  alt="Sitha-ai"
                  className="h-6 w-6"
                  style={{ filter: "brightness(0)" }}
                />
              </div>
              <span className="text-xl font-bold tracking-tighter text-slate-950">
                Sitha
                <span className="text-brand-cyan font-light">ai</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-6 flex flex-col divide-y divide-slate-100">
            {navLinks.map((link) => renderLink(link, mobileLinkClass))}
          </div>

          <div className="px-6 py-6 flex flex-col gap-3 border-t border-slate-100">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3.5 rounded-xl border border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/login?signup=true"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3.5 rounded-xl bg-brand-cyan text-white font-bold hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
