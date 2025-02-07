import { useState } from 'react'
import { TagIcon, FolderIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Tooltip from '../../common/Tooltip'

interface PromptMetadataProps {
  title: string
  description: string
  category: string[]
  tags: string[]
  onUpdate: (data: {
    title?: string
    description?: string
    category?: string[]
    tags?: string[]
  }) => void
}

const CATEGORIES = [
  'Generación de Texto',
  'Análisis',
  'Creatividad',
  'Programación',
  'Educación',
  'Marketing',
  'Otros'
]

const SUGGESTED_TAGS = [
  'IA',
  'GPT',
  'Escritura',
  'Análisis',
  'Código',
  'Educación',
  'Marketing',
  'SEO',
  'Creatividad',
  'Productividad'
]

const PromptMetadata = ({ title, description, category, tags, onUpdate }: PromptMetadataProps) => {
  const [newTag, setNewTag] = useState('')

  return (
    <div className="space-y-6">
      <div>
        <Tooltip content="Un título descriptivo y conciso para tu prompt">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título
          </label>
        </Tooltip>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="mt-1 input"
          aria-required="true"
        />
      </div>

      <div>
        <Tooltip content="Describe el propósito y funcionamiento de tu prompt">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
        </Tooltip>
        <textarea
          id="description"
          value={description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          className="mt-1 input"
          rows={3}
          aria-required="true"
        />
      </div>

      {/* Categorías */}
      <div className="space-y-2">
        <Tooltip content="Selecciona las categorías que mejor describan tu prompt">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FolderIcon className="w-4 h-4" />
            Categorías
          </label>
        </Tooltip>
        <div 
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Categorías disponibles"
        >
          {CATEGORIES.map((cat) => (
            <Tooltip key={cat} content={`Click para ${category.includes(cat) ? 'quitar' : 'añadir'} la categoría`}>
              <button
                onClick={() => {
                  const isSelected = category.includes(cat)
                  onUpdate({
                    category: isSelected
                      ? category.filter((c) => c !== cat)
                      : [...category, cat]
                  })
                }}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  category.includes(cat)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-pressed={category.includes(cat)}
                role="switch"
              >
                {cat}
              </button>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Tooltip content="Añade etiquetas para ayudar a otros a encontrar tu prompt">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <TagIcon className="w-4 h-4" />
            Etiquetas
          </label>
        </Tooltip>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newTag.trim()) {
                  e.preventDefault()
                  if (!tags.includes(newTag.trim())) {
                    onUpdate({ tags: [...tags, newTag.trim()] })
                  }
                  setNewTag('')
                }
              }}
              className="input flex-1"
              placeholder="Añade una etiqueta y presiona Enter"
              aria-label="Nueva etiqueta"
            />
          </div>

          {/* Tags actuales */}
          <div 
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Etiquetas actuales"
          >
            {tags.map((tag) => (
              <div
                key={tag}
                role="listitem"
                className="group flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
              >
                <span>{tag}</span>
                <button
                  onClick={() => {
                    onUpdate({ tags: tags.filter((t) => t !== tag) })
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Eliminar etiqueta ${tag}`}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Sugerencias de tags */}
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Sugerencias:</p>
            <div 
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Sugerencias de etiquetas"
            >
              {SUGGESTED_TAGS.filter(tag => !tags.includes(tag)).map((tag) => (
                <Tooltip key={tag} content="Click para añadir esta etiqueta">
                  <button
                    onClick={() => onUpdate({ tags: [...tags, tag] })}
                    className="px-2 py-1 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-600 transition-colors"
                    aria-label={`Añadir etiqueta ${tag}`}
                  >
                    + {tag}
                  </button>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptMetadata 