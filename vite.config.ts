import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Use /echoes/ only when explicitly building for GitHub Pages.
  // Vercel (and local dev) use the root path.
  base: process.env.GITHUB_PAGES === 'true' ? '/echoes/' : '/',

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  plugins: [react()],

  // Do NOT define VITE_OPENROUTER_API_KEY_* here.
  // Those keys now live in server-side env vars (OPENROUTER_API_KEY_*) and are
  // only accessed by the /api/debate serverless function — never the client bundle.

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
