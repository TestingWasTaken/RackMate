"use client"

import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Workout } from "../types/workout"

interface ProgressChartProps {
  workouts: Workout[]
}

export default function ProgressChart({ workouts }: ProgressChartProps) {
  // Generate chart data from workouts
  const chartData = workouts
    .slice(-10) // Last 10 workouts
    .reverse()
    .map((workout, index) => {
      const totalWeight = workout.exercises.reduce(
        (sum, exercise) => sum + exercise.sets.reduce((setSum, set) => setSum + set.weight * set.reps, 0),
        0,
      )

      return {
        workout: `Workout ${index + 1}`,
        totalWeight,
        date: new Date(workout.date).toLocaleDateString(),
      }
    })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">Progress Overview</h3>

      {chartData.length > 0 ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="workout" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="totalWeight"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">No workout data yet</p>
            <p className="text-sm">Start logging workouts to see your progress!</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
