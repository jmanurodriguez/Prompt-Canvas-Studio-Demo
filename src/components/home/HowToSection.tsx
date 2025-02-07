import { motion } from 'framer-motion'
import {
  Square3Stack3DIcon,
  PuzzlePieceIcon,
  PencilSquareIcon,
  ShareIcon
} from '@heroicons/react/24/outline'

const steps = [
  {
    title: 'Elige tus bloques',
    description: 'Selecciona entre texto, variables y opciones para construir tu prompt',
    icon: PuzzlePieceIcon,
    color: 'bg-blue-50 text-blue-600',
    delay: 0,
    preview: '/images/step1-blocks.png'
  },
  {
    title: 'Personaliza',
    description: 'Edita el contenido y ajusta las opciones según tus necesidades',
    icon: PencilSquareIcon,
    color: 'bg-purple-50 text-purple-600',
    delay: 0.2,
    preview: '/images/step2-customize.png'
  },
  {
    title: 'Organiza',
    description: 'Arrastra y ordena los bloques para estructurar tu prompt',
    icon: Square3Stack3DIcon,
    color: 'bg-green-50 text-green-600',
    delay: 0.4,
    preview: '/images/step3-organize.png'
  },
  {
    title: 'Comparte',
    description: 'Publica tu prompt y compártelo con la comunidad',
    icon: ShareIcon,
    color: 'bg-orange-50 text-orange-600',
    delay: 0.6,
    preview: '/images/step4-share.png'
  }
]

const HowToSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900"
          >
            Cómo usar Prompt Canvas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl text-gray-600"
          >
            Construye prompts profesionales en cuatro simples pasos
          </motion.p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.delay }}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              {/* Texto e icono */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:order-2'}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${step.color} shrink-0`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <motion.div
                className={`w-full md:w-1/2 ${index % 2 === 0 ? '' : 'md:order-1'}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={step.preview}
                    alt={`Paso ${index + 1}: ${step.title}`}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="/builder"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            Probar Ahora
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default HowToSection 