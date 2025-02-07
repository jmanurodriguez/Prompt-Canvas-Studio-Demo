import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { auth } from '../config/firebase'

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export const authService = {
  // Iniciar sesión con Google
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return result.user
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error)
      throw error
    }
  },

  // Iniciar sesión con GitHub
  async signInWithGithub() {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      return result.user
    } catch (error) {
      console.error('Error al iniciar sesión con GitHub:', error)
      throw error
    }
  },

  // Cerrar sesión
  async signOut() {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  },

  // Obtener usuario actual
  getCurrentUser(): User | null {
    return auth.currentUser
  },

  // Suscribirse a cambios en el estado de autenticación
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback)
  }
} 