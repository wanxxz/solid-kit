import { defineConfig } from '@solidjs/start/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  vite({ router }) {
    let plugins: any = []

    if (router === 'server') plugins = [...plugins, vanillaExtractPlugin()]

    return {
      plugins,
      server: {
        proxy: {
          [`${process.env.TRPC_URL}`]: {
            target: process.env.API_HOST,
            changeOrigin: true
          }
        }
      },
      resolve: {
        alias: {
          'solid-kit/ui': 'solid-kit/ui/src/index.ts'
        }
      }
    }
  }
})
