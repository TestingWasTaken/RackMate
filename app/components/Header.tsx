"use client"

import { type User, signOut } from "firebase/auth"
import { auth } from "../lib/firebase"
import { motion } from "framer-motion"
import { Dumbbell, Bell, LogOut, UserIcon } from "lucide-react"
import CalendarWidget from "./CalendarWidget"

interface HeaderProps {
  user: User
  onToggleNotifications: () => void
}

export default function Header({ user, onToggleNotifications }: HeaderProps) {
  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.div
              className="bg-white/30 p-3 rounded-2xl shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Dumbbell className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">RackMate</h1>
              <p className="text-sm text-white/80 font-medium">Your fitness companion</p>
            </div>
          </motion.div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Calendar */}
            <CalendarWidget />

            {/* Notifications */}
            <motion.button
              onClick={onToggleNotifications}
              className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="h-6 w-6 text-white" />
            </motion.button>

            {/* User menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-bold text-white">Welcome back, {user.displayName || "Fitness Hero"}! 👋</p>
                <p className="text-xs text-white/80">Ready to crush your goals?</p>
              </div>

              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <UserIcon className="h-6 w-6 text-white" />
                </motion.div>

                <motion.button
                  onClick={handleSignOut}
                  className="p-3 bg-white/20 rounded-2xl hover:bg-red-500/30 transition-colors shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5 text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
