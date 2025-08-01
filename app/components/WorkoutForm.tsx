"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, Save, Dumbbell } from "lucide-react"

interface Set {
  reps: number
  weight: number
}

interface Exercise {
  name: string
  sets: Set[]
}

interface Workout {
  name: string
  date: string
  exercises: Exercise[]
}

interface WorkoutFormProps {
  onAddWorkout: (workout: Workout) => void
}

export default function WorkoutForm({ onAddWorkout }: WorkoutFormProps) {
  const [workoutName, setWorkoutName] = useState("")
  const [exercises, setExercises] = useState<Exercise[]>([{ name: "", sets: [{ reps: 0, weight: 0 }] }])

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: [{ reps: 0, weight: 0 }] }])
  }

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const updateExerciseName = (index: number, name: string) => {
    const updated = [...exercises]
    updated[index].name = name
    setExercises(updated)
  }

  const addSet = (exerciseIndex: number) => {
    const updated = [...exercises]
    updated[exerciseIndex].sets.push({ reps: 0, weight: 0 })
    setExercises(updated)
  }

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updated = [...exercises]
    updated[exerciseIndex].sets = updated[exerciseIndex].sets.filter((_, i) => i !== setIndex)
    setExercises(updated)
  }

  const updateSet = (exerciseIndex: number, setIndex: number, field: "reps" | "weight", value: number) => {
    const updated = [...exercises]
    updated[exerciseIndex].sets[setIndex][field] = value
    setExercises(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validExercises = exercises.filter(
      (ex) => ex.name.trim() && ex.sets.some((set) => set.reps > 0 && set.weight > 0),
    )

    if (!workoutName.trim() || validExercises.length === 0) {
      alert("Please fill in workout name and at least one exercise with valid sets")
      return
    }

    const workout: Workout = {
      name: workoutName,
      date: new Date().toISOString(),
      exercises: validExercises,
    }

    onAddWorkout(workout)

    // Reset form
    setWorkoutName("")
    setExercises([{ name: "", sets: [{ reps: 0, weight: 0 }] }])

    alert("Workout saved successfully! 💪")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-xl"
    >
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
          <Dumbbell className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">Log Your Workout</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Workout Name */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <label className="block text-white font-semibold mb-3 text-lg">Workout Name</label>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="e.g., Push Day, Leg Day, Full Body"
            className="w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
            required
          />
        </motion.div>

        {/* Exercises */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Exercises</h3>
            <motion.button
              type="button"
              onClick={addExercise}
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-4 w-4" />
              <span>Add Exercise</span>
            </motion.button>
          </div>

          {exercises.map((exercise, exerciseIndex) => (
            <motion.div
              key={exerciseIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: exerciseIndex * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => updateExerciseName(exerciseIndex, e.target.value)}
                  placeholder="Exercise name (e.g., Bench Press, Squats)"
                  className="flex-1 p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 mr-4"
                  required
                />
                {exercises.length > 1 && (
                  <motion.button
                    type="button"
                    onClick={() => removeExercise(exerciseIndex)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-500/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="h-4 w-4 text-red-300" />
                  </motion.button>
                )}
              </div>

              {/* Sets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold">Sets</h4>
                  <motion.button
                    type="button"
                    onClick={() => addSet(exerciseIndex)}
                    className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm hover:bg-white/30 transition-all duration-300 border border-white/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    + Add Set
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {exercise.sets.map((set, setIndex) => (
                    <motion.div
                      key={setIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: setIndex * 0.05 }}
                      className="flex items-center space-x-3 bg-white/10 p-3 rounded-xl"
                    >
                      <span className="text-white font-semibold min-w-[60px]">Set {setIndex + 1}:</span>
                      <div className="flex items-center space-x-2 flex-1">
                        <input
                          type="number"
                          value={set.weight || ""}
                          onChange={(e) =>
                            updateSet(exerciseIndex, setIndex, "weight", Number.parseInt(e.target.value) || 0)
                          }
                          placeholder="Weight"
                          className="w-20 p-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white/50 text-center"
                          min="0"
                        />
                        <span className="text-white/80 text-sm">lbs</span>
                        <span className="text-white/60">×</span>
                        <input
                          type="number"
                          value={set.reps || ""}
                          onChange={(e) =>
                            updateSet(exerciseIndex, setIndex, "reps", Number.parseInt(e.target.value) || 0)
                          }
                          placeholder="Reps"
                          className="w-16 p-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white/50 text-center"
                          min="0"
                        />
                        <span className="text-white/80 text-sm">reps</span>
                      </div>
                      {exercise.sets.length > 1 && (
                        <motion.button
                          type="button"
                          onClick={() => removeSet(exerciseIndex, setIndex)}
                          className="p-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-500/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="h-3 w-3 text-red-300" />
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-white text-purple-600 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Save className="h-5 w-5" />
          <span>Save Workout</span>
        </motion.button>
      </form>
    </motion.div>
  )
}
