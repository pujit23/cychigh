import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows network access
    port: 3000, // your local port
    allowedHosts: [
      '.ngrok-free.dev' // allows any Ngrok URL automatically
    ]
  }
})