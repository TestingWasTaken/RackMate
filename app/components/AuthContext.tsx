"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  uid: string
  email?: string | null
  displayName?: string | null
  isAnonymous?: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInAsGuest: () => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("rackmate_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("rackmate_user")
      }
    }
    setLoading(false)
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      uid: `user_${Date.now()}`,
      email,
      displayName: name,
      isAnonymous: false,
    }
    
    setUser(newUser)
    localStorage.setItem("rackmate_user", JSON.stringify(newUser))
  }

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const existingUser: User = {
      uid: `user_${Date.now()}`,
      email,
      displayName: email.split("@")[0],
      isAnonymous: false,
    }
    
    setUser(existingUser)
    localStorage.setItem("rackmate_user", JSON.stringify(existingUser))
  }

  const signInAsGuest = async () => {
    const guestUser: User = {
      uid: `guest_${Date.now()}`,
      email: null,
      displayName: null,
      isAnonymous: true,
    }
    
    setUser(guestUser)
    // Don't save guest sessions to localStorage
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("rackmate_user")
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signInAsGuest,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
