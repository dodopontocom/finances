import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', 'util'], // apenas exclui da otimização, não bloqueia
  },
  resolve: {
    alias: {
      util: require.resolve('util/'), // ← substitui 'false' por um polyfill funcional
    },
  },
  define: {
    'process.env': {}, // segurança contra erros em libs que esperam 'process'
  },
});
