"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Code, Users, Heart, Zap, ArrowRight, Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10 dark:from-primary/5 dark:to-blue-600/5" />
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-primary">CodeTimer</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We&apos;re on a mission to help developers build better coding habits and boost productivity through mindful
              time tracking.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/app">
                  Try CodeTimer <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="#our-story">Our Story</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-muted-foreground">
              At CodeTimer, we believe in the power of focused coding sessions and healthy work habits. Our platform is
              built on these core principles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<Clock className="h-10 w-10 text-blue-500" />}
              title="Mindful Coding"
              description="We encourage developers to be intentional about their time, focusing deeply during coding sessions."
            />
            <ValueCard
              icon={<Zap className="h-10 w-10 text-yellow-500" />}
              title="Productivity"
              description="Our tools are designed to boost your efficiency without sacrificing code quality or well-being."
            />
            <ValueCard
              icon={<Heart className="h-10 w-10 text-red-500" />}
              title="Developer Health"
              description="We promote healthy coding habits with regular breaks and session limits to prevent burnout."
            />
            <ValueCard
              icon={<Users className="h-10 w-10 text-green-500" />}
              title="Community"
              description="We're building a community of developers who value quality time spent coding."
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4">
                  <p>
                    CodeTimer began in 2025 when a group of developers noticed they were losing track of time during
                    coding sessions, leading to burnout and decreased productivity.
                  </p>
                  <p>
                    We set out to create a simple yet powerful tool that would help developers track their coding time,
                    maintain healthy work habits, and improve their focus.
                  </p>
                  <p>
                    What started as a personal project has grown into a platform used by developers around the world who
                    want to be more intentional about their coding time.
                  </p>
                  <p>
                    Today, CodeTimer continues to evolve with new features like task tracking, achievement badges, and
                    detailed analytics—all designed to help you become a more effective and balanced developer.
                  </p>
                </div>
                <div className="mt-8">
                  <Tabs defaultValue="2023">
                    <TabsList>
                      <TabsTrigger value="2023">2024</TabsTrigger>
                      <TabsTrigger value="2024">2025</TabsTrigger>
                      <TabsTrigger value="future">Future</TabsTrigger>
                    </TabsList>
                    <TabsContent value="2023" className="mt-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">The Beginning</h3>
                        <p className="text-sm text-muted-foreground">
                          CodeTimer was created as a simple timer for tracking coding sessions. The first version
                          included basic time tracking and notifications.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="2024" className="mt-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Growth & Features</h3>
                        <p className="text-sm text-muted-foreground">
                          We expanded with task tracking, analytics dashboard, achievement badges, and a growing
                          community of developers focused on productivity.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="future" className="mt-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Looking Ahead</h3>
                        <p className="text-sm text-muted-foreground">
                          Our roadmap includes team collaboration features, integrations with popular development tools,
                          and AI-powered productivity insights.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-2xl overflow-hidden flex items-center justify-center">
                  <Code className="h-24 w-24 text-primary/40" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-background rounded-lg shadow-xl p-4 border">
                  <div className="flex items-center gap-3">
                    <Clock className="h-10 w-10 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Since 2024</p>
                      <p className="text-xs text-muted-foreground">Helping developers code better</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">
              We&apos;re a passionate group of developers and designers committed to creating tools that improve the coding
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TeamMember
              name="Mark Sikaundi"
              role="Founder & Software Engineer"
              bio="Full-stack developer with a passion for developer tools and productivity systems."
              imageSrc="/placeholder.svg?height=400&width=400"
              socialLinks={{
                twitter: "#",
                github: "#",
                linkedin: "#",
              }}
            />
            {/* <TeamMember
              name="Sarah Johnson"
              role="UX/UI Designer"
              bio="Designer focused on creating intuitive, beautiful interfaces that enhance productivity."
              imageSrc="/placeholder.svg?height=400&width=400"
              socialLinks={{
                twitter: "#",
                github: "#",
                linkedin: "#",
              }}
            />
            <TeamMember
              name="Michael Rodriguez"
              role="Frontend Engineer"
              bio="React specialist with expertise in building responsive, accessible web applications."
              imageSrc="/placeholder.svg?height=400&width=400"
              socialLinks={{
                twitter: "#",
                github: "#",
                linkedin: "#",
              }}
            /> */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCard number="10K+" label="Active Users" />
              <StatCard number="1M+" label="Coding Hours Tracked" />
              <StatCard number="500K+" label="Tasks Completed" />
              <StatCard number="50K+" label="Badges Earned" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Coding Productivity?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of developers who use CodeTimer to track their coding sessions and improve their habits.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/app">
                Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  socialLinks: SocialLinks;
}

function TeamMember({ name, role, bio, imageSrc, socialLinks }: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden h-full">
        <div className="aspect-square relative">
          <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-primary font-medium text-sm mb-2">{role}</p>
          <p className="text-muted-foreground text-sm mb-4">{bio}</p>
          <div className="flex gap-3">
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {socialLinks.github && (
              <a href={socialLinks.github} className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{number}</p>
      <p className="text-muted-foreground">{label}</p>
    </motion.div>
  )
}

