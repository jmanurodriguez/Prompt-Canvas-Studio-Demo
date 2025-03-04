# React + TypeScript + Vite
# Prompt Canvas Studio - Demo Version

Prompt Canvas Studio es una aplicación web para crear, gestionar y compartir prompts de IA de manera visual e intuitiva.

## 🚀 Características

- 🎨 Constructor visual de prompts
- 📚 Galería de prompts compartidos
- 🔄 Sistema de versiones
- 📱 Diseño responsive
- 🌐 Soporte multilenguaje
- 🎯 Modo demo disponible

## 🛠️ Tecnologías

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase (con modo demo)
- React Router
- React DnD
- Framer Motion

## 📋 Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Git

## 🔧 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/prompt-canvas-studio.git
cd prompt-canvas-studio
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:

```bash
cp .env.example .env.local
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## 🚀 Despliegue

1. Construye la aplicación:

```bash
npm run build
```

2. Para desplegar en Firebase:

```bash
npm run deploy
```

## 🔄 Modo Demo

El proyecto incluye un modo demo que:
- Usa datos mock en lugar de Firebase real
- Incluye un servicio mock para autenticación
- No requiere configuración de Firebase

Para activar el modo demo:
1. Usa el archivo `.env.demo` proporcionado
2. Asegúrate de que `isDemo = true` en `src/config/firebase.ts`

## 🧹 Scripts Útiles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación
- `npm run preview`: Vista previa de la build
- `npm run lint`: Ejecuta el linter
- `npm run remove-comments`: Elimina comentarios del código

## 📁 Estructura del Proyecto

```
prompt-canvas-studio/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── config/
│   └── utils/
├── public/
└── ...
```

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles

## ✨ Agradecimientos

- A la comunidad de React
- A los contribuidores
- A todos los usuarios que hacen posible este proyecto

## 📞 Contacto Demo

- Website:https://portfolio-manu-rodriguez.web.app/
- Email: manuxs.rodriguez@gmail.com

---
⌨️ con ❤️ por  Manu Rodriguez