import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/content"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development",
    ),
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        content: resolve(__dirname, "src/content/content.tsx"),
        // style: resolve(__dirname, "src/content/content.css"), // Your Tailwind CSS entry file
      },
      output: {
        // Name the output files cleanly, without hashes
        entryFileNames: "[name].js",
        // assetFileNames: "[name].[ext]",
      },
    },
    emptyOutDir: false,
  },
});
