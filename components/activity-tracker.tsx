"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { ActivityStats } from "@/components/activity-stats"
import { formatTime } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { BarChart2 } from "lucide-react"

export default function ActivityTracker() {
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(0)
  const [targetTime, setTargetTime] = useState<number | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sessions, setSessions] = useState<{ date: string; duration: number }[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const lastNotificationRef = useRef<number>(0)

  // Load saved data from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem("codingTime")
    const savedSessions = localStorage.getItem("codingSessions")
    const savedSoundEnabled = localStorage.getItem("soundEnabled")
    const savedDarkMode = localStorage.getItem("darkMode")
    const savedTargetTime = localStorage.getItem("targetTime")

    if (savedTime) setTime(Number.parseInt(savedTime))
    if (savedSessions) setSessions(JSON.parse(savedSessions))
    if (savedSoundEnabled) setSoundEnabled(savedSoundEnabled === "true")
    if (savedTargetTime && savedTargetTime !== "null") setTargetTime(Number.parseInt(savedTargetTime))
    if (savedDarkMode) {
      const isDark = savedDarkMode === "true"
      setIsDarkMode(isDark)
      if (isDark) {
        document.documentElement.classList.add("dark")
      }
    }

    // Initialize Web Audio API
    if (typeof window !== "undefined") {
      try {
        // AudioContext is created lazily on user interaction to comply with autoplay policies
        audioContextRef.current = null
      } catch {
        console.error("Web Audio API is not supported in this browser")
      }
    }
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("codingTime", time.toString())
    localStorage.setItem("codingSessions", JSON.stringify(sessions))
    localStorage.setItem("soundEnabled", soundEnabled.toString())
    localStorage.setItem("darkMode", isDarkMode.toString())
    localStorage.setItem("targetTime", targetTime?.toString() || "null")
  }, [time, sessions, soundEnabled, isDarkMode, targetTime])

  // Timer logic
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1

          // Check if we need to play a notification sound (every 60 minutes)
          if (soundEnabled && newTime > 0 && newTime % 3600 === 0) {
            // Avoid duplicate notifications within 10 seconds
            const now = Date.now()
            if (now - lastNotificationRef.current > 10000) {
              playNotificationSound()
              lastNotificationRef.current = now
            }
          }

          // Check if we've reached the target time
          if (targetTime !== null && newTime >= targetTime) {
            // Stop the timer and play notification
            if (timerRef.current) {
              clearInterval(timerRef.current)
            }
            playNotificationSound()
            setIsActive(false)

            // Save the session
            saveSession(newTime)
          }

          return newTime
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isActive, soundEnabled, targetTime])


  const startTimer = () => {
    setIsActive(true)
  }

  const pauseTimer = () => {
    setIsActive(false)
    saveSession(time)
  }

  const saveSession = (duration: number) => {
    // If we've tracked some time, save this session
    if (duration > 0) {
      const today = new Date().toISOString().split("T")[0]
      const existingSessionIndex = sessions.findIndex((s) => s.date === today)

      if (existingSessionIndex >= 0) {
        // Update existing session for today
        const updatedSessions = [...sessions]
        updatedSessions[existingSessionIndex].duration += duration
        setSessions(updatedSessions)
      } else {
        // Create new session for today
        setSessions([...sessions, { date: today, duration }])
      }
    }
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(0)
  }

  const playNotificationSound = () => {
    if (!soundEnabled) return

    try {
      // Create AudioContext on demand (needed for browser autoplay policies)
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      }

      const context = audioContextRef.current

      // Create an oscillator (sound generator)
      const oscillator = context.createOscillator()
      const gainNode = context.createGain()

      // Connect the oscillator to the gain node and the gain node to the destination
      oscillator.connect(gainNode)
      gainNode.connect(context.destination)

      // Set the oscillator type and frequency
      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(880, context.currentTime) // A5 note

      // Set the gain (volume)
      gainNode.gain.setValueAtTime(0.5, context.currentTime)

      // Schedule the sound to start and stop
      oscillator.start(context.currentTime)
      oscillator.stop(context.currentTime + 0.5) // Sound duration: 0.5 seconds

      // Create a second beep after a short delay
      setTimeout(() => {
        const oscillator2 = context.createOscillator()
        oscillator2.connect(gainNode)
        oscillator2.type = "sine"
        oscillator2.frequency.setValueAtTime(1046.5, context.currentTime) // C6 note
        oscillator2.start(context.currentTime)
        oscillator2.stop(context.currentTime + 0.5)
      }, 700)
    } catch (error) {
      console.error("Error playing notification sound:", error)
      // Fallback to browser alert
      if (targetTime !== null && time >= targetTime) {
        window.alert("Time's up! You've reached your target coding time.")
      } else {
        if (window.confirm("You've been coding for 60 minutes! Take a break?")) {
          pauseTimer()
        }
      }
    }
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  // Test notification sound
  const testSound = () => {
    playNotificationSound()
  }

  // Handle target time selection
  const handleTargetTimeChange = (value: string) => {
    if (value === "none") {
      setTargetTime(null)
    } else {
      // Convert hours to seconds
      const hours = Number.parseFloat(value)
      setTargetTime(Math.floor(hours * 3600))
    }
  }

  // Calculate progress percentage
  const calculateProgress = () => {
    if (targetTime === null || targetTime === 0) return 0
    const progress = (time / targetTime) * 100
    return Math.min(progress, 100)
  }

  return (
    <div className={`max-w-4xl mx-auto`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Code Time Tracker</h1>
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          <BarChart2 className="h-4 w-4" />
          Dashboard
        </Link>
      </div>

      <Tabs defaultValue="timer" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timer">Timer</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="timer">
          <Card>
            <CardHeader>
              <CardTitle>Coding Timer</CardTitle>
              <CardDescription>
                Track how long you&apos;ve been coding. You&apos;ll be notified after every hour of activity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="text-6xl font-mono font-bold my-6">{formatTime(time)}</div>

                {targetTime !== null && (
                  <div className="w-full mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>
                        {formatTime(time)} / {formatTime(targetTime)}
                      </span>
                    </div>
                    <Progress value={calculateProgress()} className="h-2" />
                  </div>
                )}

                <div className="w-full mb-6">
                  <Label className="mb-2 block">Set Timer Duration</Label>
                  <RadioGroup
                    defaultValue={targetTime ? (targetTime / 3600).toString() : "none"}
                    onValueChange={handleTargetTimeChange}
                    className="flex flex-wrap gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">Continuous</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="r1" />
                      <Label htmlFor="r1">01:00:00</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1.5" id="r1.5" />
                      <Label htmlFor="r1.5">01:30:00</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="r2" />
                      <Label htmlFor="r2">02:00:00</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-4 mb-6">
                  {!isActive ? (
                    <Button onClick={startTimer} className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={pauseTimer} variant="secondary" className="flex items-center gap-2">
                      <Pause className="h-4 w-4" />
                      Pause
                    </Button>
                  )}

                  <Button onClick={resetTimer} variant="outline" className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <Switch id="sound-mode" checked={soundEnabled} onCheckedChange={toggleSound} />
                  <Label htmlFor="sound-mode">Sound Notifications</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={testSound} disabled={!soundEnabled}>
                          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Test sound</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                {isActive
                  ? targetTime !== null
                    ? `Timer will stop after ${formatTime(targetTime)}.`
                    : "Timer is running. You'll be notified after each hour of activity."
                  : "Press Start when you begin coding."}
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <ActivityStats sessions={sessions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

