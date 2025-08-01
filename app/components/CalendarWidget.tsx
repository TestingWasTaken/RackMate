"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentYear, currentMonth + direction, 1))
  }

  const selectDate = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day)
    setSelectedDate(newDate)
    setIsOpen(false)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="relative">
      {/* Calendar trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/20 backdrop-blur-xl px-4 py-3 rounded-2xl hover:bg-white/30 transition-colors shadow-lg border border-white/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Calendar className="h-5 w-5 text-white" />
        <div className="text-left">
          <div className="text-white font-bold text-sm">{formatDate(selectedDate)}</div>
          <div className="text-white/70 text-xs">{selectedDate.getFullYear()}</div>
        </div>
      </motion.button>

      {/* Calendar dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6 z-50 min-w-[300px]"
          >
            {/* Calendar header */}
            <div className="flex items-center justify-between mb-4">
              <motion.button
                onClick={() => navigateMonth(-1)}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </motion.button>

              <h3 className="text-white font-bold text-lg">
                {monthNames[currentMonth]} {currentYear}
              </h3>

              <motion.button
                onClick={() => navigateMonth(1)}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </motion.button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-white/70 text-xs font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="h-8" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const date = new Date(currentYear, currentMonth, day)
                const isToday = date.toDateString() === today.toDateString()
                const isSelected = date.toDateString() === selectedDate.toDateString()

                return (
                  <motion.button
                    key={day}
                    onClick={() => selectDate(day)}
                    className={`h-8 w-8 rounded-xl text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-white text-purple-600 shadow-lg"
                        : isToday
                          ? "bg-white/30 text-white"
                          : "text-white/80 hover:bg-white/20"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {day}
                  </motion.button>
                )
              })}
            </div>

            {/* Quick actions */}
            <div className="flex space-x-2 mt-4">
              <motion.button
                onClick={() => {
                  setSelectedDate(today)
                  setCurrentDate(today)
                  setIsOpen(false)
                }}
                className="flex-1 py-2 px-3 bg-white/20 rounded-xl text-white text-sm font-medium hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Today
              </motion.button>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2 px-3 bg-white text-purple-600 rounded-xl text-sm font-medium hover:bg-white/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Done
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
