import { useState, useEffect } from 'react'

interface AIQuotaIndicatorProps {
  onLimitReached: () => void
}

const AIQuotaIndicator = ({ onLimitReached }: AIQuotaIndicatorProps) => {
  const [usage, setUsage] = useState(0)
  const [limit] = useState(100)
  const [dailyRequests, setDailyRequests] = useState(0)

  useEffect(() => {
    // Cargar uso desde localStorage
    const storedUsage = localStorage.getItem('aiUsage')
    const storedDate = localStorage.getItem('aiUsageDate')
    const today = new Date().toDateString()

    if (storedDate === today) {
      setDailyRequests(Number(storedUsage) || 0)
    } else {
      localStorage.setItem('aiUsageDate', today)
      localStorage.setItem('aiUsage', '0')
      setDailyRequests(0)
    }
  }, [])

  const incrementUsage = () => {
    const newUsage = dailyRequests + 1
    setDailyRequests(newUsage)
    localStorage.setItem('aiUsage', String(newUsage))

    if (newUsage >= limit) {
      onLimitReached()
    }
  }

  return (
    <div className="mt-4 p-2 bg-gray-50 rounded-lg">
      <div className="flex justify-between text-xs text-gray-500">
        <span>Uso diario de IA</span>
        <span>{dailyRequests}/{limit}</span>
      </div>
      <div className="mt-1 h-1 bg-gray-200 rounded-full">
        <div 
          className={`h-full rounded-full transition-all ${
            dailyRequests >= limit ? 'bg-error' : 'bg-primary'
          }`}
          style={{ width: `${Math.min((dailyRequests/limit) * 100, 100)}%` }}
        />
      </div>
      {dailyRequests >= limit && (
        <p className="mt-1 text-xs text-error">
          Has alcanzado el límite diario
        </p>
      )}
    </div>
  )
}

export default AIQuotaIndicator 