import { motion } from 'framer-motion'
import { 
  WrenchScrewdriverIcon, 
  ShareIcon, 
  AcademicCapIcon, 
  CodeBracketIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    title: 'Construye',
    description: 'Crea prompts potentes y reutilizables con nuestro constructor visual',
    icon: WrenchScrewdriverIcon,
    color: 'bg-primary/10 text-primary',
    delay: 0
  },
  {
    title: 'Comparte',
    description: 'Comparte tus prompts con la comunidad y descubre los de otros',
    icon: ShareIcon,
    color: 'bg-secondary/10 text-secondary',
    delay: 0.2
  },
  {
    title: 'Aprende',
    description: 'Mejora tus habilidades con ejemplos y guías de la comunidad',
    icon: AcademicCapIcon,
    color: 'bg-accent/10 text-accent',
    delay: 0.4
  }
]

const FeatureSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900"
          >
            Tu plataforma para prompts de IA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl text-gray-600"
          >
            Todo lo que necesitas para crear, compartir y aprender sobre prompts
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay }}
              whileHover={{ scale: 1.05 }}
              className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {feature.description}
              </p>
              <motion.div
                className="absolute inset-0 border-2 border-primary rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ pointerEvents: 'none' }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="/builder"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            Empezar a Construir
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureSection 