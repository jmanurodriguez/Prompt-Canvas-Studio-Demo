import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import type { PromptBlock } from '../../../types/prompt'
import { XMarkIcon, ArrowsUpDownIcon, TrashIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import AIAutocomplete from './AIAutocomplete'
import { motion } from 'framer-motion'

interface PromptBlockEditorProps {
  block: PromptBlock
  index: number
  isDragging: boolean
  onMove: (dragIndex: number, hoverIndex: number) => void
  onUpdate: (block: PromptBlock) => void
  onDragStart: () => void
  onDragEnd: () => void
  onDelete: () => void
}

const PromptBlockEditor = ({
  block,
  index,
  isDragging,
  onMove,
  onUpdate,
  onDragStart,
  onDragEnd,
  onDelete
}: PromptBlockEditorProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [showAutocomplete, setShowAutocomplete] = useState(false)

  const [{ handlerId }, drop] = useDrop({
    accept: 'PROMPT_BLOCK',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      onMove(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging: isBlockDragging }, drag] = useDrag({
    type: 'PROMPT_BLOCK',
    item: () => {
      onDragStart()
      return { id: block.id, index }
    },
    end: () => onDragEnd(),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const dragHandle = drag(drop(ref))

  const getBlockColor = () => {
    switch (block.type) {
      case 'text':
        return 'border-blue-200 bg-blue-50'
      case 'variable':
        return 'border-purple-200 bg-purple-50'
      case 'option':
        return 'border-green-200 bg-green-50'
      case 'separator':
        return 'border-gray-200 bg-gray-50'
      default:
        return 'border-gray-200 bg-white'
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onUpdate({ ...block, content: newValue })
    setShowAutocomplete(true)
  }

  const handleSelectSuggestion = (suggestion: string) => {
    onUpdate({ ...block, content: suggestion })
    setShowAutocomplete(false)
  }

  return (
    <div className="relative">
      <motion.div
        ref={dragHandle}
        role="article"
        aria-label={`Bloque de tipo ${block.type}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Delete') onDelete()
          if (e.key === 'ArrowUp') onMove(index, index - 1)
          if (e.key === 'ArrowDown') onMove(index, index + 1)
        }}
        className={`group relative border rounded-lg transition-all ${getBlockColor()}
          ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        data-handler-id={handlerId}
      >
        {/* Toolbar */}
        <div className="absolute right-2 top-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onDelete()}
            className="p-1 text-red-500 hover:bg-red-100 rounded"
            aria-label="Eliminar bloque"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
          <button
            className="p-1 text-gray-500 hover:bg-gray-100 rounded cursor-move"
            aria-label="Arrastrar para reordenar"
            role="button"
            aria-grabbed={isDragging}
          >
            <ArrowsUpDownIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4">
          {renderBlockContent()}
        </div>
      </motion.div>
      {showAutocomplete && (
        <AIAutocomplete
          currentInput={block.content}
          onSelectSuggestion={handleSelectSuggestion}
        />
      )}
    </div>
  )

  function renderBlockContent() {
    switch (block.type) {
      case 'text':
        return (
          <input
            type="text"
            value={block.content}
            onChange={handleInputChange}
            aria-label="Contenido del bloque de texto"
            className="input"
          />
        )
      case 'variable':
        return (
          <div className="space-y-2">
            <input
              type="text"
              className="input bg-white/50"
              value={block.content}
              onChange={(e) => onUpdate({ ...block, content: e.target.value })}
              placeholder="Nombre de la variable"
            />
            <input
              type="text"
              className="input bg-white/50"
              value={block.description || ''}
              onChange={(e) => onUpdate({ ...block, description: e.target.value })}
              placeholder="Descripción de la variable"
            />
          </div>
        )
      case 'option':
        return (
          <div className="space-y-2">
            <input
              type="text"
              className="input bg-white/50"
              value={block.content}
              onChange={(e) => onUpdate({ ...block, content: e.target.value })}
              placeholder="Título de las opciones"
            />
            <div className="space-y-2">
              {(block.options || []).map((option, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    className="input bg-white/50"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(block.options || [])]
                      newOptions[i] = e.target.value
                      onUpdate({ ...block, options: newOptions })
                    }}
                  />
                  <button
                    onClick={() => {
                      const newOptions = [...(block.options || [])]
                      newOptions.splice(i, 1)
                      onUpdate({ ...block, options: newOptions })
                    }}
                    className="p-2 text-red-500 hover:bg-red-100 rounded"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newOptions = [...(block.options || []), '']
                  onUpdate({ ...block, options: newOptions })
                }}
                className="w-full p-2 text-sm text-primary hover:text-primary/80 
                           border border-dashed rounded hover:bg-primary/5"
              >
                + Agregar opción
              </button>
            </div>
          </div>
        )
      case 'separator':
        return (
          <div className="border-t-2 border-gray-300 my-2" />
        )
      default:
        return null
    }
  }
}

export default PromptBlockEditor 