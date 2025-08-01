import type { Workout } from "../types/workout"
import { Calendar } from "lucide-react"

interface WorkoutHistoryProps {
  workouts: Workout[]
}

export default function WorkoutHistory({ workouts }: WorkoutHistoryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const calculateTotalVolume = (workout: Workout) => {
    return workout.exercises.reduce(
      (total, exercise) => total + exercise.sets.reduce((setTotal, set) => setTotal + set.weight * set.reps, 0),
      0,
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Workouts</h3>

      {workouts.length === 0 ? (
        <p className="text-gray-500">No workouts recorded yet.</p>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{workout.name}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(workout.date)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                <div>
                  <span className="font-medium">{workout.exercises.length}</span> exercises
                </div>
                <div>
                  <span className="font-medium">
                    {workout.exercises.reduce((total, ex) => total + ex.sets.length, 0)}
                  </span>{" "}
                  sets
                </div>
                <div>
                  <span className="font-medium">{Math.round(calculateTotalVolume(workout))}</span> lbs volume
                </div>
              </div>

              <div className="space-y-1">
                {workout.exercises.slice(0, 3).map((exercise, index) => (
                  <div key={index} className="text-xs text-gray-500">
                    {exercise.name} - {exercise.sets.length} sets
                  </div>
                ))}
                {workout.exercises.length > 3 && (
                  <div className="text-xs text-gray-400">+{workout.exercises.length - 3} more exercises</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
