import 'dotenv/config'
import { testClient } from 'hono/testing'
import buffer from 'node:buffer'
import { app } from '../src/index'
import { setup } from './setup'

beforeAll(() => {
  setup()
})

describe('file', () => {
  test('upload', async () => {
    const s = JSON.stringify('')
    const b = new Blob([s])
    const f = new buffer.File([b], 'foo.txt', { type: 'text/plain' })

    // @ts-ignore
    const res = await testClient(app).rest.file.$post({
      form: {
        file: f,
        path: '/',
      },
    })
  })
})
