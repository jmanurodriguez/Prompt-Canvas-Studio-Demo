import { useDrag } from 'react-dnd'
import type { PromptBlock } from '../../../types/prompt'
import { DocumentTextIcon, CodeBracketIcon, ListBulletIcon, MinusIcon } from '@heroicons/react/24/outline'
import Tooltip from '../../common/Tooltip'

interface BlockPaletteProps {
  onAddBlock: (block: PromptBlock) => void
}

const BlockPalette = ({ onAddBlock }: BlockPaletteProps) => {
  const blockTypes = [
    {
      type: 'text',
      label: 'Texto',
      description: 'Añade un bloque de texto simple',
      icon: DocumentTextIcon,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      type: 'variable',
      label: 'Variable',
      description: 'Añade una variable personalizable',
      icon: CodeBracketIcon,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      type: 'option',
      label: 'Opciones',
      description: 'Añade una lista de opciones seleccionables',
      icon: ListBulletIcon,
      color: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      type: 'separator',
      label: 'Separador',
      description: 'Añade una línea separadora',
      icon: MinusIcon,
      color: 'bg-gray-50 text-gray-700 border-gray-200'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900" role="heading">Bloques</h2>
        <p className="text-sm text-gray-500 mt-1">
          Arrastra los bloques al área de construcción o haz clic para añadirlos
        </p>
      </div>
      <div className="p-4 space-y-3" role="list">
        {blockTypes.map((blockType) => (
          <DraggableBlock
            key={blockType.type}
            blockType={blockType}
            onAddBlock={onAddBlock}
          />
        ))}
      </div>
    </div>
  )
}

interface DraggableBlockProps {
  blockType: {
    type: PromptBlock['type']
    label: string
    icon: any
    description: string
    color: string
  }
  onAddBlock: (block: PromptBlock) => void
}

const DraggableBlock = ({ blockType, onAddBlock }: DraggableBlockProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROMPT_BLOCK',
    item: {
      type: blockType.type,
      content: '',
      id: crypto.randomUUID()
    },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onAddBlock(item as PromptBlock)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  const Icon = blockType.icon

  return (
    <Tooltip content={blockType.description}>
      <div
        ref={drag}
        role="listitem"
        tabIndex={0}
        aria-label={`Bloque de ${blockType.label}: ${blockType.description}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onAddBlock({
              id: crypto.randomUUID(),
              type: blockType.type,
              content: ''
            })
          }
        }}
        className={`p-3 rounded-lg border cursor-move transition-all
          ${blockType.color} ${isDragging ? 'opacity-50 scale-95' : 'opacity-100 hover:scale-[1.02]'}`}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
          <div>
            <h3 className="font-medium text-sm">{blockType.label}</h3>
            <p className="text-xs opacity-75">{blockType.description}</p>
          </div>
        </div>
      </div>
    </Tooltip>
  )
}

export default BlockPalette 