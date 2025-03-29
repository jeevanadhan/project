import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows network access
    port: 5174,  // Change the port if needed
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
