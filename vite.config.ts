import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@services': path.resolve(__dirname, './src/services/'),
      '@views': path.resolve(__dirname, './src/views/'),
      '@blockchain': path.resolve(__dirname, './src/blockchain/'),
    },
  },
});
