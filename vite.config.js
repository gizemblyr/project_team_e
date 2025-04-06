import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')  // artık kökten başlatıyoruz
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: 'dist',       // ../dist yapmana gerek yok
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./**/*.html']), // artık src değil, tüm dizini izliyoruz
      SortCss({
        sort: 'mobile-first',
      }),
    ],
    base: '/project_team_e/', // GitHub Pages için önemli!
  };
});
