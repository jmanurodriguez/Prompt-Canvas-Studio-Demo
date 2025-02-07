export interface PromptBlock {
  id: string
  type: 'text' | 'variable' | 'option' | 'separator'
  content: string
  options?: string[]
  description?: string
}

export interface PromptTemplate {
  id: string
  title: string
  description: string
  blocks: PromptBlock[]
  category: string[]
  tags: string[]
  userId?: string
  userEmail?: string
  userName?: string
  createdAt?: Date
  updatedAt?: Date
}


export interface AISuggestion {
  type: 'clarity' | 'structure' | 'variables'
  text: string
  explanation?: string
}

export interface AIExample {
  input: string
  output: string
  explanation: string
}

export interface AIAutocompleteSuggestion {
  text: string
  explanation: string
}

export interface AIResponse {
  suggestions: AISuggestion[]
  examples: AIExample[]
} 