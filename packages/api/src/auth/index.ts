import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia, TimeSpan } from 'lucia'
import { conn } from '../db/conn'
import { table } from '../db/table'

const adapter = new DrizzleSQLiteAdapter(conn, table.session, table.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      sameSite: 'none',
    },
  },
  sessionExpiresIn: new TimeSpan(30, 'd'),
})

declare global {
  namespace SolidKit {
    namespace Auth {
      type Lucia = typeof lucia
    }
  }
}
