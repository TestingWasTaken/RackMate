"use client"

import { motion } from "framer-motion"
import { X, Bell, CheckCircle, AlertCircle, Info } from "lucide-react"

interface NotificationPanelProps {
  onClose: () => void
}

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Workout Completed!",
      message: "Great job on your Push Day workout!",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "info",
      title: "Rest Day Reminder",
      message: "Remember to take rest days for optimal recovery.",
      time: "1 day ago",
      icon: Info,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "warning",
      title: "Goal Update",
      message: "You're 2 workouts away from your weekly goal!",
      time: "2 days ago",
      icon: AlertCircle,
      color: "text-orange-600",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mt-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close notifications"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <notification.icon className={`h-5 w-5 mt-0.5 ${notification.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline">
            Mark all as read
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
