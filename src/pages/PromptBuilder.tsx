import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import type { PromptBlock, PromptTemplate } from '../types/prompt'
import BlockPalette from '../components/features/promptBuilder/BlockPalette'
import BuilderCanvas from '../components/features/promptBuilder/BuilderCanvas'
import PromptPreview from '../components/features/promptBuilder/PromptPreview'
import PromptMetadata from '../components/features/promptBuilder/PromptMetadata'
import Modal from '../components/common/Modal'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Toast from '../components/common/Toast'
import { promptService } from '../services/promptService'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import AISuggestions from '../components/features/promptBuilder/AISuggestions'
import AIQuotaIndicator from '../components/features/promptBuilder/AIQuotaIndicator'
import Tooltip from '../components/common/Tooltip'
import GuidePopover from '../components/common/GuidePopover'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'

const PromptBuilder = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [template, setTemplate] = useState<PromptTemplate>({
    id: crypto.randomUUID(),
    title: '',
    description: '',
    blocks: [],
    category: [],
    tags: []
  })

  const [showPreview, setShowPreview] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const handleAddBlock = (block: PromptBlock) => {
    setTemplate(prev => ({
      ...prev,
      blocks: [...prev.blocks, block]
    }))
  }

  const handleUpdateBlock = (blockId: string, updatedBlock: PromptBlock) => {
    setTemplate(prev => ({
      ...prev,
      blocks: prev.blocks.map(block => 
        block.id === blockId ? updatedBlock : block
      )
    }))
  }

  const handleUpdateMetadata = (data: Partial<PromptTemplate>) => {
    setTemplate(prev => ({
      ...prev,
      ...data
    }))
  }

  // Función para validar el prompt
  const validatePrompt = () => {
    const validationErrors: string[] = []

    if (!template.title.trim()) {
      validationErrors.push('El título es obligatorio')
    }

    if (!template.description.trim()) {
      validationErrors.push('La descripción es obligatoria')
    }

    if (template.blocks.length === 0) {
      validationErrors.push('Debes añadir al menos un bloque')
    }

    if (template.category.length === 0) {
      validationErrors.push('Selecciona al menos una categoría')
    }

    setErrors(validationErrors)
    return validationErrors.length === 0
  }

  const showErrorToast = (message: string) => {
    setToastType('error')
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const showSuccessToast = (message: string) => {
    setToastType('success')
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Actualizar el estado de cambios sin guardar
  useEffect(() => {
    setHasUnsavedChanges(true)
  }, [template])

  // Prevenir salir de la página con cambios sin guardar
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  // Cargar prompt existente si estamos editando
  useEffect(() => {
    const loadPrompt = async () => {
      if (id) {
        try {
          const existingPrompt = await promptService.getById(id)
          if (existingPrompt) {
            // Verificar que el usuario sea el propietario
            if (existingPrompt.userId !== user?.uid) {
              showErrorToast('No tienes permiso para editar este prompt')
              navigate('/profile')
              return
            }
            setTemplate(existingPrompt)
          } else {
            showErrorToast('Prompt no encontrado')
            navigate('/profile')
          }
        } catch (error) {
          console.error('Error al cargar el prompt:', error)
          showErrorToast('Error al cargar el prompt')
        }
      }
    }

    loadPrompt()
  }, [id, user?.uid])

  const handleSave = async () => {
    if (!validatePrompt()) {
      showErrorToast('Por favor, corrige los errores antes de guardar')
      return
    }

    setShowSaveModal(true)
  }

  const savePrompt = async () => {
    try {
      if (!validatePrompt()) {
        showErrorToast('Por favor, corrige los errores antes de guardar')
        return
      }

      const promptData = {
        ...template,
        userId: user?.uid,
        userEmail: user?.email,
        userName: user?.displayName
      }

      let promptId
      if (id) {
        // Actualizar prompt existente
        await promptService.update(id, promptData)
        promptId = id
      } else {
        // Crear nuevo prompt
        promptId = await promptService.create(promptData)
      }

      showSuccessToast('Prompt guardado correctamente')
      setHasUnsavedChanges(false)
      setShowSaveModal(false)

      // Redirigir a la vista del prompt
      navigate(`/prompts/${promptId}`)
    } catch (error) {
      console.error('Error al guardar:', error)
      showErrorToast('Error al guardar el prompt')
    }
  }

  useKeyboardShortcuts([
    {
      key: 's',
      ctrl: true,
      action: () => {
        if (hasUnsavedChanges) handleSave()
      }
    },
    {
      key: 'p',
      ctrl: true,
      action: () => setShowPreview(prev => !prev)
    },
    {
      key: 'z',
      ctrl: true,
      action: () => {
        // Implementar undo
      }
    },
    {
      key: 'y',
      ctrl: true,
      action: () => {
        // Implementar redo
      }
    }
  ])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-[calc(100vh-10rem)]">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="w-full px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Constructor de Prompt
                  </h1>
                  <GuidePopover
                    title="Guía de uso del Constructor"
                    steps={[
                      {
                        title: 'Añade bloques',
                        description: 'Arrastra bloques desde la paleta a la izquierda'
                      },
                      {
                        title: 'Personaliza el contenido',
                        description: 'Edita el texto y las opciones de cada bloque'
                      },
                      {
                        title: 'Organiza el prompt',
                        description: 'Arrastra los bloques para reordenarlos'
                      },
                      {
                        title: 'Previsualiza y guarda',
                        description: 'Revisa cómo se ve tu prompt y guárdalo cuando esté listo'
                      }
                    ]}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Crea y personaliza tu prompt arrastrando bloques
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Tooltip content="Vista previa (Ctrl+P)">
                  <button 
                    className="btn-secondary"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? 'Editar' : 'Vista previa'}
                  </button>
                </Tooltip>
                <Tooltip content="Guardar prompt (Ctrl+S)">
                  <button 
                    className="btn-primary"
                    onClick={handleSave}
                  >
                    Guardar Prompt
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Paleta de bloques */}
            <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
              <div className="p-4 sticky top-0">
                <BlockPalette onAddBlock={handleAddBlock} />
              </div>
            </div>

            {/* Área de construcción */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              <div className="p-6">
                {showPreview ? (
                  <PromptPreview 
                    template={template}
                    showMetadata
                  />
                ) : (
                  <div className="space-y-6">
                    <div className="card">
                      <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                          Información del Prompt
                        </h2>
                      </div>
                      <div className="p-4">
                        <PromptMetadata
                          title={template.title}
                          description={template.description}
                          category={template.category}
                          tags={template.tags}
                          onUpdate={handleUpdateMetadata}
                        />
                      </div>
                    </div>

                    <BuilderCanvas 
                      blocks={template.blocks}
                      onUpdateBlock={handleUpdateBlock}
                      onReorderBlocks={(blocks) => handleUpdateMetadata({ blocks })}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Previsualización en tiempo real */}
            <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
              <div className="p-4 space-y-8">
                <PromptPreview template={template} />
                
                {/* Sugerencias de IA */}
                <AISuggestions 
                  prompt={template}
                  onApplySuggestion={(suggestion) => {
                    const newBlock = {
                      id: crypto.randomUUID(),
                      type: 'text',
                      content: suggestion
                    }
                    setTemplate(prev => ({
                      ...prev,
                      blocks: [...prev.blocks, newBlock]
                    }))
                  }}
                />

                {/* Indicador de cuota */}
                <AIQuotaIndicator 
                  onLimitReached={() => {
                    showErrorToast('Has alcanzado el límite diario de solicitudes de IA')
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de guardado */}
      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Guardar Prompt"
        footer={
          <div className="flex justify-end gap-3">
            <button
              className="btn-secondary"
              onClick={() => setShowSaveModal(false)}
            >
              Cancelar
            </button>
            <button
              className="btn-primary"
              onClick={savePrompt}
            >
              Guardar
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {errors.length > 0 && (
            <div className="bg-error/10 text-error rounded-lg p-4">
              <h4 className="font-medium mb-2">Por favor, corrige los siguientes errores:</h4>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">
                ¿Estás seguro de que quieres guardar este prompt?
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Una vez guardado, estará disponible en la galería para otros usuarios.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-sm text-gray-900">Resumen:</h4>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>• Título: {template.title}</li>
              <li>• Categorías: {template.category.join(', ')}</li>
              <li>• Etiquetas: {template.tags.join(', ')}</li>
              <li>• Bloques: {template.blocks.length}</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Toast notifications */}
      <Toast
        show={showToast}
        type={toastType}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </DndProvider>
  )
}

export default PromptBuilder 