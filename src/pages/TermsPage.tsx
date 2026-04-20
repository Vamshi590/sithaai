import React from 'react'
import LandingNavbar from '@/components/landing/LandingNavbar'
import FooterSection from '@/components/landing/FooterSection'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <LandingNavbar />
      <main className="container mx-auto px-8 pt-40 pb-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Terms and Conditions</h1>
        <p className="text-slate-500 mb-12">Last updated: April 19, 2026</p>
        
        <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Sitha-ai, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
            <p>
              Sitha-ai provides an AI-powered marketing platform specifically designed for healthcare clinics. Our services include content generation, scheduling, and automated posting to social media platforms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Responsibilities</h2>
            <p>
              Users are responsible for reviewing all AI-generated content for medical accuracy and professional compliance before posting. Sitha-ai is a tool to assist in content creation and does not provide medical or legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Subscriptions and Payments</h2>
            <p>
              Payments are processed via Razorpay. Subscriptions are billed on a monthly or annual basis. You agree to provide current, complete, and accurate purchase and account information for all purchases made via our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h2>
            <p>
              Sitha-ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Governing Law</h2>
            <p>
              These terms shall be governed by and defined following the laws of India. Sitha Health and yourself irrevocably consent that the courts of Bangalore shall have exclusive jurisdiction to resolve any dispute which may arise.
            </p>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}
