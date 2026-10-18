import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' → the built site works from any folder or sub-path (Netlify, Vercel, GitHub Pages, cPanel).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 0, // keep images as real, cacheable files
  },
});
