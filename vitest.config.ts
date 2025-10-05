import { defineConfig } from 'vitest/config';
import path from 'path';
import { config } from 'dotenv';

// This line tells dotenv to find and load the .env file from the project root.
config({ path: './.env' });

// This configuration file tells Vitest how to run your tests
// and, most importantly, how to understand your project's path aliases.
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    // ✅ THIS IS THE FIX ✅
    // We are adding the same aliases from your vite.config.ts and tsconfig.json
    // so that Vitest can correctly find and import modules like '@shared/schema'.
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
});

