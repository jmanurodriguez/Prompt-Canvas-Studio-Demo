import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PaperAirplaneIcon, 
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  HashtagIcon,
  UsersIcon,
  FaceSmileIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/AuthContext'

interface Message {
  id: string
  text: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  timestamp: Date
  tags?: string[]
}

interface Channel {
  id: string
  name: string
  description: string
}

interface Participant {
  id: string
  name: string
  avatar?: string
  status: 'online' | 'away' | 'offline'
  lastSeen?: Date
}

interface ChannelMessages {
  [channelId: string]: Message[]
}

interface ChannelParticipants {
  [channelId: string]: Participant[]
}

const channels: Channel[] = [
  {
    id: 'general',
    name: 'General',
    description: 'Discusión general sobre prompts y IA',
  },
  {
    id: 'ideas',
    name: 'Ideas y Sugerencias',
    description: 'Comparte tus ideas para prompts',
  },
  {
    id: 'ayuda',
    name: 'Ayuda',
    description: 'Obtén ayuda de la comunidad',
  }
]

const mockParticipants: Participant[] = [
  {
    id: '1',
    name: 'Ana García',
    avatar: 'https://ui-avatars.com/api/?name=Ana+Garcia&background=random',
    status: 'online'
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Ruiz&background=random',
    status: 'online'
  },
  {
    id: '3',
    name: 'Laura Martínez',
    avatar: 'https://ui-avatars.com/api/?name=Laura+Martinez&background=random',
    status: 'away',
    lastSeen: new Date()
  }
  // ... más participantes
]

const commonEmojis = [
  '😊', '👍', '❤️', '🎉', '🤔', '👏', 
  '🔥', '✨', '💡', '📝', '💪', '🚀',
  '🎯', '💯', '🌟', '👨‍💻', '🤝', '💭'
]

const CommunityChat = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuth()
  const [messagesByChannel, setMessagesByChannel] = useState<ChannelMessages>({
    general: [
      {
        id: '1',
        text: '¡Bienvenidos al canal general! Aquí pueden discutir sobre cualquier tema relacionado con prompts y IA.',
        author: {
          id: 'system',
          name: 'Sistema',
          avatar: undefined
        },
        timestamp: new Date(),
        tags: ['bienvenida']
      }
    ],
    ideas: [
      {
        id: '1',
        text: '¡Bienvenidos al canal de ideas! Compartan sus ideas y sugerencias para prompts innovadores.',
        author: {
          id: 'system',
          name: 'Sistema',
          avatar: undefined
        },
        timestamp: new Date(),
        tags: ['bienvenida']
      }
    ],
    ayuda: [
      {
        id: '1',
        text: '¡Bienvenidos al canal de ayuda! Aquí pueden hacer preguntas y obtener asistencia de la comunidad.',
        author: {
          id: 'system',
          name: 'Sistema',
          avatar: undefined
        },
        timestamp: new Date(),
        tags: ['bienvenida']
      }
    ]
  })
  const [newMessage, setNewMessage] = useState('')
  const [selectedChannel, setSelectedChannel] = useState(channels[0])
  const [showParticipants, setShowParticipants] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [participantsByChannel, setParticipantsByChannel] = useState<ChannelParticipants>({
    general: mockParticipants,
    ideas: mockParticipants.slice(0, 2),
    ayuda: mockParticipants.slice(1)
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messagesByChannel[selectedChannel.id]])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: crypto.randomUUID(),
      text: newMessage,
      author: {
        id: user?.uid || 'anonymous',
        name: user?.displayName || 'Anónimo',
        avatar: user?.photoURL
      },
      timestamp: new Date(),
      tags: extractTags(newMessage)
    }

    setMessagesByChannel(prev => ({
      ...prev,
      [selectedChannel.id]: [...(prev[selectedChannel.id] || []), message]
    }))
    setNewMessage('')
  }

  const extractTags = (text: string): string[] => {
    const tags = text.match(/#[\w-]+/g)
    return tags ? tags.map(tag => tag.slice(1)) : []
  }

  const activeParticipants = participantsByChannel[selectedChannel.id] || []
  const onlineParticipants = activeParticipants.filter(p => p.status === 'online')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-0 sm:p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full h-full sm:h-[80vh] sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] 
                   sm:max-w-6xl sm:rounded-xl shadow-xl flex flex-col sm:flex-row overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Sidebar - colapsable en móviles */}
        <div className="w-full sm:w-64 bg-gray-50 border-b sm:border-b-0 sm:border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Canales</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel)}
                className={`w-full p-3 rounded-lg text-left transition-colors mb-1
                  ${selectedChannel.id === channel.id
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <HashtagIcon className="w-5 h-5" />
                  <span className="font-medium">{channel.name}</span>
                </div>
                <p className={`text-sm mt-1 ${
                  selectedChannel.id === channel.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {channel.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Channel Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                #{selectedChannel.name}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedChannel.description}
              </p>
            </div>
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
            >
              <UsersIcon className="w-5 h-5" />
              <span>{activeParticipants.length} participantes ({onlineParticipants.length} en línea)</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messagesByChannel[selectedChannel.id]?.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  {message.author.avatar ? (
                    <img
                      src={message.author.avatar}
                      alt={message.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <UserCircleIcon className="w-8 h-8 text-gray-400" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {message.author.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{message.text}</p>
                    {message.tags && message.tags.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {message.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs text-primary hover:text-primary/80 cursor-pointer"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex gap-2 items-center">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  <FaceSmileIcon className="w-6 h-6" />
                </button>
                
                {showEmojiPicker && (
                  <div className="absolute bottom-full mb-2 bg-white rounded-lg shadow-lg p-2 border">
                    <div className="grid grid-cols-6 gap-1">
                      {commonEmojis.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const input = inputRef.current
                            if (!input) return
                            
                            const start = input.selectionStart || 0
                            const end = input.selectionEnd || 0
                            const text = newMessage
                            
                            const newText = text.substring(0, start) + emoji + text.substring(end)
                            setNewMessage(newText)
                            
                            setTimeout(() => {
                              input.focus()
                              input.setSelectionRange(start + emoji.length, start + emoji.length)
                            }, 0)
                            
                            setShowEmojiPicker(false)
                          }}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje... Usa #tags para categorizar"
                className="flex-1 input"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="btn-primary px-4"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Participants Sidebar */}
        <AnimatePresence>
          {showParticipants && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 250, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-gray-50 border-l border-gray-200 flex flex-col"
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  Participantes ({onlineParticipants.length} en línea)
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {activeParticipants.map(participant => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <div className="relative">
                      {participant.avatar ? (
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <UserCircleIcon className="w-8 h-8 text-gray-400" />
                      )}
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                          ${participant.status === 'online' ? 'bg-green-500' : 
                            participant.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {participant.name}
                      </p>
                      {participant.status !== 'online' && participant.lastSeen && (
                        <p className="text-xs text-gray-500">
                          Visto: {participant.lastSeen.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default CommunityChat 