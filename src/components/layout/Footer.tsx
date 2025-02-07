import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo y Atribución */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src="/demo-logo.svg"
                  alt="Demo Logo"
                  className="h-16 w-auto"
                />
              </Link>
              <div className="text-center md:text-left">
                <span className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Demo Version
                </span>
              </div>
            </div>

            {/* Enlaces Rápidos */}
            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Enlaces Rápidos
              </h3>
              <div className="space-y-3">
                <Link to="/builder" className="block text-gray-600 hover:text-primary">
                  Prompt Builder
                </Link>
                <Link to="/gallery" className="block text-gray-600 hover:text-primary">
                  Galería
                </Link>
                <Link to="/learn" className="block text-gray-600 hover:text-primary">
                  Aprender
                </Link>
              </div>
            </div>

            {/* Contacto y Social */}
            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Contacto Demo
              </h3>
              <div className="space-y-3">
                <a 
                  href="#"
                  className="block text-gray-600 hover:text-primary"
                >
                  www.demo-prompt.com
                </a>
                <a 
                  href="mailto:demo@example.com"
                  className="block text-gray-600 hover:text-primary"
                >
                  demo@example.com
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-500">
                © {currentYear} Demo Prompt Studio. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 