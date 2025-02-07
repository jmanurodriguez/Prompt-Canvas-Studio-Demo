import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { promptService } from '../services/promptService'
import { Link } from 'react-router-dom'
import type { PromptTemplate } from '../types/prompt'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Toast from '../components/common/Toast'

const Profile = () => {
  const { user } = useAuth()
  const [prompts, setPrompts] = useState<PromptTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const handleDelete = async (promptId: string) => {
    try {
      await promptService.delete(promptId)
      setPrompts(prompts.filter(p => p.id !== promptId))
      showSuccessToast('Prompt eliminado correctamente')
    } catch (error) {
      showErrorToast('Error al eliminar el prompt')
    }
  }

  const showSuccessToast = (message: string) => {
    setToastType('success')
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const showErrorToast = (message: string) => {
    setToastType('error')
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Perfil del usuario */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center space-x-4">
          {user?.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || 'Usuario'} 
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-500">
                {user?.displayName?.[0] || user?.email?.[0] || 'U'}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.displayName || 'Usuario'}
            </h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Lista de prompts */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Mis Prompts
            </h2>
            <Link to="/builder" className="btn-primary">
              Crear Nuevo Prompt
            </Link>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {prompts.map(prompt => (
            <div key={prompt.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {prompt.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {prompt.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {prompt.category.map(cat => (
                      <span 
                        key={cat}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {cat}
                      </span>
                    ))}
                    {prompt.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/builder/${prompt.id}`}
                    className="p-2 text-gray-400 hover:text-primary rounded-lg transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(prompt.id)}
                    className="p-2 text-gray-400 hover:text-error rounded-lg transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Toast
        show={showToast}
        type={toastType}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}

export default Profile 