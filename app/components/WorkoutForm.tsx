"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Minus, Save } from "lucide-react"
import type { Workout, Exercise, Set } from "../types/workout"

interface WorkoutFormProps {
  onSubmit: (workout: Workout) => void
}

export default function WorkoutForm({ onSubmit }: WorkoutFormProps) {
  const [workoutName, setWorkoutName] = useState("")
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "1",
      name: "",
      sets: [{ id: "1", reps: 0, weight: 0 }],
    },
  ])

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: "",
      sets: [{ id: Date.now().toString(), reps: 0, weight: 0 }],
    }
    setExercises([...exercises, newExercise])
  }

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter((ex) => ex.id !== exerciseId))
  }

  const updateExerciseName = (exerciseId: string, name: string) => {
    setExercises(exercises.map((ex) => (ex.id === exerciseId ? { ...ex, name } : ex)))
  }

  const addSet = (exerciseId: string) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, sets: [...ex.sets, { id: Date.now().toString(), reps: 0, weight: 0 }] } : ex,
      ),
    )
  }

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(
      exercises.map((ex) => (ex.id === exerciseId ? { ...ex, sets: ex.sets.filter((set) => set.id !== setId) } : ex)),
    )
  }

  const updateSet = (exerciseId: string, setId: string, field: keyof Set, value: number) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set) => (set.id === setId ? { ...set, [field]: value } : set)),
            }
          : ex,
      ),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const workout: Workout = {
      id: Date.now().toString(),
      name: workoutName || "Untitled Workout",
      date: new Date().toISOString(),
      exercises: exercises.filter((ex) => ex.name.trim() !== ""),
      duration: 0, // Could be calculated
    }

    onSubmit(workout)

    // Reset form
    setWorkoutName("")
    setExercises([
      {
        id: Date.now().toString(),
        name: "",
        sets: [{ id: Date.now().toString(), reps: 0, weight: 0 }],
      },
    ])

    // Show success message
    alert("Workout logged successfully!")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Log Your Workout</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Workout Name */}
          <div>
            <label htmlFor="workout-name" className="block text-lg font-semibold text-gray-700 mb-3">
              Workout Name
            </label>
            <input
              id="workout-name"
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
              placeholder="e.g., Push Day, Leg Day, Full Body"
            />
          </div>

          {/* Exercises */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-700">Exercises</h3>
              <button
                type="button"
                onClick={addExercise}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4" />
                <span>Add Exercise</span>
              </button>
            </div>

            {exercises.map((exercise, exerciseIndex) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => updateExerciseName(exercise.id, e.target.value)}
                    className="text-lg font-semibold bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 flex-1"
                    placeholder={`Exercise ${exerciseIndex + 1} (e.g., Bench Press, Squats)`}
                  />
                  {exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExercise(exercise.id)}
                      className="text-red-500 hover:text-red-700 p-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                      aria-label="Remove exercise"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Sets */}
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 px-4">
                    <span>Set</span>
                    <span>Reps</span>
                    <span>Weight (lbs)</span>
                    <span></span>
                  </div>

                  {exercise.sets.map((set, setIndex) => (
                    <div key={set.id} className="grid grid-cols-4 gap-4 items-center">
                      <span className="text-gray-600 font-medium px-4">{setIndex + 1}</span>

                      <input
                        type="number"
                        value={set.reps || ""}
                        onChange={(e) => updateSet(exercise.id, set.id, "reps", Number.parseInt(e.target.value) || 0)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center"
                        placeholder="0"
                        min="0"
                      />

                      <input
                        type="number"
                        value={set.weight || ""}
                        onChange={(e) =>
                          updateSet(exercise.id, set.id, "weight", Number.parseFloat(e.target.value) || 0)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center"
                        placeholder="0"
                        min="0"
                        step="0.5"
                      />

                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => addSet(exercise.id)}
                          className="text-blue-600 hover:text-blue-800 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                          aria-label="Add set"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        {exercise.sets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSet(exercise.id, set.id)}
                            className="text-red-500 hover:text-red-700 p-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            aria-label="Remove set"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg hover:shadow-xl"
            >
              <Save className="h-5 w-5" />
              <span>Save Workout</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
