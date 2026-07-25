import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config: tells the build tool to process React (JSX) files
// and sets up local dev server behavior.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // auto-opens browser when you run `npm run dev`
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
