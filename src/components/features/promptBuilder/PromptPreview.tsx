import { useState } from 'react'
import type { PromptTemplate } from '../../../types/prompt'
import { 
  ClipboardDocumentIcon, 
  CheckIcon,
  EyeIcon,
  CodeBracketIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

interface PromptPreviewProps {
  template: PromptTemplate
  showMetadata?: boolean
}

type ViewMode = 'preview' | 'code' | 'raw'

const PromptPreview = ({ template, showMetadata = false }: PromptPreviewProps) => {
  const [copied, setCopied] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('preview')

  const handleCopy = async () => {
    const text = getPromptText()
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getPromptText = () => {
    return template.blocks
      .map(block => {
        switch (block.type) {
          case 'text':
            return block.content
          case 'variable':
            return `<${block.content}>`
          case 'option':
            return `[${block.options?.join('|')}]`
          case 'separator':
            return '\n'
          default:
            return ''
        }
      })
      .join(' ')
  }

  const getCodeView = () => {
    return `{
  "title": "${template.title}",
  "description": "${template.description}",
  "blocks": [
    ${template.blocks.map(block => JSON.stringify(block, null, 2)).join(',\n    ')}
  ],
  "category": ${JSON.stringify(template.category)},
  "tags": ${JSON.stringify(template.tags)}
}`
  }

  const renderContent = () => {
    switch (viewMode) {
      case 'code':
        return (
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{getCodeView()}</code>
          </pre>
        )
      case 'raw':
        return (
          <div className="font-mono bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
            {getPromptText()}
          </div>
        )
      default:
        return (
          <div className="space-y-2">
            {template.blocks.map((block, index) => {
              switch (block.type) {
                case 'text':
                  return <span key={block.id}>{block.content} </span>
                case 'variable':
                  return (
                    <span 
                      key={block.id} 
                      className="text-primary font-medium relative group"
                      title={block.description}
                    >
                      {`<${block.content}>`}{' '}
                      {block.description && (
                        <span className="absolute -top-8 left-0 bg-white px-2 py-1 rounded shadow-lg 
                                       text-xs text-gray-600 opacity-0 group-hover:opacity-100 
                                       transition-opacity whitespace-nowrap">
                          {block.description}
                        </span>
                      )}
                    </span>
                  )
                case 'option':
                  return (
                    <span key={block.id} className="text-secondary font-medium">
                      {`[${block.options?.join('|')}]`}{' '}
                    </span>
                  )
                case 'separator':
                  return <br key={block.id} />
                default:
                  return null
              }
            })}
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      {showMetadata && (
        <div className="space-y-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{template.title || 'Sin título'}</h1>
          {template.description && (
            <p className="text-gray-600">{template.description}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {template.category.map(cat => (
              <span key={cat} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {cat}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {template.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Previsualización</h2>
            <div className="flex items-center gap-2">
              {/* Vista */}
              <div className="flex rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`p-1.5 rounded ${
                    viewMode === 'preview' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  title="Vista previa"
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('code')}
                  className={`p-1.5 rounded ${
                    viewMode === 'code' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  title="Vista código"
                >
                  <CodeBracketIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('raw')}
                  className={`p-1.5 rounded ${
                    viewMode === 'raw' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  title="Vista texto plano"
                >
                  <DocumentTextIcon className="w-4 h-4" />
                </button>
              </div>
              {/* Copiar */}
              <button
                onClick={handleCopy}
                className="p-2 text-gray-500 hover:text-primary rounded-lg transition-colors"
                title="Copiar al portapapeles"
              >
                {copied ? (
                  <CheckIcon className="w-5 h-5 text-success" />
                ) : (
                  <ClipboardDocumentIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-b-lg min-h-[200px]">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default PromptPreview 