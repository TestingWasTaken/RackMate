"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Bell, Trophy, Target, Zap } from "lucide-react"

interface NotificationPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const notifications = [
    {
      id: 1,
      type: "achievement",
      icon: Trophy,
      title: "First Workout Complete!",
      message: "Congratulations on logging your first workout!",
      time: "2 hours ago",
      color: "text-yellow-400",
    },
    {
      id: 2,
      type: "reminder",
      icon: Target,
      title: "Workout Reminder",
      message: "Don't forget your leg day workout today!",
      time: "1 day ago",
      color: "text-blue-400",
    },
    {
      id: 3,
      type: "milestone",
      icon: Zap,
      title: "Streak Achievement",
      message: "You've worked out 3 days in a row!",
      time: "3 days ago",
      color: "text-green-400",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 h-full w-96 bg-white/20 backdrop-blur-xl border-l border-white/30 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Notifications</h2>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5 text-white" />
                </motion.button>
              </div>

              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-xl bg-white/20 ${notification.color}`}>
                        <notification.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm mb-1">{notification.title}</h3>
                        <p className="text-white/80 text-sm mb-2">{notification.message}</p>
                        <span className="text-white/60 text-xs">{notification.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {notifications.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">No notifications yet</p>
                  <p className="text-white/40 text-sm mt-2">Your achievements and reminders will appear here</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
