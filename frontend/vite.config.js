import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwctfr8AHf1uYqystS8YpS9FFpdpe2bfxl6X3TjcZnAWC3fwmNVLLZj_AeHFDOqd6nBGA/exec';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],server: {
    proxy: {
      '/api': {
        target: SCRIPT_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
