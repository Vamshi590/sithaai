import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  SparkleIcon, 
  WorkflowIcon, 
  ChartBarIcon, 
  HelpIcon, 
  ShieldIcon, 
  FileIcon,
  MailIcon 
} from './PremiumIcons'

const navLinks = [
  { name: 'Features', href: '#features', icon: SparkleIcon },
  { name: 'Workflow', href: '#process', icon: WorkflowIcon },
  { name: 'Analytics', href: '#testimonials', icon: ChartBarIcon },
  { name: 'FAQs', href: '/faq', icon: HelpIcon, isRoute: true },
  { name: 'Safety', href: '/privacy', icon: ShieldIcon, isRoute: true },
  { name: 'Guidelines', href: '/terms', icon: FileIcon, isRoute: true },
  { name: 'Support', href: '/contact', icon: MailIcon, isRoute: true },
]

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 py-4 shadow-sm' : 'bg-transparent py-8'
    }`}>
      <div className="container mx-auto px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="bg-brand-cyan/10 p-2 rounded-xl transition-all group-hover:scale-110 group-hover:bg-brand-cyan/20">
            <img 
              src="/src/assets/logo.png" 
              alt="Sitha-ai" 
              className="h-6 w-6" 
              style={{ filter: 'brightness(0) drop-shadow(0 0 4px rgba(0,212,255,0.2))' }}
            />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-slate-950 transition-colors">
            Sitha<span className="text-brand-cyan font-light group-hover:text-cyan-600">ai</span>
          </span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link 
                key={link.name} 
                to={link.href} 
                className="group flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-slate-950 transition-all px-2 py-1"
              >
                <link.icon strokeWidth={1.5} className="w-0 h-4 text-brand-cyan opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-500 ease-in-out" />
                <span>{link.name}</span>
              </Link>
            ) : (
              <a 
                key={link.name} 
                href={link.href} 
                className="group flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-slate-950 transition-all px-2 py-1"
              >
                <link.icon strokeWidth={1.5} className="w-0 h-4 text-brand-cyan opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-500 ease-in-out" />
                <span>{link.name}</span>
              </a>
            )
          ))}
        </div>

        <div className="flex items-center gap-5">
          <Link to="/login" className="hidden sm:block text-[14px] font-bold text-slate-600 px-6 py-3 hover:text-slate-950 transition-all hover:scale-105 transition-transform">
            Login
          </Link>
          <Link to="/login?signup=true" className="bg-brand-cyan text-white px-6 py-2.5 rounded-lg text-[14px] font-bold hover:bg-cyan-500 transition-all shadow-md shadow-brand-cyan/20 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}
