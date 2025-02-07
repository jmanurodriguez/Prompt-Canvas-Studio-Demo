import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Para la versión demo, usamos una configuración mock
const isDemo = true;

const firebaseConfig = isDemo ? {
  // Configuración de demo/desarrollo
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
} : {
  // Configuración real (usando variables de entorno)
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Mock de servicios Firebase para demo
class MockFirebaseService {
  // Implementación básica para demo
  async signIn() { return { user: { uid: 'demo-user', displayName: 'Demo User' } } }
  async signOut() { return null }
  async getData() { return [] }
  // ... otros métodos mock según necesites
}

// Initialize Firebase o servicios mock
let app, db, auth, storage;

if (isDemo) {
  const mockService = new MockFirebaseService();
  db = mockService;
  auth = mockService;
  storage = mockService;
} else {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
}

export { db, auth, storage }
export default app 