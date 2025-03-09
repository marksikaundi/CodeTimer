"use client"

import { useState, useEffect } from "react"
import { Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TimerInfoBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once the component is mounted
  useEffect(() => {
    setIsClient(true)

    // Check if we've already dismissed this banner
    const dismissed = localStorage.getItem("timerInfoDismissed")
    if (dismissed === "true") {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    if (isClient) {
      localStorage.setItem("timerInfoDismissed", "true")
    }
  }

  if (!isVisible) return null

  return (
    <Card className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>New feature:</strong> Your timer now keeps running even when you switch tabs or your device goes to
            sleep. This ensures accurate tracking of your coding time, even when you&apos;re working in your code editor.
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </CardContent>
    </Card>
  )
}

