import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import ImageWithFallback from '../components/common/ImageWithFallback'

// Tipos mejorados
interface PromptCard {
  id: string
  title: string
  description: string
  author: {
    name: string
    avatar: string
  }
  category: string[]
  tags: string[]
  likes: number
  saves: number
  views: number
  createdAt: string
  isLiked?: boolean
  isSaved?: boolean
  preview?: string
}

// Datos de ejemplo mejorados con imágenes reales
const prompts: PromptCard[] = [
  {
    id: '1',
    title: 'Generador de Historias Creativas',
    description: 'Un prompt para generar historias cortas con elementos específicos y personajes memorables',
    author: {
      name: 'Ana García',
      avatar: 'https://ui-avatars.com/api/?name=Ana+Garcia&background=random'
    },
    category: ['Creatividad', 'Escritura'],
    tags: ['historias', 'narrativa', 'creatividad'],
    likes: 245,
    saves: 123,
    views: 1890,
    createdAt: '2024-02-15',
    preview: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc'
  },
  {
    id: '2',
    title: 'Asistente de Programación',
    description: 'Prompt especializado para ayudar en tareas de programación y debugging',
    author: {
      name: 'Carlos Ruiz',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Ruiz&background=random'
    },
    category: ['Programación'],
    tags: ['código', 'debugging', 'desarrollo'],
    likes: 189,
    saves: 87,
    views: 1234,
    createdAt: '2024-02-14',
    preview: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
  },
  {
    id: '3',
    title: 'Análisis de Datos',
    description: 'Prompt para análisis y visualización de datos complejos',
    author: {
      name: 'Laura Martínez',
      avatar: 'https://ui-avatars.com/api/?name=Laura+Martinez&background=random'
    },
    category: ['Análisis'],
    tags: ['datos', 'análisis', 'visualización'],
    likes: 156,
    saves: 92,
    views: 1567,
    createdAt: '2024-02-13',
    preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
  }
]

const categories = [
  'Todos',
  'Creatividad',
  'Programación',
  'Análisis',
  'Educación',
  'Marketing',
  'Otros'
]

const sortOptions = [
  { label: 'Más recientes', value: 'recent' },
  { label: 'Más populares', value: 'popular' },
  { label: 'Más guardados', value: 'saved' },
  { label: 'Más vistos', value: 'views' }
]

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('recent')
  const [filteredPrompts, setFilteredPrompts] = useState(prompts)
  const [isLoading, setIsLoading] = useState(false)

  // Filtrar y ordenar prompts
  useEffect(() => {
    setIsLoading(true)
    const filtered = prompts.filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'Todos' || prompt.category.includes(selectedCategory)
      
      return matchesSearch && matchesCategory
    })

    // Ordenar resultados
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes
        case 'saved':
          return b.saves - a.saves
        case 'views':
          return b.views - a.views
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    setTimeout(() => {
      setFilteredPrompts(sorted)
      setIsLoading(false)
    }, 300)
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con estadísticas */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900"
          >
            Galería de Prompts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl text-gray-600"
          >
            Explora y descubre prompts creados por la comunidad
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center gap-8"
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{prompts.length}</p>
              <p className="text-sm text-gray-500">Prompts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {prompts.reduce((acc, p) => acc + p.likes, 0)}
              </p>
              <p className="text-sm text-gray-500">Me gusta</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {prompts.reduce((acc, p) => acc + p.views, 0)}
              </p>
              <p className="text-sm text-gray-500">Visualizaciones</p>
            </div>
          </motion.div>
        </div>

        {/* Filtros - colapsables en móvil */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FunnelIcon className="w-5 h-5" />
              Filtros
            </button>
          </div>
        </div>

        {/* Grid de Prompts con estado de carga */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="loader">Cargando...</div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            >
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mensaje cuando no hay resultados */}
        {!isLoading && filteredPrompts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron prompts que coincidan con tu búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente de tarjeta individual mejorado
const PromptCard = ({ prompt }: { prompt: PromptCard }) => {
  const [isLiked, setIsLiked] = useState(prompt.isLiked)
  const [isSaved, setIsSaved] = useState(prompt.isSaved)
  const [showPreview, setShowPreview] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
    >
      <div className="relative h-48 bg-gray-100 cursor-pointer">
        <ImageWithFallback
          src={prompt.preview || ''}
          alt={prompt.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <EyeIcon className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <ImageWithFallback
            src={prompt.author.avatar}
            alt={prompt.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 line-clamp-1">{prompt.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{prompt.author.name}</span>
              <span>•</span>
              <span>{new Date(prompt.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{prompt.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-1 text-gray-600 hover:text-primary"
            >
              {isLiked ? (
                <HeartIconSolid className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span className="text-sm">{prompt.likes}</span>
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="flex items-center gap-1 text-gray-600 hover:text-primary"
            >
              <BookmarkIcon className="w-5 h-5" />
              <span className="text-sm">{prompt.saves}</span>
            </button>
            <div className="flex items-center gap-1 text-gray-600">
              <EyeIcon className="w-5 h-5" />
              <span className="text-sm">{prompt.views}</span>
            </div>
          </div>
          <button 
            className="text-gray-600 hover:text-primary"
            onClick={() => {
              // Implementar compartir
              navigator.clipboard.writeText(`${window.location.origin}/prompt/${prompt.id}`)
            }}
          >
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Gallery 