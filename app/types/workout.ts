export interface Set {
  reps: number
  weight: number
}

export interface Exercise {
  name: string
  sets: Set[]
}

export interface Workout {
  id: string
  name: string
  exercises: Exercise[]
  date: string
  duration: number
  userId?: string
}
