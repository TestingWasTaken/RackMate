"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "./lib/firebase"
import WorkoutForm from "./components/WorkoutForm"
import Dashboard from "./components/Dashboard"
import Header from "./components/Header"
import type { Workout } from "./types/workout"

export default function FitTrack() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [activeTab, setActiveTab] = useState<"log" | "dashboard">("log")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const fetchWorkouts = async () => {
    try {
      const q = query(collection(db, "workouts"), orderBy("date", "desc"))
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
      const docRef = await addDoc(collection(db, "workouts"), workoutData)
      const newWorkout = { id: docRef.id, ...workoutData }
      setWorkouts([newWorkout, ...workouts])
    } catch (error) {
      console.error("Error adding workout:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
          <button
            onClick={() => setActiveTab("log")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "log" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Log Workout
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "dashboard" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Dashboard
          </button>
        </div>

        {/* Content */}
        {activeTab === "log" ? <WorkoutForm onAddWorkout={addWorkout} /> : <Dashboard workouts={workouts} />}
      </div>
    </div>
  )
}
