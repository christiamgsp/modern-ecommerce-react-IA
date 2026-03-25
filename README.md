# 🛒 SmartShop - E-commerce Intelligence

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

![Status](https://img.shields.io/badge/Status-Online-green?style=flat-square)
![UI](https://img.shields.io/badge/UI-Responsive-orange?style=flat-square)
![IA](https://img.shields.io/badge/AI-Powered-blue?style=flat-square)
![Persistence](https://img.shields.io/badge/Storage-LocalStorage-yellow?style=flat-square)

</div>

**SmartShop** es una plataforma de comercio electrónico moderna que integra un asistente de Inteligencia Artificial para mejorar la experiencia de usuario. Este proyecto destaca por su gestión eficiente del estado y persistencia de datos en tiempo real.

🚀 **[Ver Demo en Vivo](https://modern-ecommerce-react-ph12eex9c-christiamgsps-projects.vercel.app/)**

---

## 🛠️ Stack Tecnológico

He utilizado las mejores herramientas del ecosistema actual de React para garantizar rendimiento y escalabilidad:

- **Core:** `React 18` + `Vite` (Velocidad de carga extrema).
- **Estilos:** `Tailwind CSS` (Diseño moderno y totalmente responsive).
- **Navegación:** `React Router DOM` (Manejo de rutas dinámicas para productos).
- **Estado Global:** `Context API` (Sincronización total del carrito).
- **IA:** `Groq SDK` + `Llama 3` (Asistente inteligente integrado).
- **Feedback:** `Sonner` (Notificaciones elegantes de tipo Toast).
- **Iconografía:** `Lucide React` (Iconos vectoriales limpios).

---

## 🧠 Características Técnicas Destacadas

### 🤖 Asistente de IA (Smart Advisor)

Cada producto tiene acceso a un agente de IA que analiza el contexto. Gracias a las **Variables de Entorno en Vercel**, la comunicación con Groq es segura y eficiente, permitiendo al usuario preguntar detalles técnicos antes de comprar.

### 💾 Persistencia de Datos (LocalStorage)

He desarrollado un **Hook Personalizado** llamado `useLocalStorage`. Este hook intercepta el estado del carrito y lo sincroniza con el navegador, asegurando que:

1. Al cerrar la pestaña, los productos sigan ahí.
2. Al refrescar (F5), no se pierda la selección del usuario.
3. Se eviten errores de hidratación mediante validaciones de tipo `window !== "undefined"`.

### ⚡ Carga Optimizada

Implementación de **Skeletons** (`SkeletonCard`) para mejorar el _User Experience_ (UX) mientras se obtienen los datos de la API externa (DummyJSON).

---

## 📂 Estructura del Proyecto

- `/components`: Componentes reutilizables (Navbar, Cards, IA).
- `/context`: Lógica centralizada del carrito (`CartContext`).
- `/hooks`: Lógica extraída y reutilizable (`useLocalStorage`).
- `/pages`: Vistas principales (Home, Detalle, Carrito, 404).

---

## 🚀 Instalación y Uso

1.  Clona este repositorio.
2.  Instala dependencias con `npm install`.
3.  Configura tu clave en un archivo `.env`:
    `VITE_GROQ_API_KEY=tu_api_key_aqui`
4.  Lanza el proyecto con `npm run dev`.

---

Desarrollado con dedicación para mi Portfolio 🚀 - [Christiam]
