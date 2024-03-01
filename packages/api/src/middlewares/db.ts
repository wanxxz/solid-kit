import { MiddlewareHandler } from 'hono'
import { conn } from '../db/conn'

export const db: MiddlewareHandler = async (c, next) => {
  c.set('db', conn)
  await next()
}
