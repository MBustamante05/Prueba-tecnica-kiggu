# Proyecto de Gestión de Tareas

Este es un proyecto de gestión de tareas construido con **React y TypeScript**. Permite a los usuarios agregar, editar y eliminar tareas, además de actualizar su estado de manera interactiva.

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) o [pnpm](https://pnpm.io/es/)

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/MBustamante05/Prueba-tecnica-kiggu
   ```

2. Instala las dependencias necesarias:
   ```sh
   npm install
   # o con yarn
   yarn install
   # o con pnpm
   pnpm install
   ```

## Configuración

Este proyecto utiliza un backend que expone una API para manejar las tareas. Asegúrate de configurar correctamente la URL del backend en `axiosInstance.ts` dentro de la carpeta `utils`.

```ts
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Ajusta esta URL según tu backend
  withCredentials: true
});
```

Si estás usando un servidor distinto, actualiza `baseURL` con la dirección correcta.

## Ejecución

Para iniciar el proyecto en modo desarrollo, usa el siguiente comando:

```sh
npm run dev
# o con yarn
yarn dev
```

Esto abrirá la aplicación en `http://localhost:5173` (o el puerto que Vite asigne).

## Funcionalidades Principales

- **Agregar tareas**: Ingresa un título, descripción y estado.
- **Editar tareas**: Modifica los detalles de cualquier tarea.
- **Eliminar tareas**: Borra tareas de la lista.
- **Actualizar estado**: Cambia el estado de una tarea con un checkbox sin necesidad de enviar el formulario.
- **Persistencia de datos**: La aplicación se comunica con un backend para guardar y recuperar tareas.

## Tecnologías Utilizadas

- **React** con **TypeScript**
- **Vite** como herramienta de desarrollo
- **Axios** para solicitudes HTTP
- **TailwindCSS** para estilos
- **React Hot Toast** para notificaciones

¡Gracias por usar este proyecto! 🚀

