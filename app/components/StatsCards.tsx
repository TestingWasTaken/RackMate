import { TrendingUp, Dumbbell, Target, Zap } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalWorkouts: number
    totalExercises: number
    totalSets: number
    totalVolume: number
  }
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Workouts",
      value: stats.totalWorkouts,
      icon: Target,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Exercises Performed",
      value: stats.totalExercises,
      icon: Dumbbell,
      color: "bg-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Sets",
      value: stats.totalSets,
      icon: Zap,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Volume (lbs)",
      value: stats.totalVolume.toLocaleString(),
      icon: TrendingUp,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgColor} rounded-lg p-6 border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`${card.color} p-3 rounded-lg`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
