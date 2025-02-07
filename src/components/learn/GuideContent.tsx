import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GuideContentProps {
  title: string
  description: string
  children: ReactNode
}

const GuideContent = ({ title, description, children }: GuideContentProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-lg max-w-none"
      >
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        {children}
      </motion.div>
    </div>
  )
}

export default GuideContent 