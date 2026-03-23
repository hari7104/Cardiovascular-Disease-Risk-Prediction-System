// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ✅ Required for Vercel: SPA mode routing support
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },

  server: {
    port: 5173,
    open: true,
  },


  // ✅ Ensure browser history works on Vercel
  optimizeDeps: {
    include: ["react", "react-dom"],
  }
});
