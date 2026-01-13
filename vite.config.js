import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        preventa: resolve(__dirname, 'preventa.html'),
        reparto: resolve(__dirname, 'reparto.html'),
        web: resolve(__dirname, 'web.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
