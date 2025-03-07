"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Award, Star, Zap, Trophy, Target, Calendar, Flame, CheckSquare, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { formatDate } from "@/lib/utils"
import confetti from "canvas-confetti"
import { SVGProps } from "react";


interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  date: string
}

interface UserBadge {
  id: string
  name: string
  description: string
  icon: string
  color: "green" | "blue" | "purple" | "yellow" | "orange" | "red" | "indigo" | "pink"
  dateEarned: string
  category: "tasks" | "streaks" | "milestones"
  isNew?: boolean
}

export default function BadgesPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [sessions, setSessions] = useState<{ date: string; duration: number }[]>([])
  const [badges, setBadges] = useState<UserBadge[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  // Load data from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("codingTasks")
    const savedSessions = localStorage.getItem("codingSessions")
    const savedBadges = localStorage.getItem("codingBadges")

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }

    if (savedSessions) {
      setSessions(JSON.parse(savedSessions))
    }

    if (savedBadges) {
      setBadges(JSON.parse(savedBadges))
    } else {
      // Initialize with empty badges array
      localStorage.setItem("codingBadges", JSON.stringify([]))
    }

    setIsLoading(false)
  }, [])

  // Check for new badges when tasks or sessions change
  useEffect(() => {
    if (isLoading) return

    const newBadges = checkForNewBadges(tasks, sessions, badges)

    if (newBadges.length > 0) {
      const updatedBadges = [...badges, ...newBadges]
      setBadges(updatedBadges)
      localStorage.setItem("codingBadges", JSON.stringify(updatedBadges))

      // Trigger confetti for new badges
      if (typeof window !== "undefined") {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }
  }, [tasks, sessions, isLoading])

  // Filter badges based on active tab
  const filteredBadges = badges.filter((badge) => {
    if (activeTab === "all") return true
    return badge.category === activeTab
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading badges...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Award className="h-8 w-8 text-yellow-500" />
              Your Achievement Badges
            </h1>
            <p className="text-muted-foreground">Collect badges by completing tasks and reaching milestones</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Link href="/tasks">
              <Button variant="outline" size="sm">
                <CheckSquare className="h-4 w-4 mr-2" /> Tasks
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" /> Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Badge Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Badges</p>
                  <p className="text-2xl font-bold">{badges.length}</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Task Badges</p>
                  <p className="text-2xl font-bold">{badges.filter((b) => b.category === "tasks").length}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <CheckSquare className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Streak Badges</p>
                  <p className="text-2xl font-bold">{badges.filter((b) => b.category === "streaks").length}</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                  <Flame className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badge Categories */}
        <Tabs defaultValue="all" className="w-full mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Badges</TabsTrigger>
            <TabsTrigger value="tasks">Task Badges</TabsTrigger>
            <TabsTrigger value="streaks">Streak Badges</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Badge Grid */}
        {filteredBadges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <Award className="h-16 w-16 text-muted-foreground/30" />
              <h3 className="text-xl font-semibold">No Badges Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Complete tasks, maintain coding streaks, and reach milestones to earn badges.
              </p>
              <Button asChild className="mt-4">
                <Link href="/tasks">Start Completing Tasks</Link>
              </Button>
            </div>
          </Card>
        )}

        {/* Locked Badges */}
        {badges.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Badges to Unlock</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getLockedBadges(badges).map((badge) => (
                <LockedBadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface BadgeCardProps {
  badge: UserBadge
}

function BadgeCard({ badge }: BadgeCardProps) {
  // Animation variants for the badge card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Get the icon component based on the badge icon string
  const IconComponent = getBadgeIcon(badge.icon)

  return (
    <motion.div initial={badge.isNew ? "hidden" : "visible"} animate="visible" variants={cardVariants}>
      <Card className={`overflow-hidden ${badge.isNew ? "ring-2 ring-yellow-400 dark:ring-yellow-500" : ""}`}>
        <div className={`h-2 w-full ${getBadgeColorClass(badge.color)}`} />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-full ${getBadgeColorClass(badge.color, true)}`}>
              <IconComponent className={`h-6 w-6 ${getBadgeTextColorClass(badge.color)}`} />
            </div>
            {badge.isNew && (
              <Badge
                variant="outline"
                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-300"
              >
                New!
              </Badge>
            )}
          </div>
          <CardTitle className="mt-4">{badge.name}</CardTitle>
          <CardDescription>{badge.description}</CardDescription>
        </CardHeader>
        <CardFooter className="text-xs text-muted-foreground pt-0">Earned on {formatDate(badge.dateEarned)}</CardFooter>
      </Card>
    </motion.div>
  )
}

function LockedBadgeCard({ badge }: { badge: UserBadge }) {
  // Get the icon component based on the badge icon string
  const IconComponent = getBadgeIcon(badge.icon)

  return (
    <Card className="overflow-hidden opacity-70 grayscale">
      <div className="h-2 w-full bg-gray-300 dark:bg-gray-700" />
      <CardHeader className="pb-2">
        <div className="p-3 rounded-full bg-gray-200 dark:bg-gray-800">
          <IconComponent className="h-6 w-6 text-gray-500" />
        </div>
        <CardTitle className="mt-4">{badge.name}</CardTitle>
        <CardDescription>{badge.description}</CardDescription>
      </CardHeader>
      <CardFooter className="text-xs text-muted-foreground pt-0 flex justify-between items-center">
        <span>Locked</span>
        <Lock className="h-4 w-4" />
      </CardFooter>
    </Card>
  )
}

// Helper function to get badge icon component
function getBadgeIcon(iconName: string) {
  const icons = {
    award: Award,
    star: Star,
    zap: Zap,
    trophy: Trophy,
    target: Target,
    calendar: Calendar,
    flame: Flame,
    "check-square": CheckSquare,
    // Add more icons as needed
  }

  return icons[iconName as keyof typeof icons] || Award
}

// Helper function to get badge background color class
const colorMap = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  indigo: "bg-indigo-500",
  pink: "bg-pink-500",
}

function getBadgeColorClass(color: keyof typeof colorMap, isBg = false) {
  const bgColorMap = {
    blue: "bg-blue-100 dark:bg-blue-900/30",
    green: "bg-green-100 dark:bg-green-900/30",
    red: "bg-red-100 dark:bg-red-900/30",
    purple: "bg-purple-100 dark:bg-purple-900/30",
    yellow: "bg-yellow-100 dark:bg-yellow-900/30",
    orange: "bg-orange-100 dark:bg-orange-900/30",
    indigo: "bg-indigo-100 dark:bg-indigo-900/30",
    pink: "bg-pink-100 dark:bg-pink-900/30",
  }

  return isBg ? bgColorMap[color] : colorMap[color] || "bg-gray-500"
}

// Helper function to get badge text color class
function getBadgeTextColorClass(color: keyof typeof colorMap) {
  const colorMap = {
    blue: "text-blue-500",
    green: "text-green-500",
    red: "text-red-500",
    purple: "text-purple-500",
    yellow: "text-yellow-500",
    orange: "text-orange-500",
    indigo: "text-indigo-500",
    pink: "text-pink-500",
  }

  return colorMap[color] || "text-gray-500"
}

// Helper function to check for new badges
function checkForNewBadges(
  tasks: Task[],
  sessions: { date: string; duration: number }[],
  existingBadges: UserBadge[],
): UserBadge[] {
  const newBadges: UserBadge[] = []
  const today = new Date().toISOString().split("T")[0]

  // Get existing badge IDs for quick lookup
  const existingBadgeIds = new Set(existingBadges.map((b) => b.id))

  // Check for task completion badges
  const completedTasks = tasks.filter((t) => t.completed).length

  // First task completed
  if (completedTasks >= 1 && !existingBadgeIds.has("first-task")) {
    newBadges.push({
      id: "first-task",
      name: "First Step",
      description: "Completed your first coding task",
      icon: "check-square",
      color: "green",
      dateEarned: today,
      category: "tasks" as const,
      isNew: true,
    })
  }

  // 5 tasks completed
  if (completedTasks >= 5 && !existingBadgeIds.has("five-tasks")) {
    newBadges.push({
      id: "five-tasks",
      name: "Getting Things Done",
      description: "Completed 5 coding tasks",
      icon: "check-square",
      color: "blue",
      dateEarned: today,
      category: "tasks" as const,
      isNew: true,
    })
  }

  // 10 tasks completed
  if (completedTasks >= 10 && !existingBadgeIds.has("ten-tasks")) {
    newBadges.push({
      id: "ten-tasks",
      name: "Task Master",
      description: "Completed 10 coding tasks",
      icon: "trophy",
      color: "purple",
      dateEarned: today,
      category: "tasks" as const,
      isNew: true,
    })
  }

  // 25 tasks completed
  if (completedTasks >= 25 && !existingBadgeIds.has("twenty-five-tasks")) {
    newBadges.push({
      id: "twenty-five-tasks",
      name: "Productivity Champion",
      description: "Completed 25 coding tasks",
      icon: "award",
      color: "yellow",
      dateEarned: today,
      category: "tasks",
      isNew: true,
    })
  }

  // Check for streak badges
  let currentStreak = 0
  const sortedDates = [...new Set(sessions.map((s) => s.date))].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  )

  if (sortedDates.length > 0) {
    currentStreak = 1
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = new Date(sortedDates[i])
      const prev = new Date(sortedDates[i + 1])

      const diffTime = current.getTime() - prev.getTime()
      const diffDays = diffTime / (1000 * 60 * 60 * 24)

      if (Math.round(diffDays) === 1) {
        currentStreak++
      } else {
        break
      }
    }
  }

  // 3-day streak
  if (currentStreak >= 3 && !existingBadgeIds.has("three-day-streak")) {
    newBadges.push({
      id: "three-day-streak",
      name: "Consistency Starter",
      description: "Maintained a 3-day coding streak",
      icon: "flame",
      color: "orange",
      dateEarned: today,
      category: "streaks" as const,
      isNew: true,
    })
  }

  // 7-day streak
  if (currentStreak >= 7 && !existingBadgeIds.has("seven-day-streak")) {
    newBadges.push({
      id: "seven-day-streak",
      name: "Week Warrior",
      description: "Maintained a 7-day coding streak",
      icon: "flame",
      color: "red",
      dateEarned: today,
      category: "streaks" as const,
      isNew: true,
    })
  }

  // 14-day streak
  if (currentStreak >= 14 && !existingBadgeIds.has("fourteen-day-streak")) {
    newBadges.push({
      id: "fourteen-day-streak",
      name: "Coding Devotee",
      description: "Maintained a 14-day coding streak",
      icon: "zap",
      color: "yellow",
      dateEarned: today,
      category: "streaks" as const,
      isNew: true,
    })
  }

  // 30-day streak
  if (currentStreak >= 30 && !existingBadgeIds.has("thirty-day-streak")) {
    newBadges.push({
      id: "thirty-day-streak",
      name: "Coding Legend",
      description: "Maintained a 30-day coding streak",
      icon: "trophy",
      color: "purple",
      dateEarned: today,
      category: "streaks",
      isNew: true,
    })
  }

  // Check for milestone badges
  const totalCodingTime = sessions.reduce((acc, session) => acc + session.duration, 0)
  const totalHours = Math.floor(totalCodingTime / 3600)

  // 10 hours of coding
  if (totalHours >= 10 && !existingBadgeIds.has("ten-hours")) {
    newBadges.push({
      id: "ten-hours",
      name: "Dedicated Coder",
      description: "Logged 10 hours of coding time",
      icon: "clock",
      color: "blue",
      dateEarned: today,
      category: "milestones" as const,
      isNew: true,
    })
  }

  // 50 hours of coding
  if (totalHours >= 50 && !existingBadgeIds.has("fifty-hours")) {
    newBadges.push({
      id: "fifty-hours",
      name: "Code Enthusiast",
      description: "Logged 50 hours of coding time",
      icon: "zap",
      color: "indigo",
      dateEarned: today,
      category: "milestones" as const,
      isNew: true,
    })
  }

  // 100 hours of coding
  if (totalHours >= 100 && !existingBadgeIds.has("hundred-hours")) {
    newBadges.push({
      id: "hundred-hours",
      name: "Century Coder",
      description: "Logged 100 hours of coding time",
      icon: "award",
      color: "pink",
      dateEarned: today,
      category: "milestones" as const,
      isNew: true,
    })
  }

  return newBadges
}

// Helper function to get locked badges
function getLockedBadges(existingBadges: UserBadge[]) {
  const existingBadgeIds = new Set(existingBadges.map((b) => b.id))

  const allPossibleBadges: UserBadge[] = [
      {
        id: "first-task",
        name: "First Step",
        description: "Complete your first coding task",
        icon: "check-square",
        category: "tasks",
        color: "green" as const,
        dateEarned: "",
      },
      {
        id: "five-tasks",
        name: "Getting Things Done",
        description: "Complete 5 coding tasks",
        icon: "check-square",
        category: "tasks",
        color: "blue" as const,
        dateEarned: "",
      },
      {
        id: "ten-tasks",
        name: "Task Master",
        description: "Complete 10 coding tasks",
        icon: "trophy",
        category: "tasks",
        color: "purple" as const,
        dateEarned: "",
      },
      {
        id: "twenty-five-tasks",
        name: "Productivity Champion",
        description: "Complete 25 coding tasks",
        icon: "award",
        category: "tasks",
        color: "yellow" as const,
        dateEarned: "",
      },
      {
        id: "three-day-streak",
        name: "Consistency Starter",
        description: "Maintain a 3-day coding streak",
        icon: "flame",
        category: "streaks",
        color: "orange" as const,
        dateEarned: "",
      },
      {
        id: "seven-day-streak",
        name: "Week Warrior",
        description: "Maintain a 7-day coding streak",
        icon: "flame",
        category: "streaks",
        color: "red" as const,
        dateEarned: "",
      },
      {
        id: "fourteen-day-streak",
        name: "Coding Devotee",
        description: "Maintain a 14-day coding streak",
        icon: "zap",
        category: "streaks",
        color: "yellow" as const,
        dateEarned: "",
      },
      {
        id: "thirty-day-streak",
        name: "Coding Legend",
        description: "Maintain a 30-day coding streak",
        icon: "trophy",
        category: "streaks",
        color: "purple" as const,
        dateEarned: "",
      },
      {
        id: "ten-hours",
        name: "Dedicated Coder",
        description: "Log 10 hours of coding time",
        icon: "clock",
        category: "milestones",
        color: "blue" as const,
        dateEarned: "",
      },
      {
        id: "fifty-hours",
        name: "Code Enthusiast",
        description: "Log 50 hours of coding time",
        icon: "zap",
        category: "milestones",
        color: "indigo" as const,
        dateEarned: "",
      },
      {
        id: "hundred-hours",
        name: "Century Coder",
        description: "Log 100 hours of coding time",
        icon: "award",
        category: "milestones",
        color: "pink" as const,
        dateEarned: "",
      },
    ]

  // Return badges that don't exist in the user's earned badges
  return allPossibleBadges.filter((badge) => !existingBadgeIds.has(badge.id))
}

// Lock icon component

function Lock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

