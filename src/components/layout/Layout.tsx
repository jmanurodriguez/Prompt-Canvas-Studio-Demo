import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import LoginModal from '../auth/LoginModal'
import { UserCircleIcon } from '@heroicons/react/24/outline'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { user, signOut } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Prompt Builder', href: '/builder' },
    { name: 'Galería', href: '/gallery' },
    { name: 'Aprender', href: '/learn' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-40">
            {/* Logo */}
            <div className="flex items-center h-full overflow-visible">
              <Link to="/" className="flex items-center relative -ml-8">
                <img 
                  src="/demo-logo.png"
                  alt="Demo Logo"
                  className="h-64 w-auto transform -translate-y-4"
                />
              </Link>
            </div>

            {/* Navegación */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-600 hover:text-primary transition-colors font-medium relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                </Link>
              ))}
            </div>

            {/* Botón de login/perfil */}
            <div className="flex items-center">
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || 'Usuario'} 
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <UserCircleIcon className="w-8 h-8" />
                    )}
                    <span>{user.displayName || 'Usuario'}</span>
                  </button>

                  {/* Menú desplegable */}
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible
                                group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Mi Perfil
                    </Link>
                    <Link 
                      to="/my-prompts" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Mis Prompts
                    </Link>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="btn-primary"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  )
}

export default Layout 