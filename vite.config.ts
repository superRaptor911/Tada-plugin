import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: 'src/popup/popup.html',
        background: 'src/background.ts',
        content: 'src/content/content.ts',
        // popupScript: 'src/popup/popup.ts',
      },
      output: {
        entryFileNames: '[name].js',
      }
    },
    emptyOutDir: true,
  }
});
