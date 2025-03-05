import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export default function Header() {
  return (
    <div className="">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold">CodeTimer</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/app" className="text-sm font-medium hover:underline">
              App
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:underline"
            >
              Features
            </Link>
            <Button asChild size="sm">
              <Link href="/app">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
