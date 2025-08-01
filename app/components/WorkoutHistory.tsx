"use client"

import React from "react"

import { motion } from "framer-motion"
import { Calendar, Dumbbell, Clock } from "lucide-react"
import type { Workout } from "../types/workout"

interface WorkoutHistoryProps {
  workouts: Workout[]
}

export default function WorkoutHistory({ workouts }: WorkoutHistoryProps) {
  if (workouts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-lg text-center"
      >
        <Dumbbell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No workouts yet</h3>
        <p className="text-gray-500">Start logging your workouts to see them here!</p>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Workout History</h2>

      <div className="space-y-4">
        {workouts.map((workout, index) => (
          <motion.div
            key={workout.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{workout.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(workout.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Dumbbell className="h-4 w-4" />
                    <span>{workout.exercises.length} exercises</span>
                  </div>
                  {workout.duration && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{workout.duration} min</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {workout.exercises.map((exercise) => (
                <div key={exercise.id} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">{exercise.name}</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="font-medium text-gray-600">Set</div>
                    <div className="font-medium text-gray-600">Reps</div>
                    <div className="font-medium text-gray-600">Weight</div>
                    {exercise.sets.map((set, setIndex) => (
                      <React.Fragment key={set.id}>
                        <div className="text-gray-700">{setIndex + 1}</div>
                        <div className="text-gray-700">{set.reps}</div>
                        <div className="text-gray-700">{set.weight} lbs</div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
