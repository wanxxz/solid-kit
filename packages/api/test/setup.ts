import 'dotenv/config'
import { lucia } from '../src/auth'
import { conn } from '../src/db/conn'
import { router } from '../src/routes/trpc/router'

export const setup = () => {
  const caller = router.createCaller({ lucia, db: conn, env: {} })

  return { caller }
}
