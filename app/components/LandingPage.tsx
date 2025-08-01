"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dumbbell, TrendingUp, Users, Award, Star, ChevronRight } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 overflow-hidden">
      <CustomCursor />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
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
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-6 py-8"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <div className="bg-white/20 backdrop-blur-xl p-3 rounded-2xl border border-white/30">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">RackMate</h1>
            </motion.div>

            <div className="flex space-x-4">
              <motion.button
                onClick={() => setShowLogin(true)}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button
                onClick={() => setShowSignUp(true)}
                className="bg-white text-purple-600 px-6 py-3 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-6 py-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your Fitness
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Journey
              </span>
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Track workouts, monitor progress, and achieve your fitness goals with our beautiful and intuitive app.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                onClick={() => setShowSignUp(true)}
                className="w-full bg-white text-purple-600 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started 🚀
              </motion.button>
              <motion.button
                onClick={() => setShowLogin(true)}
                className="w-full bg-white/20 backdrop-blur-sm text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl border border-white/30 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In 💪
              </motion.button>
              <motion.button
                onClick={onGuestLogin}
                className="w-full bg-white/20 backdrop-blur-sm text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl border border-white/30 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Try as Guest 👤
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="px-6 py-20"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h3
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Why Choose RackMate?
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Track Progress",
                  description: "Monitor your gains with beautiful charts and analytics",
                },
                {
                  icon: Dumbbell,
                  title: "Log Workouts",
                  description: "Easy-to-use interface for recording your exercises",
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Connect with fellow fitness enthusiasts",
                },
                {
                  icon: Award,
                  title: "Achievements",
                  description: "Unlock badges and celebrate milestones",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl border border-white/30 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl w-fit mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
                  <p className="text-white/80 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="px-6 py-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h3
              className="text-4xl md:text-5xl font-bold text-white mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              Loved by Thousands
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Fitness Enthusiast",
                  content: "RackMate transformed my workout routine. The progress tracking is incredible!",
                  rating: 5,
                },
                {
                  name: "Mike Chen",
                  role: "Personal Trainer",
                  content: "I recommend RackMate to all my clients. It's intuitive and motivating.",
                  rating: 5,
                },
                {
                  name: "Emma Davis",
                  role: "Beginner",
                  content: "Perfect for someone just starting their fitness journey. Love the design!",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl border border-white/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-300 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/90 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="px-6 py-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-white/20 backdrop-blur-xl p-12 rounded-3xl border border-white/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 2.6 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform?</h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have already started their fitness journey with RackMate.
              </p>
              <motion.button
                onClick={() => setShowSignUp(true)}
                className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Your Journey</span>
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="px-6 py-12 border-t border-white/20"
        >
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-white/20 backdrop-blur-xl p-2 rounded-xl border border-white/30">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">RackMate</h1>
            </div>
            <p className="text-white/70">© 2024 RackMate. Made with ❤️ for fitness enthusiasts everywhere.</p>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
