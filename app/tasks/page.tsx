"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, CheckSquare, Square, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("codingTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    setIsLoading(false);
  }, []);

  // Save tasks to localStorage when they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("codingTasks", JSON.stringify(tasks));

      // Check if a task was just completed
      const completedTasksCount = tasks.filter((task) => task.completed).length;
      const savedBadges = localStorage.getItem("codingBadges");
      const badges = savedBadges ? JSON.parse(savedBadges) : [];

      // Show badge notification if user has completed tasks but hasn't seen the badges page
      if (completedTasksCount > 0 && badges.length === 0) {
        setShowBadgeNotification(true);
      }
    }
  }, [tasks, isLoading]);

  // Add a new task
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim() === "") return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim() || undefined,
      completed: false,
      date: new Date().toISOString().split("T")[0],
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  // Toggle task completion status
  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Count tasks by status
  const activeTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Coding Tasks</h1>
            <p className="text-muted-foreground">
              Track what you&apos;re working on
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Link href="/view-badges">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 cursor-pointer "
              >
                View Badges
                {showBadgeNotification && (
                  <Badge variant="default" className="ml-1 bg-yellow-500">
                    New
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="cursor-pointer" variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/app">
              <Button className="cursor-pointer" variant="outline" size="sm">
                Timer
              </Button>
            </Link>
          </div>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                  <p className="text-2xl font-bold">{tasks.length}</p>
                </div>
                <div className="bg-muted/50 p-2 rounded-lg">
                  <CheckSquare className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Active Tasks</p>
                  <p className="text-2xl font-bold">{activeTasks}</p>
                </div>
                <div className="bg-muted/50 p-2 rounded-lg">
                  <Square className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completedTasks}</p>
                </div>
                <div className="bg-muted/50 p-2 rounded-lg">
                  <CheckSquare className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Task Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
            <CardDescription>What are you working on?</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={addTask} className="space-y-4">
              <div>
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  placeholder="What are you coding?"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="task-description">Description (Optional)</Label>
                <Input
                  id="task-description"
                  placeholder="Add more details about your task"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                <Plus className="h-4 w-4 mr-2" /> Add Task
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Task List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Tasks</CardTitle>
              <CardDescription>Manage your coding tasks</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  All Tasks
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("active")}>
                  Active Tasks
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("completed")}>
                  Completed Tasks
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={(value) =>
                setFilter(value as "all" | "active" | "completed")
              }
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <TaskList
                  tasks={filteredTasks}
                  onToggle={toggleTaskStatus}
                  onDelete={deleteTask}
                />
              </TabsContent>
              <TabsContent value="active" className="mt-4">
                <TaskList
                  tasks={filteredTasks}
                  onToggle={toggleTaskStatus}
                  onDelete={deleteTask}
                />
              </TabsContent>
              <TabsContent value="completed" className="mt-4">
                <TaskList
                  tasks={filteredTasks}
                  onToggle={toggleTaskStatus}
                  onDelete={deleteTask}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tasks found. Add a new task to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg"
        >
          <button
            onClick={() => onToggle(task.id)}
            className="mt-0.5 flex-shrink-0"
            aria-label={
              task.completed ? "Mark as incomplete" : "Mark as complete"
            }
          >
            {task.completed ? (
              <CheckSquare className="h-5 w-5 text-primary" />
            ) : (
              <Square className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium ${
                task.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.title}
            </h3>
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
            <p className="text-xs text-muted-foreground mt-2">
              Added on {formatDate(task.date)}
            </p>
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
