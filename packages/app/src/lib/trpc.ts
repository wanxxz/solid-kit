import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { isServer } from 'solid-js/web'

export const trpc = createTRPCProxyClient<SolidKit.API.Routes.TRPC.Router>({
  links: [
    httpBatchLink({
      url: isServer ? `${process.env.API_HOST}${process.env.TRPC_URL}` : import.meta.env.VITE_TRPC_URL,
    }),
  ],
})
