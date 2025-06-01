import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/content/content.ts',
      formats: ['iife'],
      name: 'ContentScript'
    },
    rollupOptions: {
      output: {
        entryFileNames: 'content.js',
      }
    },
    emptyOutDir: false
  }
});
