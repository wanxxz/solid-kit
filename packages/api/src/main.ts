import { serve } from '@hono/node-server'
import 'dotenv/config'
import { app } from './index'

serve(app)

export { app }
export default {}
