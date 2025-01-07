import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
// import checker from 'vite-plugin-checker';
import commonjs from 'vite-plugin-commonjs';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // checker({
    //   typescript: true,
    // }),
    svgr(),
    commonjs({
      filter(id) {
        if (['ckeditor5/build/ckeditor.js'].includes(id)) {
          return true;
        }
      },
    }),
  ],
  server: {
    port: 3002,
  },
  optimizeDeps: {
    include: ['ckeditor5-custom-build'],
  },
  build: {
    // commonjsOptions: { include: [/ckeditor5-custom-build/, /node_modules/] },
    commonjsOptions: { exclude: ['ckeditor5-custom-build'] },
  },
});
