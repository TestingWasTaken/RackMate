"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { signOut, type User } from "firebase/auth"
import { auth } from "../lib/firebase"
import { Dumbbell, Bell, Settings, LogOut, Calendar, UserIcon } from "lucide-react"
import CalendarWidget from "./CalendarWidget"

interface HeaderProps {
  user: User
  onToggleNotifications: () => void
}

export default function Header({ user, onToggleNotifications }: HeaderProps) {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handleSignUpConversion = () => {
    // This would typically open a sign-up modal or redirect
    // For now, we'll just sign out to return to the landing page
    handleSignOut()
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/20 backdrop-blur-xl border-b border-white/30 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl border border-white/30">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">RackMate</h1>
          </motion.div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Guest Sign Up Button */}
            {user.isAnonymous && (
              <motion.button
                onClick={handleSignUpConversion}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up to Save
              </motion.button>
            )}

            {/* Calendar Button */}
            <motion.button
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors border border-white/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Calendar className="h-5 w-5 text-white" />
            </motion.button>

            {/* Notifications Button */}
            <motion.button
              onClick={onToggleNotifications}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors border border-white/30 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="h-5 w-5 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors border border-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-white" />
                </div>
                <span className="text-white font-medium hidden sm:block">
                  {user.isAnonymous ? "Guest" : user.email?.split("@")[0] || "User"}
                </span>
              </motion.button>

              {/* User Dropdown */}
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-white/20">
                    <p className="text-white font-semibold">{user.isAnonymous ? "Guest User" : user.email}</p>
                    {user.isAnonymous && <p className="text-white/70 text-sm">Temporary session</p>}
                  </div>
                  <div className="p-2">
                    <motion.button
                      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/20 transition-colors text-white"
                      whileHover={{ x: 4 }}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </motion.button>
                    <motion.button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/20 transition-colors text-white"
                      whileHover={{ x: 4 }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{user.isAnonymous ? "Exit Guest Mode" : "Sign Out"}</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Widget */}
      {showCalendar && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-4 mt-2 z-50"
        >
          <CalendarWidget onClose={() => setShowCalendar(false)} />
        </motion.div>
      )}

      {/* Click outside to close menus */}
      {(showCalendar || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowCalendar(false)
            setShowUserMenu(false)
          }}
        />
      )}
    </motion.header>
  )
}
