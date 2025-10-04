import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// This is the standard way to get the directory name in an ES Module environment,
// replacing the old '__dirname' which is not available.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Tells Vite that the root of the frontend application (where index.html lives)
  // is inside the 'client' folder.
  root: path.resolve(__dirname, "client"),

  // Configures the path aliases to work correctly, matching your tsconfig.json.
  // This now includes the '@assets' alias for consistency.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"), // ✅ This alias has been added
    },
  },

  // Configures the production build output.
  build: {
    // This tells Vite to place the built static files into a 'dist/public' folder,
    // which is exactly where your production server is configured to look for them.
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});

