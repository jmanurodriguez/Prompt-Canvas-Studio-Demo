import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore'
import { db } from '../config/firebase'
import type { PromptTemplate } from '../types/prompt'

const COLLECTION_NAME = 'prompts'

export const promptService = {
  // Crear un nuevo prompt
  async create(prompt: PromptTemplate): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...prompt,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'anonymous' // TODO: Reemplazar con el ID del usuario actual cuando implementemos auth
    })
    return docRef.id
  },

  // Actualizar un prompt existente
  async update(id: string, prompt: Partial<PromptTemplate>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id)
    
    // Verificar que el documento existe y pertenece al usuario
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      throw new Error('Prompt no encontrado')
    }

    const currentData = docSnap.data()
    if (currentData.userId !== prompt.userId) {
      throw new Error('No tienes permiso para editar este prompt')
    }

    await updateDoc(docRef, {
      ...prompt,
      updatedAt: new Date()
    })
  },

  // Eliminar un prompt
  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  },

  // Obtener un prompt por ID
  async getById(id: string): Promise<PromptTemplate | null> {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as PromptTemplate
    }
    return null
  },

  // Obtener todos los prompts
  async getAll(): Promise<PromptTemplate[]> {
    const q = query(
      collection(db, COLLECTION_NAME), 
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PromptTemplate[]
  },

  // Buscar prompts por categoría
  async getByCategory(category: string): Promise<PromptTemplate[]> {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('category', 'array-contains', category),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PromptTemplate[]
  },

  // Buscar prompts por tags
  async getByTag(tag: string): Promise<PromptTemplate[]> {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('tags', 'array-contains', tag),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PromptTemplate[]
  },

  // Obtener prompts del usuario actual
  async getUserPrompts(userId: string): Promise<PromptTemplate[]> {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PromptTemplate[]
  }
} 