import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    watch: {
      // Only watch the src directory — ignore everything else in the project root
      // This prevents EBUSY crashes from locked files (Word docs, Visio, PNGs, etc.)
      ignored: (filePath) => {
        // Normalize to forward slashes for cross-platform matching
        const normalized = filePath.replace(/\\/g, '/')
        // Allow: anything inside /src/
        if (normalized.includes('/src/')) return false
        // Allow: index.html, vite.config.js, tailwind.config.js, postcss.config.js
        if (/\/(index\.html|vite\.config\.[jt]s|tailwind\.config\.[jt]s|postcss\.config\.[jt]s)$/.test(normalized)) return false
        // Ignore everything else
        return true
      },
    },
  },
})

