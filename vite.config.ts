import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // The app announces a new version instead of swapping it in silently:
      // see src/pwa.ts. `injectRegister: null` because that module registers
      // the worker itself — the injected snippet would do it a second time.
      registerType: 'prompt',
      injectRegister: null,
      workbox: {
        // Web Push handlers live in public/push-sw.js
        importScripts: ['push-sw.js'],
      },
      manifest: {
        name: 'Voice Shopping List',
        short_name: 'ShopList',
        description: 'Shared shopping lists with voice input',
        theme_color: '#2e7d32',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
        // Long-press the home screen icon to land straight in dictation
        // instead of on the list.
        shortcuts: [
          {
            name: 'Продиктовать список',
            short_name: 'Микрофон',
            description: 'Открыть приложение с включённым микрофоном',
            url: '/?mic=1',
            icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
          },
        ],
        // Makes the app a target for "Share" from notes, chats and browsers:
        // the shared text opens in the import screen, already parsed.
        share_target: {
          action: '/',
          method: 'GET',
          params: { title: 'title', text: 'text', url: 'url' },
        },
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
      },
    },
  },
})
