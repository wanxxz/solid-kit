import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { db } from '../db'

const insert = createInsertSchema(db.table.user)
const select = createSelectSchema(db.table.user)

export const user = { insert, select }

declare global {
  namespace SolidKit {
    namespace API {
      namespace Schema {
        namespace User {
          export type Select = z.infer<typeof select>
          export type Insert = z.infer<typeof insert>
          export type User = Insert
        }
      }
    }
  }
}
