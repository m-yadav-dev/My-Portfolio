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

    // -----------------------------------------------------------------------
    // DEV PROXY — eliminates CORS during local development
    // -----------------------------------------------------------------------
    // When the frontend makes a request to "/api/chat", Vite intercepts it
    // and forwards it to http://localhost:5000/api/chat.
    //
    // This proxy ONLY runs during `npm run dev`. In production (Vercel),
    // the Axios baseURL is set to the full Render URL via VITE_API_URL,
    // so the proxy is never involved.
    // -----------------------------------------------------------------------
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
