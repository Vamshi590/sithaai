import LandingNavbar from "@/components/landing/LandingNavbar";
import FooterSection from "@/components/landing/FooterSection";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <LandingNavbar />
      <main className="container mx-auto px-8 pt-40 pb-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          Shipping and Delivery Policy
        </h1>
        <p className="text-slate-500 mb-12">Last updated: April 19, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Digital Delivery
            </h2>
            <p>
              Sitha-ai is a Software-as-a-Service (SaaS) platform. No physical
              products are shipped. All services and features are delivered
              digitally through our web application at app.sitha.ai.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Activation Timeline
            </h2>
            <p>
              Upon successful payment through Razorpay, your account features
              will be activated immediately or within 24 hours. You will receive
              a confirmation email once your subscription is active.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Access Issues
            </h2>
            <p>
              If you experience any issues accessing your digital dashboard
              after a successful payment, please contact our support team at
              support@sitha.ai with your transaction details.
            </p>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
