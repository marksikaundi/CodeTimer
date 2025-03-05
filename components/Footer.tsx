import React from 'react'
import { Clock } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Link href="/">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">CodeTimer</span>
              </Link>
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
  )
}
