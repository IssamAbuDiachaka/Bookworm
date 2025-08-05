// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],     // Entry point of your app
  format: ['esm'],              // Native ESM output
  splitting: false,             // Disable code splitting for Node
  sourcemap: true,              // Good for debugging
  clean: true,                  // Clear dist/ before building
  dts: false,                   // Set to true if you want .d.ts files
  outDir: 'dist',
  target: 'es2020',             // Matches your tsconfig
});
