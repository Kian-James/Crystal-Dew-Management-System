import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import imagemin from "vite-plugin-imagemin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imagemin()],
  server: {
    host: true,
    open: true,
    historyApiFallback: true,
  },

  // Image Chunking for Uploading
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
