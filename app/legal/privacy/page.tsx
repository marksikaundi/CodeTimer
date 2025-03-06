import Link from "next/link"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CodeTimer</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/app" className="text-sm font-medium hover:underline">
              App
            </Link>
            <Button asChild size="sm">
              <Link href="/app">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">Last updated: March 6, 2025</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            At CodeTimer, we respect your privacy and are committed to protecting your personal data. This Privacy
            Policy explains how we collect, use, and safeguard your information when you use our website and application
            (&quot;Service&quot;).
          </p>
          <p>
            We use your data to provide and improve the Service. By using the Service, you agree to the collection and
            use of information in accordance with this policy.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information Collection</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to
            you.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Local Storage Data</h3>
          <p>
            CodeTimer primarily stores your usage data locally on your device using browser local storage. This
            includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Time tracking data</li>
            <li>Session history</li>
            <li>User preferences (such as dark mode settings)</li>
            <li>Timer configurations</li>
          </ul>
          <p>
            This data remains on your device and is not transmitted to our servers unless you explicitly choose to
            enable cloud synchronization features (if available).
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Usage Data</h3>
          <p>We may collect anonymous usage data about how you interact with our Service. This may include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your browser type and version</li>
            <li>Pages of our Service that you visit</li>
            <li>The time and date of your visit</li>
            <li>Features you use within the Service</li>
          </ul>
          <p>This data is used for analytics purposes to improve our Service and does not personally identify you.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Use of Data</h2>
          <p>CodeTimer uses the collected data for various purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet
            or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
            protect your personal data, we cannot guarantee its absolute security.
          </p>
          <p>Since most of your data is stored locally on your device, you can enhance security by:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Using a secure browser</li>
            <li>Keeping your browser updated</li>
            <li>Not sharing access to your device with untrusted parties</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cookies Policy</h2>
          <p>
            Cookies are files with a small amount of data that may include an anonymous unique identifier. CodeTimer
            uses cookies and similar tracking technologies to track activity on our Service and hold certain
            information.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
            you do not accept cookies, you may not be able to use some portions of our Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Data Rights</h2>
          <p>You have the following data protection rights:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to access, update or delete the information we have on you</li>
            <li>
              The right of rectification - the right to have your information corrected if it is inaccurate or
              incomplete
            </li>
            <li>The right to object - the right to object to our processing of your personal data</li>
            <li>
              The right of restriction - the right to request that we restrict the processing of your personal
              information
            </li>
            <li>
              The right to data portability - the right to be provided with a copy of your personal data in a
              structured, machine-readable format
            </li>
            <li>
              The right to withdraw consent - the right to withdraw your consent at any time where we relied on your
              consent to process your personal information
            </li>
          </ul>
          <p>
            Since most data is stored locally on your device, you can exercise many of these rights by clearing your
            browser&quot;s local storage or by using the controls within the application.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the &quot;Last updated&quot; date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
            are effective when they are posted on this page.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@codetimer.app.</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">CodeTimer</span>
            </div>
            <div className="flex gap-8">
              <Link href="/app" className="text-sm text-muted-foreground hover:text-foreground">
                App
              </Link>
              <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CodeTimer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

