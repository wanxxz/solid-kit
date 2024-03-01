import { Hono } from 'hono'
import { file } from './file'

const rest = new Hono()

rest.post('/file', file.upload)

export { rest }
