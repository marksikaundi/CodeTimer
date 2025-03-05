"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatTime } from "@/lib/utils"

interface Session {
  date: string
  duration: number
}

interface ActivityStatsProps {
  sessions: Session[]
}

export function ActivityStats({ sessions }: ActivityStatsProps) {
  const stats = useMemo(() => {
    if (!sessions.length) return { total: 0, today: 0, average: 0, streak: 0 }

    const totalSeconds = sessions.reduce((acc, session) => acc + session.duration, 0)

    // Calculate today's time
    const today = new Date().toISOString().split("T")[0]
    const todaySession = sessions.find((s) => s.date === today)
    const todaySeconds = todaySession ? todaySession.duration : 0

    // Calculate average daily time (excluding today if it's 0)
    const uniqueDays = [...new Set(sessions.map((s) => s.date))].length
    const averageSeconds = uniqueDays ? totalSeconds / uniqueDays : 0

    // Calculate streak (consecutive days)
    let streak = 0
    const sortedDates = [...new Set(sessions.map((s) => s.date))].sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    )

    if (sortedDates.length > 0) {
      streak = 1
      for (let i = 0; i < sortedDates.length - 1; i++) {
        const current = new Date(sortedDates[i])
        const prev = new Date(sortedDates[i + 1])

        // Check if dates are consecutive
        const diffTime = current.getTime() - prev.getTime()
        const diffDays = diffTime / (1000 * 60 * 60 * 24)

        if (Math.round(diffDays) === 1) {
          streak++
        } else {
          break
        }
      }
    }

    return {
      total: totalSeconds,
      today: todaySeconds,
      average: averageSeconds,
      streak,
    }
  }, [sessions])

  const recentSessions = useMemo(() => {
    return [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 7)
  }, [sessions])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Coding Statistics</CardTitle>
          <CardDescription>Summary of your coding activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Today" value={formatTime(stats.today)} />
            <StatCard title="Total Time" value={formatTime(stats.total)} />
            <StatCard title="Daily Average" value={formatTime(stats.average)} />
            <StatCard title="Current Streak" value={`${stats.streak} day${stats.streak !== 1 ? "s" : ""}`} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>Your coding activity in the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          {recentSessions.length > 0 ? (
            <div className="space-y-2">
              {recentSessions.map((session, index) => (
                <div key={index} className="flex justify-between py-2 border-b last:border-0">
                  <span>{formatDate(session.date)}</span>
                  <span className="font-mono">{formatTime(session.duration)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">No recent coding sessions found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-muted/50 rounded-lg p-4 text-center">
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

