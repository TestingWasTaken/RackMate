"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from "./AuthContext"

interface AuthFormsProps {
  mode: "login" | "signup"
  onBack: () => void
}

export default function AuthForms({ mode, onBack }: AuthFormsProps) {
  const { signIn, signUp } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "signup") {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords don't match!")
          return
        }
        await signUp(formData.email, formData.password, formData.name)
      } else {
        await signIn(formData.email, formData.password)
      }
    } catch (err) {
      setError(mode === "signup" ? "Failed to create account" : "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl w-full max-w-md"
        >
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <h2 className="text-2xl font-bold text-white ml-4">
              {mode === "signup" ? "Join RackMate" : "Welcome Back"}
            </h2>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-400/30 rounded-xl p-3 mb-6"
            >
              <p className="text-red-200 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-white font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
                  placeholder={mode === "signup" ? "Create a password" : "Enter your password"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label htmlFor="confirmPassword" className="block text-white font-semibold mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => updateField("confirmPassword", e.target.value)}
                      className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 border-2 border-transparent hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              <span>{loading ? "Please wait..." : mode === "signup" ? "Create Account" : "Sign In"}</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/80">
              {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={onBack}
                className="text-white font-semibold hover:underline focus:outline-none focus:underline"
              >
                {mode === "signup" ? "Sign in here" : "Sign up here"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
