import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://shopifyi.netlify.app",
      "/uploads/": "https://shopifyi.netlify.app",
    },
  },
});
