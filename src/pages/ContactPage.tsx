import LandingNavbar from "@/components/landing/LandingNavbar";
import FooterSection from "@/components/landing/FooterSection";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <LandingNavbar />
      <main className="container mx-auto px-8 pt-40 pb-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          Contact Us
        </h1>
        <p className="text-slate-500 mb-12">
          We're here to help you grow your clinic. Reach out to us anytime.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-brand-cyan" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Email Us
                </h3>
                <p className="text-slate-500">
                  For support, billing or queries:
                </p>
                <a
                  href="mailto:support@sitha.ai"
                  className="text-brand-cyan font-bold hover:underline"
                >
                  support@sitha.ai
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-brand-cyan" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Call Us
                </h3>
                <p className="text-slate-500">Available Mon-Fri, 10am - 6pm:</p>
                <p className="text-brand-cyan font-bold">+91 97XXXXXX92</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-brand-cyan" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Visit Us
                </h3>
                <p className="text-slate-500">Sitha Health Headquarters:</p>
                <p className="text-slate-900 font-medium">
                  HSR Layout, Bangalore, KA, India
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-[30px] border border-slate-100">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-cyan bg-white outline-none"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-cyan bg-white outline-none"
                  placeholder="you@clinic.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-cyan bg-white outline-none h-32"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-brand-cyan text-white py-4 rounded-xl font-bold hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-500/20"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
