"use client"

import { motion } from "framer-motion"
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
      gradient: "from-blue-400 to-purple-500",
      emoji: "🎯",
    },
    {
      title: "Exercises Done",
      value: stats.totalExercises,
      icon: Dumbbell,
      gradient: "from-green-400 to-blue-500",
      emoji: "💪",
    },
    {
      title: "Total Sets",
      value: stats.totalSets,
      icon: Zap,
      gradient: "from-purple-400 to-pink-500",
      emoji: "⚡",
    },
    {
      title: "Volume (lbs)",
      value: stats.totalVolume.toLocaleString(),
      icon: TrendingUp,
      gradient: "from-orange-400 to-red-500",
      emoji: "🔥",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-br ${card.gradient} rounded-3xl p-6 shadow-2xl border border-white/30 relative overflow-hidden`}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl">{card.emoji}</span>
            </div>

            <div>
              <p className="text-white/80 text-sm font-medium mb-1">{card.title}</p>
              <p className="text-3xl font-black text-white">{card.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
