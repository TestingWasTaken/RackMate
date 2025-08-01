export interface Set {
  id: string
  reps: number
  weight: number
}

export interface Exercise {
  id: string
  name: string
  sets: Set[]
}

export interface Workout {
  id: string
  name: string
  date: string
  exercises: Exercise[]
  duration?: number
}
