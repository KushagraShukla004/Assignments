import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://shopify-backend.up.railway.app",
      "/uploads/": "https://shopify-backend.up.railway.app",
    },
  },
});
