import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { db } from '../db'

const insert = createInsertSchema(db.table.session)
const select = createSelectSchema(db.table.session)

export const session = { insert, select }

declare global {
  namespace SolidKit {
    namespace API {
      namespace Schema {
        namespace Session {
          export type Select = z.infer<typeof select>
          export type Insert = z.infer<typeof insert>
          export type UserSession = Insert
        }
      }
    }
  }
}
