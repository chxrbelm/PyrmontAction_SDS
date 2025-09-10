// vite.config.js
import { defineConfig } from 'vite'
import vue            from '@vitejs/plugin-vue'
import vueJsx         from '@vitejs/plugin-vue-jsx'
import vueDevTools    from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),        // if you ever write <script setup lang="jsx">
    vueDevTools(),   // optional dev‑tools plugin
  ],

  resolve: {
    alias: {
      // root‑relative imports: '@/foo' → src/foo
      '@': fileURLToPath(new URL('./src', import.meta.url)),

      // feature‑first folders: '~features/news/...' etc.
      '~features': fileURLToPath(new URL('./src/features', import.meta.url)),

      // optional: shared components shortcut
      '~components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },

  server: {
    proxy: {
      // Front‑end requests to /api/*  ->  http://localhost:5000/*
      '/api': 'http://localhost:5000',
    },
  },
})
