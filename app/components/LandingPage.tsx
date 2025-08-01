"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dumbbell, TrendingUp, Users } from "lucide-react"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import CustomCursor from "./CustomCursor"

interface LandingPageProps {
  onGuestLogin: () => void
}

export default function LandingPage({ onGuestLogin }: LandingPageProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} />
  }

  if (showSignUp) {
    return <SignUpForm onBack={() => setShowSignUp(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 relative overflow-hidden">
      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-black/10"></div>

      <CustomCursor />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/15 rounded-full"
            animate={{
              x: [0, 80, 0],
              y: [0, -80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-6 py-6"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.02 }}>
              <div className="bg-white/20 backdrop-blur-xl p-2.5 rounded-xl border border-white/30">
                <Dumbbell className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">RackMate</h1>
            </motion.div>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => setShowLogin(true)}
                className="text-white/90 hover:text-white font-medium transition-colors duration-200"
              >
                Sign In
              </button>
              <button
                onClick={onGuestLogin}
                className="text-white/90 hover:text-white font-medium transition-colors duration-200"
              >
                Try Demo
              </button>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-6 py-12"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="text-center lg:text-left">
                <motion.h2
                  className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Reach your fitness goals
                </motion.h2>

                <motion.p
                  className="text-lg text-white/90 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Track workouts, monitor progress, and stay motivated with our intuitive fitness app.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.button
                    onClick={() => setShowSignUp(true)}
                    className="bg-white text-purple-600 py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-200 border-2 border-transparent hover:border-white/20"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>

                  {/* App Store Badges */}
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                      <span className="text-white/80 text-sm font-medium">App Store</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                      <span className="text-white/80 text-sm font-medium">Google Play</span>
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  className="text-white/70 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Over 50,000 workouts logged
                </motion.p>
              </div>

              {/* Right Column - App Mockup */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative mx-auto w-80 h-96 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                  {/* Phone Frame */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full"></div>

                  {/* Mock App Interface */}
                  <div className="p-6 pt-12">
                    <div className="bg-white/20 rounded-2xl p-4 mb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                        <div>
                          <div className="w-20 h-3 bg-white/40 rounded mb-1"></div>
                          <div className="w-16 h-2 bg-white/30 rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full h-2 bg-white/30 rounded"></div>
                        <div className="w-3/4 h-2 bg-white/30 rounded"></div>
                      </div>
                    </div>

                    <div className="bg-white/20 rounded-2xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-24 h-3 bg-white/40 rounded"></div>
                        <div className="w-12 h-3 bg-blue-400 rounded"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 bg-white/30 rounded"></div>
                        <div className="h-8 bg-white/30 rounded"></div>
                        <div className="h-8 bg-white/30 rounded"></div>
                      </div>
                    </div>

                    <div className="bg-white/20 rounded-2xl p-4">
                      <div className="w-20 h-3 bg-white/40 rounded mb-3"></div>
                      <div className="h-16 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-xl"></div>
                    </div>
                  </div>

                  {/* Animated Elements */}
                  <motion.div
                    className="absolute top-20 right-4 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="absolute bottom-32 left-6 w-2 h-2 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="px-6 py-16"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Track Progress",
                  description: "Monitor your gains with detailed analytics.",
                },
                {
                  icon: Dumbbell,
                  title: "Log Workouts",
                  description: "Record exercises with our intuitive interface.",
                },
                {
                  icon: Users,
                  title: "Join Community",
                  description: "Connect with fellow fitness enthusiasts.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/80 text-lg leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="px-6 py-16"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-white/15 backdrop-blur-xl p-10 rounded-3xl border border-white/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h3 className="text-4xl font-bold text-white mb-4">Ready to start?</h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of users who have transformed their fitness with RackMate.
              </p>
              <motion.button
                onClick={() => setShowSignUp(true)}
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-200 border-2 border-transparent hover:border-white/20"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="px-6 py-8 border-t border-white/20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-xl p-2 rounded-lg border border-white/30">
                  <Dumbbell className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">RackMate</span>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <button className="text-white/70 hover:text-white transition-colors">Contact</button>
                <button className="text-white/70 hover:text-white transition-colors">Privacy</button>
                <button className="text-white/70 hover:text-white transition-colors">Terms</button>
              </div>

              <p className="text-white/60 text-sm">© 2024 RackMate</p>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
