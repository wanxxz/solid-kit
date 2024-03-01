import { createClient } from '@libsql/client'
import { constants } from '../constants'

export const client = createClient({ url: constants.DB_URL })
