import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, BarChart2, Bell, Check } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
          Track Your Coding Time Effortlessly
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Boost your productivity and maintain healthy coding habits with our
          intuitive time tracking tool.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button asChild size="lg" className="gap-2">
            <Link href="/app">
              Start Tracking Now <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-30"></div>
          <div className="relative bg-background rounded-lg border shadow-lg overflow-hidden">
            <Image
              src="/timer.png"
              alt="CodeTimer application screenshot"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-primary" />}
              title="Flexible Time Tracking"
              description="Set custom durations or track continuously. Get notified when it's time to take a break."
            />
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10 text-primary" />}
              title="Detailed Statistics"
              description="View your daily, weekly, and total coding time. Track your streak and stay motivated."
            />
            <FeatureCard
              icon={<Bell className="h-10 w-10 text-primary" />}
              title="Smart Notifications"
              description="Receive audio alerts when you reach your target time or after each hour of coding."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Developers Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="CodeTimer has helped me maintain a healthy work-life balance. The hourly reminders are a game-changer."
              author="Mark Sikaundi"
              role="Quality Assurance Engineer"
            />
            <TestimonialCard
              quote="I love seeing my coding stats improve over time. It's motivating to see my streak grow day by day."
              author="Sarah Johnson"
              role="Full Stack Developer"
            />
            <TestimonialCard
              quote="Simple, effective, and exactly what I needed to track my coding sessions without any distractions."
              author="Michael Rodriguez"
              role="Software Engineer"
            />
          </div>
        </div>
      </section>

      {/* Pricing/Features */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Everything You Need, For Free
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            CodeTimer includes all features at no cost. No premium tiers, no
            subscriptions.
          </p>
          <div className="bg-background rounded-lg border shadow-lg p-8 max-w-md mx-auto">
            <div className="flex justify-center mb-4">
              <span className="inline-block bg-primary/10 text-primary font-medium rounded-full px-4 py-1">
                Free Forever
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-6">All Features Included</h3>
            <ul className="space-y-4 text-left mb-8">
              <FeatureItem>Flexible time tracking</FeatureItem>
              <FeatureItem>Detailed statistics</FeatureItem>
              <FeatureItem>Audio notifications</FeatureItem>
              <FeatureItem>Dark mode support</FeatureItem>
              <FeatureItem>Progress tracking</FeatureItem>
              <FeatureItem>Custom time presets</FeatureItem>
            </ul>
            <Button asChild size="lg" className="w-full">
              <Link href="/app">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-white/90 text-xl max-w-2xl mx-auto mb-8">
              Join thousands of developers who use CodeTimer to track their
              coding sessions and improve their habits.
            </p>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/app">
                Start Tracking Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">CodeTimer</span>
            </div>
            <div className="flex gap-8">
              <Link
                href="/app"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                App
              </Link>
              <Link
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
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
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-background rounded-lg border p-6 transition-all hover:shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="bg-background rounded-lg border p-6 transition-all hover:shadow-md">
      <div className="mb-4 text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 opacity-50"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
        </svg>
      </div>
      <p className="mb-4 italic">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}
