import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/toast.js',
      name: 'toast',
      fileName: (format) => `toast.${format}.js`,
      formats: ['es', 'umd'],
    },
  },
});
