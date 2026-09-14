// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     host: '0.0.0.0',
//     port: 3000,
//     allowedHosts: ['.loca.lt', '.ngrok-free.app'],
//     strictPort: true
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'GoCast - Auxilio Vial',
        short_name: 'GoCast',
        description: 'App para operadores de auxilio vial',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: true // 👈 Habilita el Service Worker durante desarrollo y túneles (Trycloudflare)
      }
    })
  ],
  base: './', // <--- Esto asegura que los recursos se carguen correctamente desde cualquier ruta base
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true, // <--- Permite cualquier túnel (Localtunnel/Ngrok) sin restricciones
    strictPort: true
  }
})
