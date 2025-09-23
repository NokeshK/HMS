import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/HMS/', // For GitHub Pages under repo subpath
  css: {
    postcss: './postcss.config.cjs'
  }
})
