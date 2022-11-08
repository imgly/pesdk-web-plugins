/* eslint-disable import/no-default-export */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ exclude: ['./src/examples/**', './src/env.d.ts'] })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'PluginGettyImages',
      fileName: format => `getty-images.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components', 'photoeditorsdk'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'StyledComponents',
          photoeditorsdk: 'PhotoEditorSDK',
        },
      },
    },
  },
});
