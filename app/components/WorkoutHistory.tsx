"use client"

import { motion } from "framer-motion"
import { Calendar, TrendingUp } from "lucide-react"
import type { Workout } from "../types/workout"

interface WorkoutHistoryProps {
  workouts: Workout[]
}

export default function WorkoutHistory({ workouts }: WorkoutHistoryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const calculateTotalVolume = (workout: Workout) => {
    return workout.exercises.reduce(
      (total, exercise) => total + exercise.sets.reduce((setTotal, set) => setTotal + set.weight * set.reps, 0),
      0,
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8"
    >
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="mr-2">📝</span>
        Recent Workouts
      </h3>

      {workouts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏋️</div>
          <p className="text-white/70 text-lg">No workouts recorded yet.</p>
          <p className="text-white/50">Start your fitness journey today!</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {workouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-bold text-white text-lg group-hover:text-yellow-200 transition-colors">
                  {workout.name}
                </h4>
                <div className="flex items-center text-white/70 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(workout.date)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-white/80 mb-4">
                <div className="flex items-center">
                  <span className="font-bold text-white mr-1">{workout.exercises.length}</span>
                  <span>exercises</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-white mr-1">
                    {workout.exercises.reduce((total, ex) => total + ex.sets.length, 0)}
                  </span>
                  <span>sets</span>
                </div>
                <div className="flex items-center col-span-2">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-300" />
                  <span className="font-bold text-white mr-1">{Math.round(calculateTotalVolume(workout))}</span>
                  <span>lbs volume</span>
                </div>
              </div>

              <div className="space-y-1">
                {workout.exercises.slice(0, 3).map((exercise, index) => (
                  <div key={index} className="text-xs text-white/60 flex items-center">
                    <span className="w-2 h-2 bg-white/40 rounded-full mr-2"></span>
                    {exercise.name} - {exercise.sets.length} sets
                  </div>
                ))}
                {workout.exercises.length > 3 && (
                  <div className="text-xs text-white/40 flex items-center">
                    <span className="w-2 h-2 bg-white/20 rounded-full mr-2"></span>+{workout.exercises.length - 3} more
                    exercises
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
