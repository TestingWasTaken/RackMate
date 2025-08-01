"use client"

import { useEffect, useState } from "react"
import LandingPage from "./components/LandingPage"
import Dashboard from "./components/Dashboard"
import LoadingSpinner from "./components/LoadingSpinner"

// Mock user type for demo
interface MockUser {
  uid: string
  email: string | null
  isAnonymous: boolean
  displayName: string | null
}

export default function RackMate() {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth state check
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleGuestLogin = async () => {
    try {
      // Create a guest user and go directly to workout logger
      const guestUser: MockUser = {
        uid: `guest_${Date.now()}`,
        email: null,
        isAnonymous: true,
        displayName: null,
      }
      setUser(guestUser)
    } catch (error) {
      console.error("Error signing in as guest:", error)
    }
  }

  const handleSignOut = () => {
    setUser(null)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return user ? (
    <Dashboard user={user} onSignOut={handleSignOut} startWithWorkoutLogger={user.isAnonymous} />
  ) : (
    <LandingPage onGuestLogin={handleGuestLogin} />
  )
}
