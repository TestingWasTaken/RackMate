"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, Save } from "lucide-react"
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
      date: new Date().toISOString(),
      duration: 0, // You could add a timer feature later
    }

    try {
      await onAddWorkout(workout)

      // Reset form
      setWorkoutName("")
      setExercises([{ name: "", sets: [{ reps: 0, weight: 0 }] }])

      alert("Workout saved successfully!")
    } catch (error) {
      alert("Error saving workout. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Log Your Workout</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Workout Name */}
          <div>
            <label htmlFor="workoutName" className="block text-sm font-medium text-gray-700 mb-2">
              Workout Name
            </label>
            <input
              type="text"
              id="workoutName"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="e.g., Push Day, Leg Day, Full Body"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Exercises */}
          <div className="space-y-6">
            {exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Exercise {exerciseIndex + 1}</h3>
                  {exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExercise(exerciseIndex)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Exercise Name */}
                <div className="mb-4">
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => updateExerciseName(exerciseIndex, e.target.value)}
                    placeholder="Exercise name (e.g., Bench Press, Squats)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Sets */}
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 mb-2">
                    <div>Set</div>
                    <div>Reps</div>
                    <div>Weight (lbs)</div>
                  </div>

                  {exercise.sets.map((set, setIndex) => (
                    <div key={setIndex} className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-sm text-gray-600 font-medium">{setIndex + 1}</div>
                      <input
                        type="number"
                        value={set.reps || ""}
                        onChange={(e) =>
                          updateSet(exerciseIndex, setIndex, "reps", Number.parseInt(e.target.value) || 0)
                        }
                        placeholder="0"
                        min="0"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {exercise.sets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSet(exerciseIndex, setIndex)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addSet(exerciseIndex)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Set</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Exercise Button */}
          <button
            type="button"
            onClick={addExercise}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <Plus className="h-5 w-5" />
            <span>Add Exercise</span>
          </button>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <Save className="h-4 w-4" />
              <span>{isSubmitting ? "Saving..." : "Save Workout"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
