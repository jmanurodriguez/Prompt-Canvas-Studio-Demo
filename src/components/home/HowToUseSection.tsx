import { motion } from 'framer-motion'
import { 
  PuzzlePieceIcon, 
  PencilSquareIcon, 
  ShareIcon, 
  SparklesIcon,
  CommandLineIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline'

const steps = [
  {
    icon: PuzzlePieceIcon,
    title: 'Construye tu Prompt',
    description: 'Arrastra y combina bloques para crear prompts potentes',
    details: [
      'Usa bloques de texto para instrucciones',
      'Añade variables para personalización',
      'Incluye opciones para diferentes casos',
      'Organiza con separadores'
    ],
    color: 'bg-blue-500'
  },
  {
    icon: PencilSquareIcon,
    title: 'Personaliza',
    description: 'Ajusta cada componente según tus necesidades',
    details: [
      'Edita el contenido de cada bloque',
      'Configura variables y opciones',
      'Añade descripciones detalladas',
      'Previsualiza los resultados'
    ],
    color: 'bg-purple-500'
  },
  {
    icon: CommandLineIcon,
    title: 'Prueba y Refina',
    description: 'Verifica y optimiza tus prompts',
    details: [
      'Prueba diferentes configuraciones',
      'Analiza los resultados',
      'Ajusta según el feedback',
      'Documenta las mejoras'
    ],
    color: 'bg-green-500'
  },
  {
    icon: ShareIcon,
    title: 'Comparte',
    description: 'Comparte tus creaciones con la comunidad',
    details: [
      'Publica en la galería',
      'Añade tags relevantes',
      'Describe casos de uso',
      'Recibe feedback'
    ],
    color: 'bg-orange-500'
  }
]

const features = [
  {
    icon: SparklesIcon,
    title: 'IA Asistente',
    description: 'Recibe sugerencias inteligentes mientras construyes tus prompts'
  },
  {
    icon: ChatBubbleBottomCenterTextIcon,
    title: 'Comunidad Activa',
    description: 'Conecta con otros creadores y comparte conocimientos'
  }
]

interface HowToUseSectionProps {
  onOpenChat: () => void
}

const HowToUseSection = ({ onOpenChat }: HowToUseSectionProps) => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 px-4"
          >
            Cómo usar Prompt Canvas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600 px-4"
          >
            Crea prompts profesionales en cuatro simples pasos
          </motion.p>
        </div>

        {/* Steps Grid - Mejorado para responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group touch-manipulation"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 transition-all duration-300 hover:shadow-lg active:shadow-inner">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${step.color} rounded-lg flex items-center justify-center mb-4`}>
                  <step.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features - Mejorado para responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-primary/5 rounded-xl p-4 md:p-6 touch-manipulation"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center">
                  <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA - Mejorado para responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 md:mt-16 space-y-3 md:space-y-4 px-4"
        >
          <button
            onClick={onOpenChat}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent 
                     text-base md:text-lg font-medium rounded-md shadow-sm text-white bg-primary 
                     hover:bg-primary/90 active:bg-primary/95 transition-colors touch-manipulation"
          >
            Unirse a la Comunidad
          </button>
          <p className="text-xs md:text-sm text-gray-500">
            Conéctate con otros creadores y comparte tus experiencias
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default HowToUseSection 