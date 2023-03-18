import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@services': path.resolve(__dirname, './src/services/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
    },
  },
});
