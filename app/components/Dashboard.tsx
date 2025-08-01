"use client"

import { useState, useEffect } from "react"
import type { User } from "firebase/auth"
import { collection, addDoc, getDocs, query, orderBy, where } from "firebase/firestore"
import { db } from "../lib/firebase"
import { motion } from "framer-motion"
import Header from "./Header"
import WorkoutForm from "./WorkoutForm"
import ProgressChart from "./ProgressChart"
import WorkoutHistory from "./WorkoutHistory"
import StatsCards from "./StatsCards"
import NotificationPanel from "./NotificationPanel"
import CustomCursor from "./CustomCursor"
import type { Workout } from "../types/workout"

interface DashboardProps {
  user: User
}

export default function Dashboard({ user }: DashboardProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [activeTab, setActiveTab] = useState<"log" | "dashboard">("dashboard")
  const [loading, setLoading] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    fetchWorkouts()
  }, [user])

  const fetchWorkouts = async () => {
    try {
      const q = query(collection(db, "workouts"), where("userId", "==", user.uid), orderBy("date", "desc"))
      const querySnapshot = await getDocs(q)
      const workoutData: Workout[] = []

      querySnapshot.forEach((doc) => {
        workoutData.push({ id: doc.id, ...doc.data() } as Workout)
      })

      setWorkouts(workoutData)
    } catch (error) {
      console.error("Error fetching workouts:", error)
    } finally {
      setLoading(false)
    }
  }

  const addWorkout = async (workoutData: Omit<Workout, "id">) => {
    try {
      const docRef = await addDoc(collection(db, "workouts"), {
        ...workoutData,
        userId: user.uid,
      })
      const newWorkout = { id: docRef.id, ...workoutData }
      setWorkouts([newWorkout, ...workouts])
    } catch (error) {
      console.error("Error adding workout:", error)
    }
  }

  const stats = {
    totalWorkouts: workouts.length,
    totalExercises: workouts.reduce((sum, workout) => sum + workout.exercises.length, 0),
    totalSets: workouts.reduce(
      (sum, workout) =>
        sum + workout.exercises.reduce((exerciseSum, exercise) => exerciseSum + exercise.sets.length, 0),
      0,
    ),
    totalVolume: Math.round(
      workouts.reduce(
        (sum, workout) =>
          sum +
          workout.exercises.reduce(
            (exerciseSum, exercise) =>
              exerciseSum + exercise.sets.reduce((setSum, set) => setSum + set.weight * set.reps, 0),
            0,
          ),
        0,
      ),
    ),
  }

  const uniqueExercises = Array.from(
    new Set(workouts.flatMap((workout) => workout.exercises.map((exercise) => exercise.name))),
  ).sort()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center">
        <motion.div
          className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400">
      <CustomCursor />
      <Header user={user} onToggleNotifications={() => setShowNotifications(!showNotifications)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex space-x-2 bg-white/20 backdrop-blur-xl rounded-3xl p-2 shadow-xl mb-8 border border-white/30"
        >
          <motion.button
            onClick={() => setActiveTab("dashboard")}
            className={`flex-1 py-3 px-6 rounded-2xl text-sm font-bold transition-all duration-300 ${
              activeTab === "dashboard" ? "bg-white text-purple-600 shadow-lg" : "text-white hover:bg-white/20"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📊 Dashboard
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("log")}
            className={`flex-1 py-3 px-6 rounded-2xl text-sm font-bold transition-all duration-300 ${
              activeTab === "log" ? "bg-white text-purple-600 shadow-lg" : "text-white hover:bg-white/20"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            💪 Log Workout
          </motion.button>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "dashboard" ? (
            <div className="space-y-8">
              <StatsCards stats={stats} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ProgressChart workouts={workouts} exercises={uniqueExercises} />
                <WorkoutHistory workouts={workouts.slice(0, 10)} />
              </div>
            </div>
          ) : (
            <WorkoutForm onAddWorkout={addWorkout} />
          )}
        </motion.div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </div>
  )
}
