import { useDrop } from 'react-dnd'
import { useState } from 'react'
import type { PromptBlock } from '../../../types/prompt'
import PromptBlockEditor from './PromptBlockEditor'
import { PlusIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

interface BuilderCanvasProps {
  blocks: PromptBlock[]
  onUpdateBlock: (blockId: string, block: PromptBlock) => void
  onReorderBlocks: (blocks: PromptBlock[]) => void
}

const BuilderCanvas = ({ blocks, onUpdateBlock, onReorderBlocks }: BuilderCanvasProps) => {
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROMPT_BLOCK',
    drop: () => ({ name: 'BuilderCanvas' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const moveBlock = (dragIndex: number, hoverIndex: number) => {
    const newBlocks = [...blocks]
    const draggedBlock = newBlocks[dragIndex]
    newBlocks.splice(dragIndex, 1)
    newBlocks.splice(hoverIndex, 0, draggedBlock)
    onReorderBlocks(newBlocks)
  }

  const handleDeleteBlock = (blockId: string) => {
    const newBlocks = blocks.filter(b => b.id !== blockId)
    onReorderBlocks(newBlocks)
  }

  return (
    <div 
      ref={drop}
      className={`card transition-all ${
        isOver ? 'bg-primary/5 scale-[1.01] border-primary' : 'bg-white'
      }`}
    >
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Área de Construcción</h2>
        <p className="text-sm text-gray-500 mt-1">
          Arrastra y ordena los bloques para construir tu prompt
        </p>
      </div>

      <div className="p-4">
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <PlusIcon className="w-12 h-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Arrastra bloques aquí para comenzar
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {blocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                >
                  <PromptBlockEditor
                    block={block}
                    index={index}
                    isDragging={block.id === draggedBlockId}
                    onMove={moveBlock}
                    onUpdate={(updatedBlock) => onUpdateBlock(block.id, updatedBlock)}
                    onDragStart={() => {
                      setDraggedBlockId(block.id)
                      setIsDragging(true)
                    }}
                    onDragEnd={() => {
                      setDraggedBlockId(null)
                      setIsDragging(false)
                    }}
                    onDelete={() => handleDeleteBlock(block.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

export default BuilderCanvas 