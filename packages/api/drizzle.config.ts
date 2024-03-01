import { defineConfig } from 'drizzle-kit'
import { constants } from './src/constants'

export default defineConfig({
  schema: './src/db/table',
  driver: 'libsql',
  breakpoints: false,
  dbCredentials: {
    url: constants.DB_URL,
  },
})
