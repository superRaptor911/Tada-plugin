import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: 'src/popup.html',
        background: 'src/background.ts',
        content: 'src/content.ts',
        popupScript: 'src/popup.ts',
      },
      output: {
        entryFileNames: '[name].js',
      }
    },
    emptyOutDir: true,
  }
});
