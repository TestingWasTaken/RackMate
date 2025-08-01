"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, Save, Calendar } from "lucide-react"
import type { Workout, Exercise } from "../types/workout"

interface WorkoutFormProps {
  onAddWorkout: (workout: Omit<Workout, "id">) => void
}

export default function WorkoutForm({ onAddWorkout }: WorkoutFormProps) {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      name: "",
      sets: [{ reps: 0, weight: 0 }],
    },
  ])
  const [workoutName, setWorkoutName] = useState("")
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split("T")[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: [{ reps: 0, weight: 0 }] }])
  }

  const removeExercise = (exerciseIndex: number) => {
    setExercises(exercises.filter((_, index) => index !== exerciseIndex))
  }

  const updateExerciseName = (exerciseIndex: number, name: string) => {
    const updatedExercises = [...exercises]
    updatedExercises[exerciseIndex].name = name
    setExercises(updatedExercises)
  }

  const addSet = (exerciseIndex: number) => {
    const updatedExercises = [...exercises]
    updatedExercises[exerciseIndex].sets.push({ reps: 0, weight: 0 })
    setExercises(updatedExercises)
  }

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...exercises]
    updatedExercises[exerciseIndex].sets = updatedExercises[exerciseIndex].sets.filter((_, index) => index !== setIndex)
    setExercises(updatedExercises)
  }

  const updateSet = (exerciseIndex: number, setIndex: number, field: "reps" | "weight", value: number) => {
    const updatedExercises = [...exercises]
    updatedExercises[exerciseIndex].sets[setIndex][field] = value
    setExercises(updatedExercises)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!workoutName.trim() || exercises.some((ex) => !ex.name.trim())) {
      alert("Please fill in all exercise names and workout name")
      return
    }

    setIsSubmitting(true)

    const workout: Omit<Workout, "id"> = {
      name: workoutName,
      exercises: exercises.filter((ex) => ex.name.trim() !== ""),
      date: new Date(workoutDate).toISOString(),
      duration: 0,
    }

    try {
      await onAddWorkout(workout)

      // Reset form
      setWorkoutName("")
      setWorkoutDate(new Date().toISOString().split("T")[0])
      setExercises([{ name: "", sets: [{ reps: 0, weight: 0 }] }])

      // Success animation
      const successDiv = document.createElement("div")
      successDiv.innerHTML = "🎉 Workout saved! Great job!"
      successDiv.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-xl z-50 font-bold"
      document.body.appendChild(successDiv)
      setTimeout(() => document.body.removeChild(successDiv), 3000)
    } catch (error) {
      alert("Error saving workout. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Log Your Workout 💪</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Workout Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-bold mb-3">Workout Name</label>
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="e.g., Push Day, Leg Day, Full Body"
                className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-3">Workout Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                <input
                  type="date"
                  value={workoutDate}
                  onChange={(e) => setWorkoutDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Exercises */}
          <div className="space-y-6">
            {exercises.map((exercise, exerciseIndex) => (
              <motion.div
                key={exerciseIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 rounded-3xl p-6 border border-white/20"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Exercise {exerciseIndex + 1}</h3>
                  {exercises.length > 1 && (
                    <motion.button
                      type="button"
                      onClick={() => removeExercise(exerciseIndex)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="h-5 w-5 text-red-300" />
                    </motion.button>
                  )}
                </div>

                {/* Exercise Name */}
                <div className="mb-6">
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => updateExerciseName(exerciseIndex, e.target.value)}
                    placeholder="Exercise name (e.g., Bench Press, Squats)"
                    className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Sets */}
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 text-white font-bold mb-3">
                    <div>Set</div>
                    <div>Reps</div>
                    <div>Weight (lbs)</div>
                  </div>

                  {exercise.sets.map((set, setIndex) => (
                    <motion.div
                      key={setIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-3 gap-4 items-center"
                    >
                      <div className="text-white font-bold bg-white/20 rounded-xl py-3 text-center">{setIndex + 1}</div>
                      <input
                        type="number"
                        value={set.reps || ""}
                        onChange={(e) =>
                          updateSet(exerciseIndex, setIndex, "reps", Number.parseInt(e.target.value) || 0)
                        }
                        placeholder="0"
                        min="0"
                        className="px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-center"
                      />
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={set.weight || ""}
                          onChange={(e) =>
                            updateSet(exerciseIndex, setIndex, "weight", Number.parseFloat(e.target.value) || 0)
                          }
                          placeholder="0"
                          min="0"
                          step="0.5"
                          className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-center"
                        />
                        {exercise.sets.length > 1 && (
                          <motion.button
                            type="button"
                            onClick={() => removeSet(exerciseIndex, setIndex)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="h-4 w-4 text-red-300" />
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  <motion.button
                    type="button"
                    onClick={() => addSet(exerciseIndex)}
                    className="flex items-center space-x-2 text-white font-bold bg-white/20 hover:bg-white/30 px-4 py-3 rounded-2xl transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Set</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Exercise Button */}
          <motion.button
            type="button"
            onClick={addExercise}
            className="flex items-center space-x-3 text-white font-bold bg-white/20 hover:bg-white/30 px-6 py-4 rounded-2xl transition-colors mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="h-6 w-6" />
            <span>Add Exercise</span>
          </motion.button>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-3 bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save className="h-6 w-6" />
              <span>{isSubmitting ? "Saving Workout..." : "Save Workout 🎉"}</span>
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
