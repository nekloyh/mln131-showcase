import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Priority: .env.{mode}.local > .env.{mode} > .env.local > .env
  const env = loadEnv(mode, process.cwd(), "");
  
  const isDev = mode === "development";
  const isProd = mode === "production";

  return {
    plugins: [react(), tailwindcss()],
    
    // Path aliases for cleaner imports
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@services": path.resolve(__dirname, "./src/services"),
        "@data": path.resolve(__dirname, "./src/data"),
      },
    },
    
    // Environment variables exposed to client
    define: {
      // Expose specific env variables to client without VITE_ prefix
      "import.meta.env.GROQ_API_KEY": JSON.stringify(env.GROQ_API_KEY || ""),
      "import.meta.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY || ""),
      // App info
      "__APP_VERSION__": JSON.stringify(process.env.npm_package_version || "0.0.0"),
      "__DEV__": isDev,
      "__PROD__": isProd,
    },
    
    // Development server configuration
    server: {
      port: 5173,
      strictPort: false,
      open: false,
      cors: true,
      // Proxy API requests to backend in development
      proxy: isDev ? {
        "/api": {
          target: env.VITE_API_URL?.replace("/api", "") || "http://localhost:4000",
          changeOrigin: true,
          secure: false,
        },
      } : undefined,
    },
    
    // Preview server (for testing production build locally)
    preview: {
      port: 4173,
      strictPort: false,
    },
    
    // Build configuration
    build: {
      outDir: "dist",
      sourcemap: isDev, // Only sourcemaps in development
      minify: isProd ? "esbuild" : false,
      // Chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            ui: ["@mui/material", "@emotion/react", "@emotion/styled"],
            three: ["three", "@react-three/fiber", "@react-three/drei"],
            animation: ["framer-motion", "gsap"],
          },
        },
      },
      // Performance hints
      chunkSizeWarningLimit: 1000,
    },
    
    // Optimize dependencies
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"],
    },
    
    // Environment directory
    envDir: ".",
  };
});
