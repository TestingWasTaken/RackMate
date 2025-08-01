"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

interface Workout {
  id: string
  name: string
  date: string
  exercises: Array<{
    name: string
    sets: Array<{
      reps: number
      weight: number
    }>
  }>
}

interface ProgressChartProps {
  workouts: Workout[]
  exercises: string[]
}

export default function ProgressChart({ workouts, exercises }: ProgressChartProps) {
  const getExerciseProgress = (exerciseName: string) => {
    return workouts
      .filter((workout) => workout.exercises.some((ex) => ex.name === exerciseName))
      .map((workout) => {
        const exercise = workout.exercises.find((ex) => ex.name === exerciseName)
        if (!exercise) return null

        const maxWeight = Math.max(...exercise.sets.map((set) => set.weight))
        return {
          date: new Date(workout.date).toLocaleDateString(),
          weight: maxWeight,
        }
      })
      .filter(Boolean)
      .slice(-10) // Last 10 workouts
  }

  const selectedExercise = exercises[0] || "No exercises yet"
  const progressData = exercises.length > 0 ? getExerciseProgress(selectedExercise) : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-xl"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Progress Chart</h3>
      </div>

      {progressData.length > 0 ? (
        <div className="space-y-4">
          <p className="text-white/80">Tracking: {selectedExercise}</p>
          <div className="h-64 flex items-end space-x-2">
            {progressData.map((data, index) => (
              <motion.div
                key={index}
                className="flex-1 bg-gradient-to-t from-white/30 to-white/60 rounded-t-lg relative"
                initial={{ height: 0 }}
                animate={{ height: `${(data.weight / Math.max(...progressData.map((d) => d.weight))) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold">
                  {data.weight}
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 text-xs">
                  {data.date.split("/")[1]}/{data.date.split("/")[2]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No workout data yet</p>
          <p className="text-white/40 text-sm mt-2">Start logging workouts to see your progress!</p>
        </div>
      )}
    </motion.div>
  )
}
