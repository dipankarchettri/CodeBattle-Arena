import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url"; // <-- NEW: Import the url helper

// --- NEW: Recreate __dirname for ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- End of New Code ---

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Your 'vite.config.ts' is in the root folder, and your app's entry point
  // (index.html) is inside the 'client' folder. This tells Vite where to look.
  root: path.resolve(__dirname, "client"),

  // This configures the aliases to correctly point to your source folders.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },

  // This tells Vite where to put the built files when you run 'npm run build'.
  // The output will be a 'dist' folder in your project's root directory.
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },

  server: {
    // No special server config is needed for local development.
  },
});

