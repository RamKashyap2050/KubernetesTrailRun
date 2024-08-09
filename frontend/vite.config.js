import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // This should be the default
  },
  server: {
    proxy: {
      '/users': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/items': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      }
    }
  }
})
