"use client"

import { useState, useEffect } from "react"

export default function WorkoutCounter() {
  const [count, setCount] = useState(5255)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1)
    }, 30000) // Increase by 1 every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <span>
      {count.toLocaleString()} workouts logged to date
    </span>
  )
}
