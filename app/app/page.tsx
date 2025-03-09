import  ActivityTracker  from "@/components/activity-tracker"
import  TimerInfoBanner  from "@/components/timer-info-banner"

export default function AppPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <TimerInfoBanner />
        <ActivityTracker />
      </div>
    </main>
  )
}

