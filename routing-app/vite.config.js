import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/routing-app/', // This ensures paths are correctly resolved
  build: {
    outDir: 'dist', // Output directory for the build files
  },
})
