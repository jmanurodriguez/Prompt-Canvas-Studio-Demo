import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoginModal from './LoginModal'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (!loading && !user) {
      setShowLoginModal(true)
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
        <Navigate to="/" state={{ from: location }} replace />
      </>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute 