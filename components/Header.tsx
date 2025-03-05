import Link from "next/link"
import { Button } from "@/components/ui/button"
import {  Clock } from "lucide-react"


export default function Header() {
  return (
    <div className="">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
            <Clock className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CodeTimer</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/app" className="text-sm font-medium hover:underline">
              App
            </Link>
            <Link href="#features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Button asChild size="sm">
              <Link href="/app">Get Started</Link>
            </Button>
          </div>
        </div>
 
     </header>
     </div>
     )
}


