import 'dotenv/config'
import { inferProcedureInput, inferProcedureOutput } from '@trpc/server'
import lodash from 'lodash'
import { setup } from './setup'

let caller: ReturnType<typeof setup>['caller']

beforeAll(() => {
  caller = setup().caller
})

describe('user', () => {
  const o1: inferProcedureInput<SolidKit.API.Routes.TRPC.Router['user']['signup']> = {
    name: 'foo',
    password: 'passw0rd',
    phone: '1234567890',
    firstName: 'foo',
    lastName: 'foo',
  }

  let o2: inferProcedureOutput<SolidKit.API.Routes.TRPC.Router['user']['signup']>

  test('signup', async () => {
    o2 = await caller.user.signup(o1)
    expect(o2).toMatchObject(lodash.omit(o1, 'password'))
  })

  test('login', async () => {
    const res = await caller.user.login({ name: o1.name, password: o1.password })
    expect(typeof res?.sessionId).toBe('string')
  })

  test('update password', async () => {
    const res = await caller.user.updatePassword({ name: o2.name, password: 'dr0wssap' })
    expect(res).toHaveProperty('userId')
  })

  test('update phone', async () => {
    const s = '0987654321'
    const res = await caller.user.updatePhone({ id: o2.id, phone: s })
    expect(res.phone).toMatch(s)
  })

  test('update profile', async () => {
    const s1 = 'oof'
    const s2 = 'oof'
    const res = await caller.user.updateProfile({ id: o2.id, firstName: s1, lastName: s2 })
    expect(res.firstName).toMatch(s1)
    expect(res.lastName).toMatch(s2)
  })

  test('remove', async () => {
    const res = await caller.user.remove({ id: o2.id })
    expect(res).toBeUndefined()
  })
})
