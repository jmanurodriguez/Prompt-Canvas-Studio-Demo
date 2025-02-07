import { createContext, useContext, useState, useEffect } from 'react'
import type { User } from 'firebase/auth'
import { authService } from '../services/authService'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithGithub: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      await authService.signInWithGoogle()
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error)
      throw error
    }
  }

  const signInWithGithub = async () => {
    try {
      await authService.signInWithGithub()
    } catch (error) {
      console.error('Error al iniciar sesión con GitHub:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await authService.signOut()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithGithub,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
} 