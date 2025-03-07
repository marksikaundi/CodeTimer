"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    // Check localStorage first
    const savedDarkMode = localStorage.getItem("darkMode")
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === "true")
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }

    // Apply dark mode if needed
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev
      if (newValue) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      localStorage.setItem("darkMode", newValue.toString())
      return newValue
    })
  }

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
            <Link href="/view-badges" className="text-sm font-medium hover:underline">
            Badges
            </Link>
            <Button asChild size="sm">
              <Link href="/tasks">Manage Tasks</Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode" className="ml-2">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}

