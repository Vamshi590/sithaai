import LandingNavbar from "@/components/landing/LandingNavbar";
import FooterSection from "@/components/landing/FooterSection";

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <LandingNavbar />
      <main className="container mx-auto px-8 pt-40 pb-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          Refund and Cancellation Policy
        </h1>
        <p className="text-slate-500 mb-12">Last updated: April 19, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Cancellation
            </h2>
            <p>
              You can cancel your Sitha-ai subscription at any time from your
              account settings. Upon cancellation, your subscription will remain
              active until the end of the current billing period, and you will
              not be charged again.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Refunds
            </h2>
            <p>
              We offer a 7-day money-back guarantee for first-time subscribers.
              If you are not satisfied with our service, you can request a full
              refund within the first 7 days of your initial subscription.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Processing Refunds
            </h2>
            <p>
              Refunds will be processed back to the original payment method
              within 5-7 business days of the request approval.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Non-Refundable Situations
            </h2>
            <p>
              Refunds are not provided for partial months of service or for
              cancellations made after the initial 7-day period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Contact for Refunds
            </h2>
            <p>
              To request a refund or for any billing-related queries, please
              email us at billing@sitha.ai.
            </p>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
