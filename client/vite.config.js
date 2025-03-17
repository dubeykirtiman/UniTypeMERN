import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  server: {
    port: 5173,
    strictPort: true,
    open: true,
  },
});
