"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Trash2, Trophy, Target, Zap, Calendar } from "lucide-react"

interface Notification {
  id: string
  type: "achievement" | "reminder" | "milestone" | "social"
  title: string
  message: string
  time: string
  icon: any
}

interface NotificationPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "New Personal Record! 🎉",
      message: "You just hit a new bench press PR of 185 lbs!",
      time: "2 minutes ago",
      icon: Trophy,
    },
    {
      id: "2",
      type: "reminder",
      title: "Workout Reminder",
      message: "Don't forget your leg day workout today!",
      time: "1 hour ago",
      icon: Calendar,
    },
    {
      id: "3",
      type: "milestone",
      title: "Streak Milestone! 🔥",
      message: "Congratulations on your 7-day workout streak!",
      time: "3 hours ago",
      icon: Zap,
    },
    {
      id: "4",
      type: "social",
      title: "Goal Achievement",
      message: "You've completed 75% of your monthly workout goal!",
      time: "1 day ago",
      icon: Target,
    },
  ])

  const [newNotification, setNewNotification] = useState("")

  const addNotification = () => {
    if (!newNotification.trim()) return

    const notification: Notification = {
      id: Date.now().toString(),
      type: "reminder",
      title: "Custom Reminder",
      message: newNotification,
      time: "Just now",
      icon: Calendar,
    }

    setNotifications([notification, ...notifications])
    setNewNotification("")
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "from-yellow-400 to-orange-400"
      case "reminder":
        return "from-blue-400 to-purple-400"
      case "milestone":
        return "from-green-400 to-blue-400"
      case "social":
        return "from-pink-400 to-purple-400"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white/20 backdrop-blur-xl border-l border-white/30 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/30">
              <h2 className="text-2xl font-bold text-white">Notifications 🔔</h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5 text-white" />
              </motion.button>
            </div>

            {/* Add notification */}
            <div className="p-6 border-b border-white/30">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newNotification}
                  onChange={(e) => setNewNotification(e.target.value)}
                  placeholder="Add a custom reminder..."
                  className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  onKeyPress={(e) => e.key === "Enter" && addNotification()}
                />
                <motion.button
                  onClick={addNotification}
                  className="p-3 bg-white text-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Notifications list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-white/50 mb-4">
                    <Calendar className="h-12 w-12 mx-auto" />
                  </div>
                  <p className="text-white/70">No notifications yet</p>
                  <p className="text-white/50 text-sm">Add a custom reminder above!</p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-r ${getNotificationColor(
                      notification.type,
                    )} p-4 rounded-3xl shadow-xl border border-white/30 relative group`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-white/30 p-2 rounded-2xl">
                        <notification.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm">{notification.title}</h3>
                        <p className="text-white/90 text-sm mt-1">{notification.message}</p>
                        <p className="text-white/70 text-xs mt-2">{notification.time}</p>
                      </div>
                      <motion.button
                        onClick={() => removeNotification(notification.id)}
                        className="p-1 rounded-lg bg-white/20 hover:bg-red-500/30 transition-colors opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
