import { useState } from 'react'
import FeatureSection from '../components/home/FeatureSection'
import HowToUseSection from '../components/home/HowToUseSection'
import CommunityChat from '../components/community/CommunityChat'

const Home = () => {
  const [showChat, setShowChat] = useState(false)

  return (
    <div>
      <FeatureSection />
      <HowToUseSection onOpenChat={() => setShowChat(true)} />
      {showChat && <CommunityChat onClose={() => setShowChat(false)} />}
      {/* Otras secciones... */}
    </div>
  )
}

const FeatureCard = ({ title, description, icon }: {
  title: string
  description: string
  icon: string
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default Home 