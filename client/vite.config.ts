import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // אל תוסיף CSS config כאן - נשתמש ب-postcss.config.js במקום
})

