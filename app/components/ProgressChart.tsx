"use client"

import { useState, useEffect, useRef } from "react"
import type { Workout } from "../types/workout"

interface ProgressChartProps {
  workouts: Workout[]
  exercises: string[]
}

export default function ProgressChart({ workouts, exercises }: ProgressChartProps) {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0] || "")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("chart.js/auto").then((Chart) => {
        if (canvasRef.current && selectedExercise) {
          // Destroy existing chart
          if (chartRef.current) {
            chartRef.current.destroy()
          }

          // Prepare data for the selected exercise
          const exerciseData = workouts
            .filter((workout) => workout.exercises.some((ex) => ex.name === selectedExercise))
            .map((workout) => {
              const exercise = workout.exercises.find((ex) => ex.name === selectedExercise)
              if (!exercise) return null

              // Calculate 1RM using Epley formula: weight * (1 + reps/30)
              const maxSet = exercise.sets.reduce(
                (max, set) => {
                  const oneRM = set.weight * (1 + set.reps / 30)
                  return oneRM > max.oneRM ? { ...set, oneRM } : max
                },
                { reps: 0, weight: 0, oneRM: 0 },
              )

              return {
                date: new Date(workout.date).toLocaleDateString(),
                oneRM: Math.round(maxSet.oneRM),
                maxWeight: maxSet.weight,
                workout: workout.name,
              }
            })
            .filter(Boolean)
            .reverse() // Show chronological order

          const ctx = canvasRef.current.getContext("2d")
          if (ctx) {
            chartRef.current = new Chart.default(ctx, {
              type: "line",
              data: {
                labels: exerciseData.map((d) => d?.date),
                datasets: [
                  {
                    label: "Estimated 1RM (lbs)",
                    data: exerciseData.map((d) => d?.oneRM),
                    borderColor: "rgb(59, 130, 246)",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    tension: 0.1,
                    fill: true,
                  },
                  {
                    label: "Max Weight (lbs)",
                    data: exerciseData.map((d) => d?.maxWeight),
                    borderColor: "rgb(16, 185, 129)",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    tension: 0.1,
                    fill: false,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: `${selectedExercise} Progress`,
                  },
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    title: {
                      display: true,
                      text: "Weight (lbs)",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                },
              },
            })
          }
        }
      })
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [selectedExercise, workouts])

  if (exercises.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Chart</h3>
        <p className="text-gray-500">No exercises to display yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Progress Chart</h3>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {exercises.map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>

      <div className="h-64">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  )
}
