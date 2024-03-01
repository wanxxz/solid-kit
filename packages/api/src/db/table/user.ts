import { sql } from 'drizzle-orm'
import { blob, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'

const role = z.enum(['customer', 'member', 'staff', 'ownner'])
type Role = z.infer<typeof role>
type Roles = Role[]

const status = z.enum(['normal', 'suspend'])

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),

  createAt: text('create_at').default(sql`(strftime('%s', 'now'))`),
  updateAt: text('update_at'),
  deleteAt: text('delete_at'),

  name: text('name').notNull(),
  phone: text('phone'),

  roles: text('roles', { mode: 'json' }).$type<Roles>(),
  status: text('status', { enum: status.options }).notNull(),

  firstName: text('first_name'),
  lastName: text('last_name'),

  password: text('password').notNull(),
})
