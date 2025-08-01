"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LandingPage from "./components/LandingPage"
import Dashboard from "./components/Dashboard"
import LoadingSpinner from "./components/LoadingSpinner"

interface User {
  uid: string
  email?: string | null
  displayName?: string | null
  isAnonymous?: boolean
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleGuestLogin = () => {
    // Create a guest user
    const guestUser: User = {
      uid: `guest_${Date.now()}`,
      email: null,
      displayName: null,
      isAnonymous: true,
    }
    setUser(guestUser)
  }

  const handleSignOut = () => {
    setUser(null)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <AnimatePresence mode="wait">
      {user ? (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Dashboard user={user} onSignOut={handleSignOut} />
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage onGuestLogin={handleGuestLogin} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
