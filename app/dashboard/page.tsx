"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  Flame,
  CheckSquare,
  ArrowLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTime, formatDate } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: string;
}

export default function DashboardPage() {
  const [sessions, setSessions] = useState<
    { date: string; duration: number }[]
  >([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem("codingSessions");
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    } else {
      // Add some demo data if no sessions exist
      const demoSessions = generateDemoSessions();
      setSessions(demoSessions);
      localStorage.setItem("codingSessions", JSON.stringify(demoSessions));
    }

    // Load tasks
    const savedTasks = localStorage.getItem("codingTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      const demoTasks = generateDemoTasks();
      setTasks(demoTasks);
      localStorage.setItem("codingTasks", JSON.stringify(demoTasks));
    }

    setIsLoading(false);
  }, []);

  // Calculate dashboard metrics
  const metrics = calculateMetrics(sessions, tasks);

  // Generate activity heatmap data
  const heatmapData = generateHeatmapData(sessions);

  // Generate time distribution data
  const timeDistribution = calculateTimeDistribution(sessions);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/app" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Timer
          </Link>

          <div className="flex items-center gap-4">
            <Button
              className="bg-white text-black hover:bg-white hover:text-black"
              asChild
              size="sm"
            >
              <Link href="/view-badge">
                <User className="h-4 w-4" />
                View Badge
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Coding Dashboard</h1>
            <p className="text-muted-foreground">
              Track your coding habits and productivity
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Link href="/tasks">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                Manage Tasks
              </Button>
            </Link>
            <Tabs defaultValue="week" className="w-[300px]">
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            icon={<Clock className="h-5 w-5 text-blue-500" />}
            title="Total Coding Time"
            value={formatTime(metrics.totalTime)}
            trend={"+5.2%"}
            trendUp={true}
          />
          <MetricCard
            icon={<Calendar className="h-5 w-5 text-green-500" />}
            title="Days Coded"
            value={metrics.daysCoded.toString()}
            trend={"+2"}
            trendUp={true}
          />
          <MetricCard
            icon={<Flame className="h-5 w-5 text-orange-500" />}
            title="Current Streak"
            value={`${metrics.currentStreak} days`}
            trend={
              metrics.streakChange > 0
                ? `+${metrics.streakChange}`
                : metrics.streakChange.toString()
            }
            trendUp={metrics.streakChange > 0}
          />
          <MetricCard
            icon={<CheckSquare className="h-5 w-5 text-purple-500" />}
            title="Tasks Completed"
            value={metrics.tasksCompleted.toString()}
            trend={"+3"}
            trendUp={true}
          />
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Heatmap */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Coding Activity</CardTitle>
              <CardDescription>
                Your coding activity over the past 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityHeatmap data={heatmapData} />
                <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-3 h-3 bg-primary/10 rounded"></span>
                  <span>Less</span>
                  <span className="w-3 h-3 bg-primary/30 rounded"></span>
                  <span className="w-3 h-3 bg-primary/50 rounded"></span>
                  <span className="w-3 h-3 bg-primary/70 rounded"></span>
                  <span className="w-3 h-3 bg-primary rounded"></span>
                  <span>More</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Most Active Times</CardTitle>
              <CardDescription>When you code the most</CardDescription>
            </CardHeader>
            <CardContent>
              <TimeDistributionChart data={timeDistribution} />
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
              <CardDescription>Your latest coding sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.slice(0, 5).map((session, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{formatDate(session.date)}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatTime(session.duration)}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Coding Tasks</CardTitle>
                <CardDescription>Your recent tasks</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/tasks">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-start gap-2">
                    <div
                      className={`w-5 h-5 rounded-sm border flex items-center justify-center mt-0.5 ${
                        task.completed
                          ? "bg-primary border-primary"
                          : "border-input"
                      }`}
                    >
                      {task.completed && (
                        <CheckSquare className="h-4 w-4 text-primary-foreground" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          task.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {task.title}
                      </p>
                      {task.description && (
                        <p
                          className={`text-sm mt-1 ${
                            task.completed
                              ? "line-through text-muted-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {task.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(task.date)}
                      </p>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full" size="sm">
                  <Link href="/tasks">Manage Tasks</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Summary */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
              <CardDescription>
                Your coding activity for the past 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WeeklyChart sessions={sessions} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper Components
interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

function MetricCard({ icon, title, value, trend, trendUp }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="bg-muted/50 p-2 rounded-lg">{icon}</div>
          <div
            className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
              trendUp
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {trendUp ? "↑" : "↓"} {trend}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityHeatmap({ data }: { data: number[][] }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => (
        <div
          key={day}
          className="text-center text-xs text-muted-foreground mb-1"
        >
          {day}
        </div>
      ))}
      {data.map((week, weekIndex) =>
        week.map((day, dayIndex) => (
          <div
            key={`${weekIndex}-${dayIndex}`}
            className={`aspect-square rounded ${
              day === 0
                ? "bg-muted/30"
                : day === 1
                ? "bg-primary/20"
                : day === 2
                ? "bg-primary/40"
                : day === 3
                ? "bg-primary/60"
                : "bg-primary"
            }`}
            title={`${day} hours of coding`}
          />
        ))
      )}
    </div>
  );
}

interface TimeDistributionData {
  label: string;
  value: number;
}

function TimeDistributionChart({ data }: { data: TimeDistributionData[] }) {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{item.label}</span>
            <span className="text-muted-foreground">{item.value}h</span>
          </div>
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface Session {
  date: string;
  duration: number;
}

function WeeklyChart({ sessions }: { sessions: Session[] }) {
  // Get the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  }).reverse();

  // Map sessions to the last 7 days
  const dailyData = last7Days.map((date) => {
    const session = sessions.find((s) => s.date === date);
    return {
      date,
      hours: session ? Math.round((session.duration / 3600) * 10) / 10 : 0, // Convert seconds to hours with 1 decimal
    };
  });

  const maxHours = Math.max(...dailyData.map((d) => d.hours), 3); // Ensure minimum scale

  return (
    <div className="pt-6">
      <div className="flex items-end h-40 gap-2">
        {dailyData.map((day, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-primary rounded-t-md transition-all duration-500 ease-in-out"
              style={{
                height: `${(day.hours / maxHours) * 100}%`,
                minHeight: day.hours > 0 ? "4px" : "0",
              }}
            />
            <p className="text-xs text-muted-foreground mt-2">
              {formatDayName(day.date)}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6 text-sm text-muted-foreground">
        <div>
          Total:{" "}
          {formatTime(
            dailyData.reduce((acc, day) => acc + day.hours * 3600, 0)
          )}
        </div>
        <div>
          Average:{" "}
          {formatTime(
            dailyData.reduce((acc, day) => acc + day.hours * 3600, 0) / 7
          )}
          /day
        </div>
      </div>
    </div>
  );
}

// Helper Functions
function formatDayName(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function calculateMetrics(
  sessions: { date: string; duration: number }[],
  tasks: Task[]
) {
  // Calculate total time
  const totalTime = sessions.reduce(
    (acc, session) => acc + session.duration,
    0
  );

  // Calculate days coded
  const daysCoded = new Set(sessions.map((s) => s.date)).size;

  // Calculate current streak
  let currentStreak = 0;
  const sortedDates = [...new Set(sessions.map((s) => s.date))].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  if (sortedDates.length > 0) {
    currentStreak = 1;
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = new Date(sortedDates[i] as string);
      const prev = new Date(sortedDates[i + 1] as string);

      // Check if dates are consecutive
      const diffTime = current.getTime() - prev.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (Math.round(diffDays) === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate tasks completed
  const tasksCompleted = tasks.filter((t: Task) => t.completed).length;

  return {
    totalTime,
    daysCoded,
    currentStreak,
    streakChange: 1, // Mock data for streak change
    tasksCompleted,
  };
}

function generateHeatmapData(sessions: { date: string; duration: number }[]) {
  // Create a 4x7 grid (4 weeks, 7 days per week)
  const heatmapData = Array(4)
    .fill(0)
    .map(() => Array(7).fill(0));

  // Fill with session data
  sessions.forEach((session: { date: string; duration: number }) => {
    const date = new Date(session.date);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

    // Only consider sessions from the last 28 days
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 28) {
      const weekIndex = Math.floor(diffDays / 7);
      const dayIndex = (dayOfWeek + 6) % 7; // Convert to Monday = 0, Sunday = 6

      // Increment the intensity based on hours coded (0-4 scale)
      const hoursInDay = session.duration / 3600;
      heatmapData[weekIndex][dayIndex] = Math.min(4, Math.floor(hoursInDay));
    }
  });

  return heatmapData;
}

function calculateTimeDistribution(
  sessions: { date: string; duration: number }[]
) {
  // Define time blocks
  const timeBlocks = [
    { label: "Morning (6am-12pm)", value: 0 },
    { label: "Afternoon (12pm-6pm)", value: 0 },
    { label: "Evening (6pm-12am)", value: 0 },
    { label: "Night (12am-6am)", value: 0 },
  ];

  // Calculate hours in each block
  sessions.forEach((session: { date: string; duration: number }) => {
    // For demo purposes, distribute hours somewhat randomly
    const hours = session.duration / 3600;

    // Distribute hours across time blocks (simplified for demo)
    const date = new Date(session.date);
    const day = date.getDate();

    if (day % 4 === 0) {
      timeBlocks[0].value += hours * 0.7;
      timeBlocks[1].value += hours * 0.3;
    } else if (day % 4 === 1) {
      timeBlocks[1].value += hours * 0.6;
      timeBlocks[2].value += hours * 0.4;
    } else if (day % 4 === 2) {
      timeBlocks[2].value += hours * 0.8;
      timeBlocks[3].value += hours * 0.2;
    } else {
      timeBlocks[0].value += hours * 0.2;
      timeBlocks[3].value += hours * 0.8;
    }
  });

  // Round values for display
  timeBlocks.forEach((block) => {
    block.value = Math.round(block.value * 10) / 10;
  });

  return timeBlocks;
}

// Demo data generators
function generateDemoSessions() {
  const sessions = [];
  const today = new Date();

  // Generate sessions for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Skip some days randomly to create gaps
    if (i % 5 === 3 || i % 7 === 4) continue;

    // Create a session with random duration between 30 minutes and 4 hours
    const durationInSeconds = Math.floor(
      Math.random() * (4 * 3600 - 30 * 60) + 30 * 60
    );

    sessions.push({
      date: date.toISOString().split("T")[0],
      duration: durationInSeconds,
    });
  }

  return sessions;
}

function generateDemoTasks() {
  const tasks = [
    {
      id: "1",
      title: "Complete React component",
      completed: true,
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "2",
      title: "Fix navigation bug",
      completed: true,
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "3",
      title: "Implement dark mode",
      completed: true,
      date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    },
    {
      id: "4",
      title: "Optimize database queries",
      completed: false,
      date: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
    },
    {
      id: "5",
      title: "Write unit tests",
      completed: false,
      date: new Date(Date.now() - 86400000 * 3).toISOString().split("T")[0],
    },
    {
      id: "6",
      title: "Deploy to production",
      completed: false,
      date: new Date(Date.now() - 86400000 * 4).toISOString().split("T")[0],
    },
  ];

  return tasks;
}
