import { trpcServer } from '@hono/trpc-server'
import { diary } from 'diary'
import { Hono, MiddlewareHandler } from 'hono'
import { createContext } from './context'
import { router } from './router'

const log = diary('api:rotues:trpc')

const handler: MiddlewareHandler = (c, next) => trpcServer({ router, createContext: createContext(c) })(c, next)

const hono = new Hono()

export const trpc = hono.all('*', handler)
