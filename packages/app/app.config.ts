import { defineConfig } from '@solidjs/start/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { type Plugin } from 'vinxi'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'

export default defineConfig({
  vite({ router }) {
    let plugins: Plugin[] = [tsconfigPathsPlugin()]

    if (router === 'server') plugins = [...plugins, vanillaExtractPlugin()]

    return {
      plugins
    }
  }
})
