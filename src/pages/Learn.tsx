import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  BookOpenIcon, 
  LightBulbIcon, 
  BeakerIcon, 
  StarIcon 
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import CommunityChat from '../components/community/CommunityChat'

const guides = [
  {
    title: 'Fundamentos de Prompts',
    description: 'Aprende los conceptos básicos para crear prompts efectivos',
    icon: BookOpenIcon,
    color: 'bg-blue-50 text-blue-600',
    sections: [
      'Estructura básica de un prompt',
      'Uso de variables y parámetros',
      'Mejores prácticas y consejos'
    ],
    path: '/learn/fundamentals'
  },
  {
    title: 'Técnicas Avanzadas',
    description: 'Domina técnicas avanzadas para prompts más potentes',
    icon: LightBulbIcon,
    color: 'bg-purple-50 text-purple-600',
    sections: [
      'Chain of Thought',
      'Few-shot Learning',
      'Prompt Engineering Patterns'
    ],
    path: '/learn/advanced'
  },
  {
    title: 'Casos de Uso',
    description: 'Explora ejemplos prácticos y casos de uso reales',
    icon: BeakerIcon,
    color: 'bg-green-50 text-green-600',
    sections: [
      'Generación de Contenido',
      'Análisis de Texto',
      'Asistentes Virtuales'
    ],
    path: '/learn/use-cases'
  },
  {
    title: 'Mejores Prácticas',
    description: 'Aprende de la comunidad y sus experiencias',
    icon: StarIcon,
    color: 'bg-yellow-50 text-yellow-600',
    sections: [
      'Optimización de Resultados',
      'Manejo de Errores',
      'Patrones Comunes'
    ],
    path: '/learn/best-practices'
  }
]

const Learn = () => {
  const navigate = useNavigate()
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900"
          >
            Centro de Aprendizaje
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl text-gray-600"
          >
            Domina el arte de crear prompts efectivos
          </motion.p>
        </div>

        {/* Guías */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${guide.color}`}>
                    <guide.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {guide.title}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      {guide.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  {guide.sections.map((section) => (
                    <div
                      key={section}
                      className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{section}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate(guide.path)}
                  className="mt-6 w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 
                            text-gray-700 rounded-lg transition-colors text-sm font-medium"
                >
                  Explorar Guía
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recursos Adicionales */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Quieres aprender más?
          </h2>
          <p className="text-gray-600 mb-8">
            Únete a nuestra comunidad y comparte ideas con otros creadores de prompts
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setShowChat(true)}
              className="btn-primary"
            >
              Unirte al Chat
            </button>
          </div>
        </motion.div>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <CommunityChat onClose={() => setShowChat(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Learn 