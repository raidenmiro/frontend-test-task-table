import * as path from 'path'
import babel from '@rollup/plugin-babel'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// eslint-disable-next-line import/no-anonymous-default-export
export default defineConfig({
  plugins: [react(), babel({ extensions: ['.ts'] })],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
})
