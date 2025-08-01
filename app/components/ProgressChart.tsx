"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
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
                    borderColor: "rgba(255, 255, 255, 0.9)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointBorderColor: "rgba(255, 255, 255, 1)",
                    pointRadius: 6,
                    pointHoverRadius: 8,
                  },
                  {
                    label: "Max Weight (lbs)",
                    data: exerciseData.map((d) => d?.maxWeight),
                    borderColor: "rgba(255, 255, 255, 0.6)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    tension: 0.4,
                    fill: false,
                    pointBackgroundColor: "rgba(255, 255, 255, 0.8)",
                    pointBorderColor: "rgba(255, 255, 255, 0.8)",
                    pointRadius: 4,
                    pointHoverRadius: 6,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: `${selectedExercise} Progress 📈`,
                    color: "white",
                    font: {
                      size: 18,
                      weight: "bold",
                    },
                  },
                  legend: {
                    display: true,
                    position: "top",
                    labels: {
                      color: "white",
                      font: {
                        weight: "bold",
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    title: {
                      display: true,
                      text: "Weight (lbs)",
                      color: "white",
                      font: {
                        weight: "bold",
                      },
                    },
                    ticks: {
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                    grid: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Date",
                      color: "white",
                      font: {
                        weight: "bold",
                      },
                    },
                    ticks: {
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                    grid: {
                      color: "rgba(255, 255, 255, 0.1)",
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Progress Chart 📈</h3>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-white/70 text-lg">No exercises to display yet.</p>
          <p className="text-white/50">Start logging workouts to see your progress!</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Progress Chart 📈</h3>
        <motion.select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="px-4 py-2 bg-white/20 border border-white/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-xl"
          whileHover={{ scale: 1.02 }}
        >
          {exercises.map((exercise) => (
            <option key={exercise} value={exercise} className="bg-purple-600 text-white">
              {exercise}
            </option>
          ))}
        </motion.select>
      </div>

      <div className="h-80 relative">
        <canvas ref={canvasRef} className="rounded-2xl"></canvas>
      </div>
    </motion.div>
  )
}
