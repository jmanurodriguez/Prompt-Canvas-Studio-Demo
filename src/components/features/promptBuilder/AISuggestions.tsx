import { useState, useEffect } from 'react'
import { aiService } from '../../../services/aiService'
import type { PromptTemplate, AIExample, AISuggestion } from '../../../types/prompt'
import { LightBulbIcon, BeakerIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface AISuggestionsProps {
  prompt: PromptTemplate
  onApplySuggestion: (suggestion: string) => void
}

const AISuggestions = ({ prompt, onApplySuggestion }: AISuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([])
  const [examples, setExamples] = useState<AIExample[]>([])
  const [loading, setLoading] = useState(false)

  const loadSuggestions = async () => {
    if (!prompt.blocks.length) return

    setLoading(true)
    try {
      const [suggestionsData, examplesData] = await Promise.all([
        aiService.getSuggestions(prompt),
        aiService.getRelatedExamples(prompt)
      ])
      
      setSuggestions(suggestionsData.suggestions)
      setExamples(examplesData.examples)
    } catch (error) {
      console.error('Error al cargar sugerencias:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSuggestions()
  }, [prompt])

  const handleRegenerate = () => {
    loadSuggestions()
  }

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-sm text-gray-500">Analizando prompt...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Sugerencias de mejora */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LightBulbIcon className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-medium text-gray-900">
              Sugerencias de Mejora
            </h3>
          </div>
          <button
            onClick={handleRegenerate}
            className="p-1 text-gray-400 hover:text-primary rounded-full transition-colors"
            title="Regenerar sugerencias"
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="bg-primary/5 rounded-lg p-3">
              <h4 className="text-sm font-medium text-gray-700">
                {suggestion.type === 'clarity' && 'Mejora de claridad'}
                {suggestion.type === 'structure' && 'Mejora de estructura'}
                {suggestion.type === 'variables' && 'Mejora de variables'}
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                {suggestion.text}
              </p>
              {suggestion.explanation && (
                <p className="mt-1 text-xs text-gray-500 italic">
                  {suggestion.explanation}
                </p>
              )}
              <button
                onClick={() => onApplySuggestion(suggestion.text)}
                className="mt-2 text-sm text-primary hover:text-primary/80"
              >
                Aplicar esta sugerencia
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Ejemplos relacionados */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BeakerIcon className="w-5 h-5 text-secondary" />
          <h3 className="text-sm font-medium text-gray-900">
            Ejemplos de Uso
          </h3>
        </div>
        <div className="space-y-2">
          {examples.map((example, index) => (
            <div 
              key={index}
              className="bg-secondary/5 rounded-lg p-3"
            >
              <div className="space-y-2">
                <div>
                  <h4 className="text-xs font-medium text-gray-500">Entrada:</h4>
                  <p className="text-sm text-gray-700">{example.input}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-500">Salida:</h4>
                  <p className="text-sm text-gray-700">{example.output}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-500">Explicación:</h4>
                  <p className="text-sm text-gray-600 italic">{example.explanation}</p>
                </div>
              </div>
              <button
                onClick={() => onApplySuggestion(example.input)}
                className="mt-3 text-sm text-secondary hover:text-secondary/80"
              >
                Usar este ejemplo
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AISuggestions 