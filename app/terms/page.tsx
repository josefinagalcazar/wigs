export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Terms of Service</h1>
      <p className="text-[#6b6b6b] text-sm mb-10">Last updated: June 30, 2026</p>

      <div className="prose prose-neutral max-w-none space-y-8 text-[#333] text-[15px] leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Agreement to Terms</h2>
          <p>By submitting a service request through our website, you agree to these Terms of Service. If you do not agree, please do not use our service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Our Services</h2>
          <p>Wig Repair Studio provides professional wig repair and custom new wig services. All pricing shown on our website is a starting estimate — your final quote is based on a photo review of your wig and the specific work required.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Quotes & Pricing</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All prices listed are starting prices. Final pricing is confirmed after we review your submitted photos.</li>
            <li>We will send you a quote before any work begins. Work only proceeds after you approve the quote.</li>
            <li>Additional issues discovered during repair may result in revised pricing. We will notify you before proceeding.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Sending Your Wig</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are responsible for safely packaging and shipping your wig to us. We recommend using tracked shipping.</li>
            <li>We are not responsible for items lost or damaged in transit to us.</li>
            <li>We will return your wig using a reliable carrier. Return shipping costs will be communicated in advance.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Turnaround Time</h2>
          <p>Estimated turnaround times are provided as a guideline. Actual completion time may vary depending on the complexity of the repair and current workload. We will keep you informed of progress.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Payments</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment is due upon completion of service, before your wig is returned.</li>
            <li>We accept payment methods communicated at the time of your quote.</li>
            <li>Work will not be released until payment is received in full.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Refunds & Satisfaction</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>If you are not satisfied with our work, contact us within 7 days of receiving your wig and we will work to make it right.</li>
            <li>Refunds are evaluated on a case-by-case basis. We stand behind our craftsmanship.</li>
            <li>Custom new wigs are non-refundable once production has begun, as they are made to your specifications.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Your Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate information when submitting your request.</li>
            <li>Respond to our communications in a timely manner.</li>
            <li>Ensure your wig is yours to submit for service — we do not accept stolen or improperly obtained items.</li>
            <li>Unclaimed wigs (no response after 30 days of completion) may be donated or disposed of at our discretion after written notice.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Limitation of Liability</h2>
          <p>Our liability is limited to the cost of the service you paid for. We are not responsible for pre-existing damage, sentimental value, or any indirect losses. We take great care with every wig, but some conditions (extreme damage, delicate materials) carry inherent risk that we will communicate upfront.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Changes to These Terms</h2>
          <p>We may update these Terms from time to time. The date at the top reflects the latest revision. Continued use of our service after changes constitutes acceptance.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-3">Contact</h2>
          <p>Questions about these Terms? Reach us through the Contact page on our website.</p>
        </section>

      </div>
    </main>
  );
}
