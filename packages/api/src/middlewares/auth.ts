import { diary } from 'diary'
import { MiddlewareHandler } from 'hono'
import { lucia } from '../auth'

const log = diary('api:middlewares:auth')

export const auth: MiddlewareHandler = async (c, next) => {
  c.set('lucia', lucia)
  await next()
}
