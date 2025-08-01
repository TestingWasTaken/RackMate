"use client"

import { motion } from "framer-motion"
import { Dumbbell } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Dumbbell className="h-8 w-8 text-white" />
        </motion.div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading RackMate</h2>
        <p className="text-gray-500">Getting your workout data ready...</p>
      </motion.div>
    </div>
  )
}
