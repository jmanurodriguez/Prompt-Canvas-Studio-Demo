import { useState } from 'react'
import { ClipboardIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'

interface CodeBlockProps {
  children: string
  language?: string
  showCopy?: boolean
}

export const CodeBlock = ({ children, language = 'text', showCopy = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre className={`language-${language} bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto`}>
        <code>{children}</code>
      </pre>
      
      {showCopy && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-lg bg-gray-800 text-gray-400 
                     opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
          title={copied ? 'Copiado!' : 'Copiar al portapapeles'}
        >
          {copied ? (
            <ClipboardDocumentCheckIcon className="w-5 h-5" />
          ) : (
            <ClipboardIcon className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  )
} 