// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  // ✅ Required for Vercel: SPA mode routing support
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },

  server: {
    port: 5173,
    open: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ✅ Ensure browser history works on Vercel
  optimizeDeps: {
    include: ["react", "react-dom"],
  }
});
