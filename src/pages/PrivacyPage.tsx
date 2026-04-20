import React from 'react'
import LandingNavbar from '@/components/landing/LandingNavbar'
import FooterSection from '@/components/landing/FooterSection'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <LandingNavbar />
      <main className="container mx-auto px-8 pt-40 pb-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        <p className="text-slate-500 mb-12">Last updated: April 19, 2026</p>
        
        <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, such as your clinic name, contact information, professional credentials of doctors, and Instagram account details. We also collect content you generate using our AI services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, including to personalize content generation for your clinic's specialty and tone. We use your Instagram credentials strictly to facilitate automated posting as requested by you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Sharing and AI Models</h2>
            <p>
              To provide our AI generation features, we may share anonymized clinic profiles with third-party language model providers (like OpenAI or Anthropic). No patient data or private clinical records are shared with these providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
            <p>
              We take reasonable measures to protect your information from loss, theft, misuse, and unauthorized access. All payment information is handled securely by our payment processor, Razorpay.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at support@sitha.ai.
            </p>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}
