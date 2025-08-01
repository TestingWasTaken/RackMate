"use client"

import { motion } from "framer-motion"
import { Dumbbell } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 mb-6"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Dumbbell className="h-12 w-12 text-white" />
        </motion.div>

        <motion.h2
          className="text-2xl font-bold text-white mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          Loading RackMate...
        </motion.h2>

        <p className="text-white/80">Getting your fitness data ready! 💪</p>
      </motion.div>
    </div>
  )
}
