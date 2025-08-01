"use client"

import { motion } from "framer-motion"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import type { Workout } from "../types/workout"

interface CalendarWidgetProps {
  workouts: Workout[]
}

export default function CalendarWidget({ workouts }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const hasWorkoutOnDate = (date: Date) => {
    return workouts.some((workout) => {
      const workoutDate = new Date(workout.date)
      return workoutDate.toDateString() === date.toDateString()
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <Calendar className="h-6 w-6" />
          <span>Workout Calendar</span>
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-lg font-semibold text-gray-700 min-w-[200px] text-center">{monthName}</span>
          <button
            onClick={() => navigateMonth("next")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}

        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} className="h-10"></div>
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
          const hasWorkout = hasWorkoutOnDate(date)
          const isToday = date.toDateString() === new Date().toDateString()

          return (
            <div
              key={day}
              className={`h-10 flex items-center justify-center text-sm rounded-lg transition-colors ${
                isToday
                  ? "bg-blue-600 text-white font-bold"
                  : hasWorkout
                    ? "bg-green-100 text-green-800 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {day}
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="text-gray-600">Today</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-100 border-2 border-green-500 rounded-full"></div>
          <span className="text-gray-600">Workout Day</span>
        </div>
      </div>
    </motion.div>
  )
}
