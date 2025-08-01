"use client"

import { useMemo } from "react"
import type { Workout } from "../types/workout"
import ProgressChart from "./ProgressChart"
import WorkoutHistory from "./WorkoutHistory"
import StatsCards from "./StatsCards"

interface DashboardProps {
  workouts: Workout[]
}

export default function Dashboard({ workouts }: DashboardProps) {
  const stats = useMemo(() => {
    const totalWorkouts = workouts.length
    const totalExercises = workouts.reduce((sum, workout) => sum + workout.exercises.length, 0)
    const totalSets = workouts.reduce(
      (sum, workout) =>
        sum + workout.exercises.reduce((exerciseSum, exercise) => exerciseSum + exercise.sets.length, 0),
      0,
    )

    // Calculate total volume (weight × reps)
    const totalVolume = workouts.reduce(
      (sum, workout) =>
        sum +
        workout.exercises.reduce(
          (exerciseSum, exercise) =>
            exerciseSum + exercise.sets.reduce((setSum, set) => setSum + set.weight * set.reps, 0),
          0,
        ),
      0,
    )

    return {
      totalWorkouts,
      totalExercises,
      totalSets,
      totalVolume: Math.round(totalVolume),
    }
  }, [workouts])

  // Get unique exercises for chart selection
  const uniqueExercises = useMemo(() => {
    const exercises = new Set<string>()
    workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        exercises.add(exercise.name)
      })
    })
    return Array.from(exercises).sort()
  }, [workouts])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Fitness Dashboard</h2>

        {workouts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts yet</h3>
            <p className="text-gray-500">Start logging your workouts to see your progress here!</p>
          </div>
        ) : (
          <>
            <StatsCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <ProgressChart workouts={workouts} exercises={uniqueExercises} />
              <WorkoutHistory workouts={workouts.slice(0, 10)} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
