"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, TrendingUp, Dumbbell, User, Plus } from 'lucide-react'
import Header from "./Header"
import StatsCards from "./StatsCards"
import ProgressChart from "./ProgressChart"
import WorkoutHistory from "./WorkoutHistory"
import WorkoutForm from "./WorkoutForm"
import CalendarWidget from "./CalendarWidget"
import NotificationPanel from "./NotificationPanel"
import LoadingSpinner from "./LoadingSpinner"
import type { Workout } from "../types/workout"
import { useAuth } from "./AuthContext"

interface DashboardProps {
  user: {
    uid: string
    email?: string | null
    displayName?: string | null
    isAnonymous?: boolean
  }
}

export default function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("log-workout")
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)
  const { signOut } = useAuth()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleWorkoutSubmit = (workout: Workout) => {
    setWorkouts((prev) => [workout, ...prev])
  }

  if (loading) {
    return <LoadingSpinner />
  }

  const tabs = [
    { id: "log-workout", label: "Log Workout", icon: Plus },
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "history", label: "History", icon: Dumbbell },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Guest Warning Banner */}
      {user.isAnonymous && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-400 text-yellow-900 px-4 py-3 text-center font-medium"
        >
          You're using RackMate as a guest. Your data won't be saved permanently.{" "}
          <button className="underline font-bold hover:no-underline">Sign up to save your progress</button>
        </motion.div>
      )}

      <Header
        user={user}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-white shadow-lg h-screen sticky top-0 border-r border-gray-200"
        >
          <div className="p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "log-workout" && <WorkoutForm onSubmit={handleWorkoutSubmit} />}
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  <StatsCards workouts={workouts} />
                  <ProgressChart workouts={workouts} />
                </div>
              )}
              {activeTab === "history" && <WorkoutHistory workouts={workouts} />}
              {activeTab === "calendar" && <CalendarWidget workouts={workouts} />}
              {activeTab === "profile" && (
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                      <input
                        type="text"
                        value={user.displayName || ""}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={user.email || ""}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        disabled
                      />
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
      </AnimatePresence>
    </div>
  )
}
