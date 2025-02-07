import { useState } from 'react'
import { useFloating, offset, shift, flip, arrow } from '@floating-ui/react'

interface TooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const Tooltip = ({ content, children, position = 'top' }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles } = useFloating({
    placement: position,
    middleware: [offset(8), shift(), flip()],
  })

  return (
    <div className="relative inline-block">
      <div
        ref={refs.setReference}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap"
        >
          {content}
        </div>
      )}
    </div>
  )
}

export default Tooltip 