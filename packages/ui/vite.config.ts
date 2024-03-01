import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { resolve } from 'path'
import external from 'rollup-plugin-peer-deps-external'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [external(), dts({ insertTypesEntry: true }), solidPlugin(), vanillaExtractPlugin()],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
    },
  },
})
