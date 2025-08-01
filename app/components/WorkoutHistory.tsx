"use client"

import { motion } from "framer-motion"
import { Calendar, Dumbbell } from "lucide-react"

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

interface WorkoutHistoryProps {
  workouts: Workout[]
}

export default function WorkoutHistory({ workouts }: WorkoutHistoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-xl"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
          <Calendar className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Recent Workouts</h3>
      </div>

      {workouts.length > 0 ? (
        <div className="space-y-4">
          {workouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-lg">{workout.name}</h4>
                <span className="text-white/60 text-sm">{new Date(workout.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-4 text-white/80 text-sm">
                <div className="flex items-center space-x-1">
                  <Dumbbell className="h-4 w-4" />
                  <span>{workout.exercises.length} exercises</span>
                </div>
                <div>{workout.exercises.reduce((total, ex) => total + ex.sets.length, 0)} sets</div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No workouts logged yet</p>
          <p className="text-white/40 text-sm mt-2">Your workout history will appear here</p>
        </div>
      )}
    </motion.div>
  )
}
