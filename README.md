# 🛒 Aplicación Full Stack de Gestión de Carritos, Usuarios y Artículos

Este proyecto es una aplicación **Full Stack** desarrollada con **LoopBack 4** en el backend y **Vite + React + TypeScript** en el frontend.  
Permite **crear, listar y eliminar usuarios y artículos**, así como **crear carritos asociados a usuarios** y **agregar o quitar artículos de cada carrito**.

---

## 🚀 Tecnologías utilizadas

### 🧩 Backend
- [LoopBack 4](https://loopback.io/doc/en/lb4/) — Framework Node.js para APIs REST robustas.  
- [MongoDB](https://www.mongodb.com/) — Base de datos NoSQL utilizada para persistir los datos.  
- [dotenv](https://www.npmjs.com/package/dotenv) — Manejo de variables de entorno.  
- TypeScript — Tipado estático para mayor seguridad en el desarrollo.  

### ⚡ Frontend
- [Vite](https://vitejs.dev/) — Herramienta moderna de build para React.  
- [React](https://react.dev/) — Librería para interfaces de usuario.  
- CSS Modules — Estilos encapsulados por componente.  
- [Axios](https://axios-http.com/) — Cliente HTTP para consumir la API del backend.  

---

## 🧠 Funcionalidades principales

### 👤 Usuarios
- Crear y eliminar usuarios.
- Listar todos los usuarios existentes.

### 📦 Artículos
- Crear y eliminar artículos.
- Visualizar artículos disponibles.

### 🛍️ Carritos
- Crear un carrito asociado a un usuario.
- Agregar o eliminar artículos dentro de un carrito.
- Mostrar el detalle de cada carrito con sus artículos, cantidades y subtotales.

---

## ⚙️ Configuración del entorno

### 1. Clonar el repositorio
```bash
git clone https://github.com/usuario/Loopback-Vite.git
cd Loopback-Vite
```

### 2. Configurar variables de entorno
Crea un archivo `.env` en la **raíz del proyecto** con el siguiente contenido:

```env
MONGO_USER=tuUsuario
MONGO_PASSWORD=tuContraseña
MONGO_DB=nombreDB
MONGO_CLUSTER=nombreCluster
MONGO_APPNAME=nombreApp
```

> 💡 El backend busca este archivo desde la raíz, así que debe ubicarse al mismo nivel que las carpetas `back/` y `front/`.

---

## ▶️ Ejecución

### 🧩 Backend (LoopBack)
Desde la carpeta `api-rest-loopback/`:

```
npm install
npm start
```

Por defecto, el servidor se iniciará en:
```
http://127.0.0.1:3000
```

### ⚡ Frontend (Vite + React)
Desde la carpeta `carrito-frontend/`:

```
npm install
npm run dev
```

El frontend se abrirá en:
```
http://localhost:5173
```

---

## 🗄️ Estructura del proyecto

```
📦 tu-proyecto/
 ┣ 📂 api-rest-loopback/ # Backend LoopBack 4
 ┃ ┣ 📂 src/
 ┃ ┃ ┣ 📂 controllers/   # Controladores REST
 ┃ ┃ ┣ 📂 datasources/   # Configuración de la base de datos MongoDB
 ┃ ┃ ┣ 📂 models/        # Modelos de datos
 ┃ ┃ ┣ 📂 repositories/  # Repositorios (acceso a datos)
 ┃ ┗ 📜 index.ts
 ┣ 📂 carrito-frontend/  # Frontend React + Vite
 ┃ ┣ 📂 src/
 ┃ ┃ ┣ 📂 components/    # Componentes reutilizables y sus estilos
 ┃ ┃ ┣ 📂 api/           # Servicios con Axios
 ┃ ┗ 📜 main.tsx
 ┣ 📜 .env               # Variables de entorno
 ┣ 📜 README.md
 ┗ 📜 package.json
```
