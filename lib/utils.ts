import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  // Round to 2 decimal places to avoid floating point issues
  seconds = Math.round(seconds * 100) / 100

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  // Handle the seconds part with potential decimals
  const secs = seconds % 60

  // Format the seconds part - if it's a whole number, show no decimals
  // If it has decimals, limit to 2 decimal places
  const secsFormatted = Number.isInteger(secs) ? secs.toString().padStart(2, "0") : secs.toFixed(2).padStart(5, "0")

  return [hours.toString().padStart(2, "0"), minutes.toString().padStart(2, "0"), secsFormatted].join(":")
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

