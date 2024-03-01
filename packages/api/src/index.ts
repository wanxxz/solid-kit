import { diary } from 'diary'
import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { middlewares } from './middlewares'
import { routes } from './routes'
import { utils } from './utils'

const log = diary('api:index')

const app = new Hono()

if (!utils.isTest()) app.use('*', logger())

app.use('*', cors())
app.use('*', middlewares.db)
app.use('*', middlewares.auth)

app.route('/trpc', routes.trpc)
app.route('/rest', routes.rest)

export { app }
