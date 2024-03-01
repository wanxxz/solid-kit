import { LibSQLDatabase } from 'drizzle-orm/libsql'
import type hono from 'hono'

export interface Context {
  db: LibSQLDatabase
  lucia: SolidKit.Auth.Lucia
  hono: {
    context: hono.Context
  }
  user?: SolidKit.API.Schema.User.Select
  session?: any
}

export const createContext = (c: hono.Context) => async () => {
  const db: LibSQLDatabase = c.get('db')
  const lucia: SolidKit.Auth.Lucia = c.get('lucia')
  const hono = {
    context: c,
  }

  const user: SolidKit.API.Schema.User.Select = c.get('user')
  const session = c.get('session')

  return {
    db,
    lucia,
    hono,

    user,
    session,

    env: c.env,
  }
}
