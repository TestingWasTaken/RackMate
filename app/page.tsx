"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AuthProvider, useAuth } from "./components/AuthContext"
import LandingPage from "./components/LandingPage"
import Dashboard from "./components/Dashboard"
import LoadingSpinner from "./components/LoadingSpinner"

function AppContent() {
  const { user, loading } = useAuth()

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
          <Dashboard user={user} />
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
