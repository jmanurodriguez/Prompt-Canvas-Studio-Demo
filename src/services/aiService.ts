import type { PromptTemplate } from '../types/prompt'

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const API_URL = 'https://api.openai.com/v1/chat/completions'

const CACHE_DURATION = 1000 * 60 * 60 // 1 hora
const cache = new Map<string, { data: any, timestamp: number }>()

const incrementUsage = () => {
  const today = new Date().toDateString()
  const storedDate = localStorage.getItem('aiUsageDate')
  const storedUsage = Number(localStorage.getItem('aiUsage') || '0')

  if (storedDate !== today) {
    localStorage.setItem('aiUsageDate', today)
    localStorage.setItem('aiUsage', '1')
    return true
  }

  if (storedUsage >= 100) { // Límite diario
    return false
  }

  localStorage.setItem('aiUsage', String(storedUsage + 1))
  return true
}

export const aiService = {
  async getSuggestions(prompt: PromptTemplate) {
    if (!incrementUsage()) {
      throw new Error('Has alcanzado el límite diario de solicitudes')
    }
    const cacheKey = JSON.stringify(prompt)
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Eres un experto en prompts de IA. Analiza el prompt y sugiere mejoras.
                        Tus sugerencias deben ser específicas y accionables.
                        Formato de respuesta:
                        1. Mejora de claridad: [sugerencia]
                        2. Mejora de estructura: [sugerencia]
                        3. Mejora de variables: [sugerencia]`
            },
            {
              role: 'user',
              content: `Analiza este prompt y sugiere mejoras:
                Título: ${prompt.title}
                Descripción: ${prompt.description}
                Categorías: ${prompt.category.join(', ')}
                Tags: ${prompt.tags.join(', ')}
                Prompt: ${prompt.blocks.map(b => b.content).join(' ')}`
            }
          ],
          temperature: 0.7
        })
      })

      const data = await response.json()
      
      cache.set(cacheKey, {
        data: data.choices[0].message.content,
        timestamp: Date.now()
      })
      
      return data.choices[0].message.content
    } catch (error) {
      if (error.response?.status === 429) {
        throw new Error('Has alcanzado el límite de solicitudes. Por favor, espera unos minutos.')
      }
      console.error('Error al obtener sugerencias:', error)
      throw error
    }
  },

  async getRelatedExamples(prompt: PromptTemplate) {
    if (!incrementUsage()) {
      throw new Error('Has alcanzado el límite diario de solicitudes')
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Genera 3 ejemplos de uso para este prompt en el siguiente formato JSON:
                {
                  "examples": [
                    {
                      "input": "Ejemplo de entrada",
                      "output": "Ejemplo de salida",
                      "explanation": "Breve explicación"
                    }
                  ]
                }`
            },
            {
              role: 'user',
              content: `Genera ejemplos para este prompt:
                ${prompt.blocks.map(b => b.content).join(' ')}`
            }
          ],
          temperature: 0.8
        })
      })

      const data = await response.json()
      return JSON.parse(data.choices[0].message.content)
    } catch (error) {
      if (error.response?.status === 429) {
        throw new Error('Has alcanzado el límite de solicitudes. Por favor, espera unos minutos.')
      }
      throw error
    }
  },

  async getAutocompleteSuggestions(currentInput: string) {
    if (!incrementUsage()) {
      throw new Error('Has alcanzado el límite diario de solicitudes')
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Sugiere 3 formas de completar este prompt en el siguiente formato JSON:
                {
                  "suggestions": [
                    {
                      "text": "Texto sugerido",
                      "explanation": "Por qué esta sugerencia es útil"
                    }
                  ]
                }`
            },
            {
              role: 'user',
              content: `Completa este prompt: ${currentInput}`
            }
          ],
          temperature: 0.6
        })
      })

      const data = await response.json()
      return JSON.parse(data.choices[0].message.content)
    } catch (error) {
      if (error.response?.status === 429) {
        throw new Error('Has alcanzado el límite de solicitudes. Por favor, espera unos minutos.')
      }
      throw error
    }
  }
} 