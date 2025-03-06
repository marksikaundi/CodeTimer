import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen">
      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">Last updated: March 6, 2025</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to CodeTimer. These Terms of Service govern your use of our
            website and application located at codetimer.app (the
            &quot;Service&quot;). By accessing or using the Service, you agree
            to be bound by these Terms. If you disagree with any part of the
            terms, you may not access the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. Use of the Service
          </h2>
          <p>
            CodeTimer provides a time tracking tool for developers. You are
            responsible for maintaining the confidentiality of your account and
            for all activities that occur under your account. You agree to
            immediately notify CodeTimer of any unauthorized use of your account
            or any other breach of security.
          </p>
          <p>You agree not to use the Service:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              In any way that violates any applicable national or international
              law or regulation.
            </li>
            <li>
              To transmit, or procure the sending of, any advertising or
              promotional material, including any &quot;junk mail&quot;,
              &quot;chain letter,&quot; &quot;spam,&quot; or any other similar
              solicitation.
            </li>
            <li>
              To impersonate or attempt to impersonate CodeTimer, a CodeTimer
              employee, another user, or any other person or entity.
            </li>
            <li>
              To engage in any other conduct that restricts or inhibits
              anyone&quot;s use or enjoyment of the Service.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. Intellectual Property
          </h2>
          <p>
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of CodeTimer and its
            licensors. The Service is protected by copyright, trademark, and
            other laws of both the United States and foreign countries. Our
            trademarks and trade dress may not be used in connection with any
            product or service without the prior written consent of CodeTimer.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Data</h2>
          <p>
            We respect the privacy of our users. Please refer to our{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            for information on how we collect, use, and disclose personal
            information from our users.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Limitation of Liability
          </h2>
          <p>
            In no event shall CodeTimer, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from your access to or use of or
            inability to access or use the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Changes to Terms
          </h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will try to
            provide at least 30 days&quot; notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at
            support@codetimer.app.
          </p>
        </div>
      </main>
    </div>
  );
}
