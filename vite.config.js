import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias '@' para referenciar './src'
    },
  },
  server: {
    host: 'localhost', // Cambia si necesitas exponer en una red local
    port: 5173, // Cambia el puerto si necesitas uno específico
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend local o cualquier otro servidor
        changeOrigin: true, // Cambia el encabezado Host en las solicitudes
        rewrite: (path) => path.replace(/^\/api/, ''), // Reescribe el prefijo '/api' en las solicitudes
      },
    },
  },
  build: {
    sourcemap: false, // Desactiva mapas de fuente en producción
    outDir: 'dist', // Directorio de salida
    assetsDir: 'assets', // Carpeta para los assets dentro de dist
    rollupOptions: {
      output: {
        manualChunks: {
          // Divide dependencias grandes en archivos separados
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Asegura la pre-optimización de estas dependencias
  },
});
