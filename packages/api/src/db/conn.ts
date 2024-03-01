import { drizzle } from 'drizzle-orm/libsql'
import { utils } from '../utils'
import { client } from './client'

export const conn = drizzle(client, { logger: utils.isDev() })
