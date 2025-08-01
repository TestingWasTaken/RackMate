"use client"

import { motion } from "framer-motion"
import { TrendingUp, Dumbbell, Target, Zap } from "lucide-react"

interface Stats {
  totalWorkouts: number
  totalExercises: number
  totalSets: number
  totalVolume: number
}

interface StatsCardsProps {
  stats: Stats
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Workouts",
      value: stats.totalWorkouts,
      icon: Dumbbell,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-500/20",
    },
    {
      title: "Exercises",
      value: stats.totalExercises,
      icon: Target,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-500/20",
    },
    {
      title: "Total Sets",
      value: stats.totalSets,
      icon: TrendingUp,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-500/20",
    },
    {
      title: "Volume (lbs)",
      value: stats.totalVolume,
      icon: Zap,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-xl"
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${card.bgColor} backdrop-blur-sm`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-white/80 text-sm font-medium mb-2">{card.title}</h3>
          <p className="text-3xl font-bold text-white">{card.value.toLocaleString()}</p>
        </motion.div>
      ))}
    </div>
  )
}
