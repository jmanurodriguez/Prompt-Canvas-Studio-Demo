import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Modal from '../common/Modal'
import Toast from '../common/Toast'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { signInWithGoogle, signInWithGithub } = useAuth()
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      onClose()
    } catch (error) {
      setError('Error al iniciar sesión con Google')
      setShowToast(true)
    }
  }

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub()
      onClose()
    } catch (error) {
      setError('Error al iniciar sesión con GitHub')
      setShowToast(true)
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Iniciar Sesión"
      >
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Bienvenido a Prompt Canvas Studio
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Inicia sesión para guardar y compartir tus prompts
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-2 
                       border border-gray-300 rounded-md shadow-sm 
                       text-gray-700 bg-white hover:bg-gray-50 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <img 
                src="/google-icon.svg" 
                alt="Google" 
                className="w-5 h-5"
              />
              Continuar con Google
            </button>

            <button
              onClick={handleGithubSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-2 
                       border border-gray-300 rounded-md shadow-sm 
                       text-gray-700 bg-white hover:bg-gray-50 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <img 
                src="/github-icon.svg" 
                alt="GitHub" 
                className="w-5 h-5"
              />
              Continuar con GitHub
            </button>
          </div>
        </div>
      </Modal>

      <Toast
        show={showToast}
        type="error"
        message={error}
        onClose={() => setShowToast(false)}
      />
    </>
  )
}

export default LoginModal 