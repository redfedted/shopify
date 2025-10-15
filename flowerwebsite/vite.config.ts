import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use relative base so assets work on GitHub Pages subpaths
  base: './',
  plugins: [react()],
})
