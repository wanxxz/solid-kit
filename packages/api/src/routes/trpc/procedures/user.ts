import { Chance } from 'chance'
import { diary } from 'diary'
import { eq, like } from 'drizzle-orm'
import { Scrypt } from 'oslo/password'
import { z } from 'zod'
import { db } from '../../../db'
import { schema } from '../../../schema'
import { t } from '../inner'

const log = diary('api:rotues:trpc:procedures:user')

const chance = new Chance()

// search
const searchInput = schema.user.select.pick({ name: true })
export type SearchInput = z.infer<typeof searchInput>

export const search = t.procedure.input(searchInput).query(async c => {
  const res = await c.ctx.db
    .select()
    .from(db.table.user)
    .where(like(db.table.user.name, `%${c.input.name.toLowerCase()}%`))
    .all()
  return res
})

// signup
const signupInput = schema.user.insert
  .pick({
    firstName: true,
    lastName: true,
    name: true,
    phone: true,
  })
  .extend({
    password: z.string().min(1),
  })

export type SignupInput = z.infer<typeof signupInput>

export const signup = t.procedure.input(signupInput).mutation(async c => {
  log.debug(c.input)

  const {
    input: { name, phone, password, firstName = null, lastName = null },
  } = c

  const id = chance.guid()
  const createAt = Date.now().toString()

  const hashedPassword = await new Scrypt().hash(password)

  const res = await c.ctx.db
    .insert(db.table.user)
    .values({
      id,
      createAt,
      name,
      status: 'normal',
      roles: ['member'],
      phone,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
    })
    .returning()
    .get()

  log.debug(res)

  return res
})

// update password
const updatePasswordInput = schema.user.insert.extend({ password: z.string().min(1) })

export type UpdatePasswordInput = z.infer<typeof signupInput>

export const updatePassword = t.procedure.input(updatePasswordInput).mutation(async c => {
  if (!c.ctx.user?.id) throw new Error('session invalid')

  // TODO: password change security check
  // 1. send email
  // 2. ...

  const hashedPassword = await new Scrypt().hash(c.input.password)

  const res = await c.ctx.db
    .update(db.table.user)
    .set({ password: hashedPassword })
    .where(eq(db.table.user.id, c.ctx.user.id))

  return res
})

// update phone
const updatePhoneInput = schema.user.insert.pick({ phone: true })

export type UpdatePhoneInput = z.infer<typeof signupInput>

export const updatePhone = t.procedure.input(updatePhoneInput).mutation(async c => {
  if (!c.ctx.user?.id) throw new Error('session invalid')

  // TODO: validate new phone

  const updateAt = Date.now().toString()

  const res = await c.ctx.db
    .update(db.table.user)
    .set({ updateAt, phone: c.input.phone })
    .where(eq(db.table.user.id, c.ctx.user.id))

  return res
})

// update profile
const updateProfileInput = schema.user.insert.pick({ firstName: true, lastName: true })

export type UpdateProfileInput = z.infer<typeof signupInput>

export const updateProfile = t.procedure.input(updateProfileInput).mutation(async c => {
  if (!c.ctx.user?.id) throw new Error('session invalid')

  const {
    input: { firstName, lastName },
  } = c

  const updateAt = Date.now().toString()

  const res = await c.ctx.db
    .update(db.table.user)
    .set({ updateAt, firstName, lastName })
    .where(eq(db.table.user.id, c.ctx.user.id))

  return res
})

// remove
export const remove = t.procedure.mutation(async (c): Promise<any> => {
  if (!c.ctx.user?.id) throw new Error('session invalid')

  const res = await c.ctx.db.delete(db.table.user).where(eq(db.table.user.id, c.ctx.user.id))

  return res
})

// login
const loginInput = schema.user.insert.pick({ name: true }).extend({ password: z.string().min(1) })

export type LoginInput = z.infer<typeof loginInput>

export const login = t.procedure.input(loginInput).mutation(async (c): Promise<any> => {
  const {
    input: { name, password },
  } = c

  log.debug('login', c.input)

  const user = await c.ctx.db.select().from(db.table.user).where(eq(db.table.user.name, name)).get()
  if (!user) {
    throw new Error('invalid name')
  }

  const validPassword = await new Scrypt().verify(user?.password, password)
  if (!validPassword) {
    throw new Error('invalid password')
  }

  const session = await c.ctx.lucia.createSession(user.id, {})
  const sessionCookie = c.ctx.lucia.createSessionCookie(session.id)

  return session
})

export const user = {
  search,
  signup,
  updatePassword,
  updatePhone,
  updateProfile,
  remove,
  login,
}
