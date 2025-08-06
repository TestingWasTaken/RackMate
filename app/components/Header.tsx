"use client"

import { Bell, LogOut, Dumbbell } from 'lucide-react'
import { motion } from "framer-motion"
import { useAuth } from "./AuthContext"

interface HeaderProps {
  user: {
    uid: string
    email?: string | null
    displayName?: string | null
    isAnonymous?: boolean
  }
  showNotifications: boolean
  setShowNotifications: (show: boolean) => void
}

export default function Header({ user, showNotifications, setShowNotifications }: HeaderProps) {
  const { signOut } = useAuth()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            RackMate
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user.isAnonymous ? "Guest" : user.displayName || "User"}
              </p>
              <p className="text-xs text-gray-500">{user.isAnonymous ? "Temporary session" : user.email}</p>
            </div>

            {user.isAnonymous && (
              <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                Sign Up to Save
              </button>
            )}

            <button
              onClick={signOut}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
