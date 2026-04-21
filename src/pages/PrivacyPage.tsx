import LandingNavbar from "@/components/landing/LandingNavbar";
import FooterSection from "@/components/landing/FooterSection";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <LandingNavbar />
      <main className="container mx-auto px-6 lg:px-8 pt-40 pb-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-slate-500 mb-12">Last updated: April 21, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
          <section>
            <p>
              Sitha Health Technologies Pvt. Ltd. ("<strong>Sitha</strong>",
              "we", "our", "us") operates Sitha-ai, an AI-powered marketing
              platform for healthcare clinics available at sitha.ai and
              app.sitha.ai (the "<strong>Service</strong>"). This Privacy
              Policy explains, in plain language, what personal data we
              process, why, how long we keep it, who we share it with, and the
              rights you have under Indian law (including the Digital Personal
              Data Protection Act, 2023 — "<strong>DPDP Act</strong>") and the
              GDPR where applicable.
            </p>
            <p className="mt-3">
              This Policy applies to clinic owners, doctors, staff, and any
              end-user patient whose data is uploaded to the Service by a
              clinic (where Sitha acts as a Data Processor on behalf of the
              clinic, which is the Data Fiduciary/Controller).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Who is Responsible
            </h2>
            <p>
              <strong>Data Fiduciary / Controller (for clinic & doctor data):</strong>{" "}
              Sitha Health Technologies Pvt. Ltd., HSR Layout, Bangalore,
              Karnataka 560102, India. Grievance Officer: privacy@sitha.ai.
            </p>
            <p className="mt-3">
              <strong>Data Processor (for patient data uploaded by clinics):</strong>{" "}
              Sitha processes patient-identifiable content (e.g. photos,
              WhatsApp contact lists, treatment descriptions) strictly on the
              instructions of the clinic. The clinic remains the Data
              Fiduciary/Controller for such content and is responsible for
              obtaining patient consent before uploading.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Data We Collect
            </h2>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">
              2.1 Account & Clinic Information
            </h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Full name, email address, phone number, clinic name.</li>
              <li>
                Clinic profile: specialty, address, GST number, registration
                number, tone preferences, brand colours and logos.
              </li>
              <li>
                Doctor persona data: name, qualifications, photos, registration
                numbers (MCI / NMC / State Council), areas of expertise — used
                to personalize AI-generated content.
              </li>
              <li>
                Team members you invite: name, email, role.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">
              2.2 Content You Upload or Generate
            </h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Patient photographs (including before/after treatment images)
                uploaded for Vision AI post generation.
              </li>
              <li>
                Promotional copy, captions, hashtags, video clips, clinical
                stories.
              </li>
              <li>
                AI-generated drafts, rendered carousel images (stored in our
                AWS S3 object store), and scheduling metadata.
              </li>
              <li>
                Approval logs: which draft was approved, by whom, and when.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">
              2.3 Integration & Token Data
            </h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Meta (Instagram & Facebook) Graph API access tokens, Instagram
                Business Account IDs, Page IDs.
              </li>
              <li>
                WhatsApp Business Account (WABA) credentials, phone-number IDs,
                Meta-approved message template IDs.
              </li>
              <li>
                Patient contact lists you upload for bulk WhatsApp campaigns
                (phone number, first name, tags such as "recent visitor").
              </li>
              <li>OAuth tokens from Google (for sign-in only).</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">
              2.4 Usage & Device Data
            </h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                IP address, browser type, operating system, device identifiers.
              </li>
              <li>
                Pages and features accessed, clicks, session duration, feature
                timestamps.
              </li>
              <li>
                Error/crash reports, API request logs (with correlation IDs for
                debugging).
              </li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">
              2.5 Payment Data
            </h3>
            <p>
              Billing name, GST number, billing address, subscription plan,
              invoices. Card/UPI/net-banking details are collected and stored
              by our PCI-DSS-compliant payment processor{" "}
              <strong>Razorpay</strong>. Sitha only receives a transaction ID,
              payment status, and the last four digits of the instrument for
              reconciliation.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">
              2.6 Communication Data
            </h3>
            <p>
              Support emails, WhatsApp conversations with our bot and support
              team, feedback submissions. Recordings of sales or onboarding
              calls (with your prior consent) for quality purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. How We Use Your Data (Purposes & Legal Basis)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="text-left px-4 py-3 font-bold">Purpose</th>
                    <th className="text-left px-4 py-3 font-bold">Legal Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3">Provide the Service (generate, schedule, publish posts)</td>
                    <td className="px-4 py-3">Performance of contract</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">AI personalization using clinic/doctor persona</td>
                    <td className="px-4 py-3">Performance of contract; consent</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Send WhatsApp broadcasts via Meta-approved templates</td>
                    <td className="px-4 py-3">Clinic's instruction as Data Fiduciary</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Billing, fraud prevention, tax compliance</td>
                    <td className="px-4 py-3">Legal obligation; legitimate interest</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Improve Service quality (aggregated, de-identified usage)</td>
                    <td className="px-4 py-3">Legitimate interest</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Respond to support requests</td>
                    <td className="px-4 py-3">Performance of contract</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Product updates & marketing</td>
                    <td className="px-4 py-3">Consent (opt-out any time)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Patient Photographs & Sensitive Data
            </h2>
            <p className="mb-3">
              Before/after images, treatment photos, and any clinical imagery
              uploaded to Sitha are treated with elevated care:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Stored encrypted (AES-256 at rest) in a private AWS S3 bucket
                with signed-URL access only.
              </li>
              <li>
                Processed by our Vision AI pipeline solely to generate the
                marketing carousel you requested — never used to train any
                third-party foundation model.
              </li>
              <li>
                <strong>You must obtain written patient consent</strong> before
                uploading identifying images. Sitha provides a downloadable
                patient-consent template on request.
              </li>
              <li>
                Patient-identifying images are automatically purged 90 days
                after the post is published, unless you explicitly retain them
                in your Media Library.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. WhatsApp Campaigns & Patient Contact Lists
            </h2>
            <p className="mb-3">
              When you upload a patient phone list to run a bulk WhatsApp
              campaign:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                You warrant the contacts have opted-in to receive messages from
                your clinic, per Meta's WhatsApp Business Messaging Policy and
                India's unsolicited commercial communications regulations.
              </li>
              <li>
                Sitha stores these lists encrypted and uses them only to send
                the campaigns you schedule.
              </li>
              <li>
                Every broadcast automatically honours WhatsApp STOP / opt-out
                signals. Opt-outs are recorded and suppressed from all future
                campaigns for the same clinic.
              </li>
              <li>
                Delivery receipts, read receipts, and replies are logged to
                generate your campaign analytics.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. AI Model Providers — What We Share & Never Share
            </h2>
            <p className="mb-3">
              Sitha uses <strong>Google Gemini</strong> as its primary LLM, and
              may use <strong>OpenAI</strong> or <strong>Anthropic</strong>{" "}
              models as fallbacks. When generating content we send:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Clinic specialty, tone descriptors, selected template and
                generation parameters.
              </li>
              <li>The photo(s) you uploaded for that specific post.</li>
              <li>
                Prompt engineering context (our proprietary Clinical Guardrail
                system prompts).
              </li>
            </ul>
            <p className="mt-3 mb-3">
              <strong>What we do not share with model providers:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Patient names, phone numbers, or identifiable PHI.</li>
              <li>Your WhatsApp patient contact lists.</li>
              <li>Any data from your Practice Management Software — Sitha never integrates with PMS.</li>
              <li>Billing or payment information.</li>
            </ul>
            <p className="mt-3">
              All our AI vendors are contractually prohibited from using your
              inputs or outputs to train their foundation models (per
              enterprise data-processing terms).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Third-Party Processors (Sub-processors)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="text-left px-4 py-3 font-bold">Vendor</th>
                    <th className="text-left px-4 py-3 font-bold">Purpose</th>
                    <th className="text-left px-4 py-3 font-bold">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="px-4 py-3">Supabase</td><td className="px-4 py-3">Auth, database, row-level security</td><td className="px-4 py-3">Singapore (ap-south-1)</td></tr>
                  <tr><td className="px-4 py-3">AWS S3</td><td className="px-4 py-3">Media storage (photos, rendered carousels)</td><td className="px-4 py-3">Mumbai (ap-south-1)</td></tr>
                  <tr><td className="px-4 py-3">Google Gemini</td><td className="px-4 py-3">Primary LLM for content generation</td><td className="px-4 py-3">USA / EU</td></tr>
                  <tr><td className="px-4 py-3">Meta Platforms</td><td className="px-4 py-3">Instagram Graph API & WhatsApp Cloud API</td><td className="px-4 py-3">Global (Meta)</td></tr>
                  <tr><td className="px-4 py-3">Razorpay</td><td className="px-4 py-3">Payment processing (PCI-DSS)</td><td className="px-4 py-3">India</td></tr>
                  <tr><td className="px-4 py-3">Resend / SendGrid</td><td className="px-4 py-3">Transactional email</td><td className="px-4 py-3">USA</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              We provide 30 days' notice before adding a new material
              sub-processor. Current list is always available at
              privacy@sitha.ai.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Cookies, Local Storage & Analytics
            </h2>
            <p className="mb-3">We use three categories of browser storage:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Strictly necessary:</strong> Supabase session cookies
                to keep you signed in and to maintain CSRF protection. Cannot
                be disabled.
              </li>
              <li>
                <strong>Functional:</strong> UI preferences (theme, collapsed
                sidebars, recent clinics). Disable at any time in your browser.
              </li>
              <li>
                <strong>Analytics:</strong> Privacy-respecting product
                analytics to measure feature usage. We do not use third-party
                ad trackers or sell data to advertisers.
              </li>
            </ul>
            <p className="mt-3">
              We honour Global Privacy Control (GPC) and Do Not Track signals
              for analytics cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Data Retention
            </h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Account & clinic data:</strong> kept for the lifetime
                of the subscription.
              </li>
              <li>
                <strong>After cancellation:</strong> 90-day grace window, then
                permanent deletion (you can request immediate deletion
                anytime).
              </li>
              <li>
                <strong>Patient photographs:</strong> 90 days post-publication
                unless you actively retain them.
              </li>
              <li>
                <strong>WhatsApp opt-out records:</strong> retained
                indefinitely to honour unsubscribe commitments.
              </li>
              <li>
                <strong>Invoices and tax records:</strong> 8 years (Indian
                Income Tax Act requirement).
              </li>
              <li>
                <strong>Access logs:</strong> 180 days (security & audit).
              </li>
              <li>
                <strong>Backups:</strong> rolling 30-day encrypted backups;
                deletions propagate within the next backup cycle.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. Data Security
            </h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>TLS 1.2+ for data in transit.</li>
              <li>AES-256 encryption at rest for databases and media buckets.</li>
              <li>
                Supabase row-level security (RLS) enforces per-clinic data
                isolation at the database layer.
              </li>
              <li>
                Principle of least-privilege for employee access; all admin
                actions logged.
              </li>
              <li>
                Quarterly access reviews, annual third-party penetration tests,
                and a public security.txt for vulnerability disclosure.
              </li>
              <li>
                WhatsApp Business API tokens stored in a dedicated secrets
                vault separate from application databases.
              </li>
            </ul>
            <p className="mt-3">
              Report security issues to <strong>security@sitha.ai</strong>.
              Responsible disclosure rewarded under our bug-bounty program.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Data Breach Notification
            </h2>
            <p>
              If we detect a personal data breach that is likely to result in
              risk to the rights of data principals, we will notify the
              affected clinics and the Data Protection Board of India within
              72 hours, as required by the DPDP Act. Notice will describe the
              nature of the breach, data affected, likely consequences, and
              remedial actions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              12. Your Rights
            </h2>
            <p className="mb-3">
              Under the DPDP Act and applicable laws, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Access a copy of your personal data.</li>
              <li>Correct inaccurate or incomplete data.</li>
              <li>Request erasure ("right to be forgotten").</li>
              <li>
                Port your data in a portable, machine-readable format
                (JSON/CSV).
              </li>
              <li>Withdraw consent for optional processing.</li>
              <li>Nominate a person to exercise your rights in the event of incapacity.</li>
              <li>Object to processing based on legitimate interest.</li>
              <li>Lodge a complaint with the Data Protection Board of India.</li>
            </ul>
            <p className="mt-3">
              Email <strong>privacy@sitha.ai</strong> from your registered
              address to exercise any right. We respond within 30 days and do
              not charge a fee for reasonable requests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              13. International Data Transfers
            </h2>
            <p>
              Your primary data is stored in the AWS / Supabase
              Asia-Pacific region (Mumbai / Singapore). Some sub-processors
              (Google Gemini, Meta) process data in the US and EU. We rely on
              Standard Contractual Clauses, adequacy decisions, and vendor-
              specific data-processing agreements as applicable legal
              mechanisms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              14. Automated Decision-Making & Profiling
            </h2>
            <p>
              Sitha's AI generates marketing drafts but does not make any
              automated decision that produces a legal or similarly
              significant effect on you. Every post requires explicit human
              approval (via WhatsApp) before publication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              15. Children's Privacy
            </h2>
            <p>
              Sitha-ai is intended for business use by registered clinics and
              their staff, and is not directed at individuals under 18. Do not
              upload photographs of minors without their parent/guardian's
              explicit written consent. We delete any such content on notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              16. Marketing Communications
            </h2>
            <p>
              We send product updates, tips and offers to registered users. You
              can opt-out at any time via the unsubscribe link in any email or
              by emailing privacy@sitha.ai. Transactional emails (billing,
              security, service-critical alerts) cannot be opted out of while
              your account is active.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              17. Changes to this Policy
            </h2>
            <p>
              We may update this Policy to reflect changes in law or product
              functionality. Material changes will be notified via email and
              an in-app banner at least 15 days before taking effect.
              Continued use after the effective date constitutes acceptance.
              We maintain historic versions for transparency on request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              18. Contact & Grievance Officer
            </h2>
            <p>
              Privacy questions, rights requests, or grievances under Rule
              5(9) of the Information Technology (Intermediary Guidelines and
              Digital Media Ethics Code) Rules, 2021:
            </p>
            <div className="mt-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 not-prose">
              <p className="font-bold text-slate-900">Grievance Officer</p>
              <p className="text-slate-600 mt-1">
                Sitha Health Technologies Pvt. Ltd.<br />
                HSR Layout, Bangalore, Karnataka 560102, India<br />
                Email: <a href="mailto:privacy@sitha.ai" className="text-brand-cyan font-bold hover:underline">privacy@sitha.ai</a><br />
                Security: <a href="mailto:security@sitha.ai" className="text-brand-cyan font-bold hover:underline">security@sitha.ai</a><br />
                Response time: within 72 hours of receipt; resolution within 30 days.
              </p>
            </div>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
