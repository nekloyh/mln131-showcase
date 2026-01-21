import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    define: {
      // Expose specific env variables to client without VITE_ prefix
      "import.meta.env.GROQ_API_KEY": JSON.stringify(env.GROQ_API_KEY || ""),
      "import.meta.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY || ""),
    },
  };
});
