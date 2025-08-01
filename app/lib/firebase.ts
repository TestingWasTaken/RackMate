// Mock Firebase configuration for demo purposes
// In production, replace with actual Firebase config

export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: any) => void) => {
    // Mock auth state change
    return () => {}
  },
}

export const signInWithEmailAndPassword = async (auth: any, email: string, password: string) => {
  // Mock sign in
  return Promise.resolve({ user: { uid: "mock-user", email } })
}

export const createUserWithEmailAndPassword = async (auth: any, email: string, password: string) => {
  // Mock sign up
  return Promise.resolve({ user: { uid: "mock-user", email } })
}

export const updateProfile = async (user: any, profile: any) => {
  // Mock profile update
  return Promise.resolve()
}

export const signInAnonymously = async (auth: any) => {
  // Mock anonymous sign in
  return Promise.resolve({ user: { uid: "anonymous-user", isAnonymous: true } })
}
