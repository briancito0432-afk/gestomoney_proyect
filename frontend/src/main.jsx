// Archivo: src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './assets/styles/global.css'
import './assets/styles/skeleton.css'
import './assets/styles/settings.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        // Estilos por defecto
        duration: 4000,
        style: {
          background: '#1c2331',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'Poppins, sans-serif',
        },
        // Estilos para éxito
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#28a745',
            secondary: '#fff',
          },
        },
        // Estilos para error
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#dc3545',
            secondary: '#fff',
          },
        },
        // Estilos para loading
        loading: {
          iconTheme: {
            primary: '#007bff',
            secondary: '#fff',
          },
        },
      }}
    />
  </React.StrictMode>,
)