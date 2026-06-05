import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // Path alias so components can import as "@/components/..." 
      // (required by shadcn/ui convention)
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173,
    // Proxy API calls to Express backend during local dev
    // Avoids CORS issues when calling http://localhost:5000
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
