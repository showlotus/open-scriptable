import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';
import { removeTypesPlugin } from './plugins/remove-types';

const input = readdirSync('./src')
  .filter(file => file.endsWith('.ts'))
  .reduce(
    (acc, file) => {
      const name = file.replace('.ts', '');
      acc[name] = resolve('./src', file);
      return acc;
    },
    {} as Record<string, string>,
  );

export default defineConfig({
  plugins: [removeTypesPlugin()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    minify: 'terser',
    rollupOptions: {
      input,
      output: {
        entryFileNames: '[name].js',
        format: 'es',
        manualChunks: undefined,
      },
      preserveEntrySignatures: 'strict',
    },
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    host: true,
  },
});
