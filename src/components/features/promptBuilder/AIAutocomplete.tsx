import { useState, useEffect } from 'react'
import { aiService } from '../../../services/aiService'

interface AIAutocompleteProps {
  currentInput: string
  onSelectSuggestion: (suggestion: string) => void
}

const AIAutocomplete = ({ currentInput, onSelectSuggestion }: AIAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadSuggestions = async () => {
      if (currentInput.length < 3) return // Mínimo 3 caracteres

      setLoading(true)
      try {
        const result = await aiService.getAutocompleteSuggestions(currentInput)
        setSuggestions(result)
      } catch (error) {
        console.error('Error al cargar sugerencias:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(loadSuggestions, 500)
    return () => clearTimeout(debounceTimer)
  }, [currentInput])

  if (!suggestions.length || !currentInput.length) return null

  return (
    <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
      {loading ? (
        <div className="p-2 text-center text-sm text-gray-500">
          Cargando sugerencias...
        </div>
      ) : (
        <ul className="py-1">
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                onClick={() => onSelectSuggestion(suggestion)}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AIAutocomplete 