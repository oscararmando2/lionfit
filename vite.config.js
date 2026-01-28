import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        users: resolve(__dirname, 'users-new.html'),
      },
    },
  },
});
