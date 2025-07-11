import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      org: 'jsm-x9',
      project: 'javascript-react',
    }),
  ],

  server: {
    allowedHosts: ['ae45-89-217-11-126.ngrok-free.app'],
    open: '/en',
    app: {
      name: 'default', // or specify a specific browser like 'chrome', 'firefox', etc.
    },
  },

  build: {
    sourcemap: true,
  },
});
