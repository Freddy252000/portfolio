import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // three.js is large but is only loaded lazily by the 3D scenes.
    chunkSizeWarningLimit: 1000,
  },
});
