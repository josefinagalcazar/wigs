export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Privacy Policy</h1>
      <p className="text-[#6b6b6b] text-sm mb-10">Last updated: June 30, 2026</p>

      <div className="prose prose-neutral max-w-none space-y-8 text-[#333] text-[15px] leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Who We Are</h2>
          <p>Wig Repair Studio ("we," "us," or "our") provides wig repair and new wig order services. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website at wigs-self.vercel.app.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Information We Collect</h2>
          <p>When you submit a repair or new wig request, we collect:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Your name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>City and state</li>
            <li>Photos of your wig</li>
            <li>Details about the service you need</li>
            <li>Any notes you include with your request</li>
          </ul>
          <p className="mt-3">We do not collect payment card numbers directly. Payments are discussed and arranged separately.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To process and fulfill your repair or new wig order</li>
            <li>To send you order confirmations and status updates by email</li>
            <li>To contact you by phone or email with questions about your order</li>
            <li>To track the history and status of your order</li>
          </ul>
          <p className="mt-3">We do not use your information for marketing, advertising, or sell it to third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Photos You Upload</h2>
          <p>Photos you submit are stored securely and used only to assess and complete your service request. Photos are accessible only to our studio team via private, time-limited links. We do not post your photos publicly without your permission.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Third-Party Services</h2>
          <p>We use the following services to operate our business:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Supabase</strong> — Stores your order data and photos in a secure, encrypted database hosted in the United States.</li>
            <li><strong>Resend</strong> — Sends transactional emails (order confirmations, status updates). Your name and email address are shared with Resend solely to deliver these emails.</li>
            <li><strong>Vercel</strong> — Hosts our website.</li>
          </ul>
          <p className="mt-3">These providers are contractually required to protect your data and may not use it for their own purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Cookies & Session Data</h2>
          <p>Our website uses a session cookie to keep studio staff logged in to the admin panel. We do not use tracking cookies, advertising cookies, or analytics tools that track your personal behavior.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">How We Protect Your Data</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>All data is transmitted over encrypted HTTPS connections</li>
            <li>Your data is stored in a secure database with row-level access controls</li>
            <li>Only authorized studio staff can view your order information</li>
            <li>File uploads are validated and stored in private storage with access controls</li>
            <li>We enforce rate limiting and brute-force protection on all login systems</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Data Retention</h2>
          <p>We retain your order information for as long as needed to complete your service and for reasonable record-keeping purposes (typically 2 years). Photos are retained for the duration of your service and may be retained briefly afterward for quality assurance.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Request a copy of the personal data we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal data</li>
          </ul>
          <p className="mt-3">To exercise any of these rights, contact us using the information below.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Contact Us</h2>
          <p>If you have questions about this Privacy Policy or how we handle your data, please contact us through the Contact page on our website.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. The date at the top of this page reflects when it was last revised. Continued use of our service after changes constitutes acceptance of the updated policy.</p>
        </section>

      </div>
    </main>
  );
}
