import  ActivityTracker  from "@/components/activity-tracker"
import Link from "next/link"
import { BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AppPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/dashboard">
              <BarChart2 className="h-4 w-4" />
              View Dashboard
            </Link>
          </Button>
        </div>
        <ActivityTracker />
      </div>
    </main>
  )
}

