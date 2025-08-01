"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, signInAnonymously, type User } from "firebase/auth"
import { auth } from "./lib/firebase"
import LandingPage from "./components/LandingPage"
import Dashboard from "./components/Dashboard"
import LoadingSpinner from "./components/LoadingSpinner"

export default function RackMate() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth)
    } catch (error) {
      console.error("Error signing in as guest:", error)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return user ? <Dashboard user={user} /> : <LandingPage onGuestLogin={handleGuestLogin} />
}
