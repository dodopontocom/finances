import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', 'util'], // evita que util seja pré-processado
  },
  resolve: {
    alias: {
      util: false, // bloqueia importações de 'util'
    },
  },
  define: {
    'process.env': {}, // evita erros com process.env no browser
  },
});
