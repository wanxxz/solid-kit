import { tempdir } from 'shelljs'

const {
  NODE_ENV = 'development',

  DEBUG = '*',

  JWT_SECRET = 'sEcReT',
  DB_FILENAME = 'solid-kit',
} = process.env

let { DB_URL } = process.env

const isProd = NODE_ENV === 'production'

DB_URL = DB_URL || (isProd ? `file:${DB_FILENAME}.db` : `file:${tempdir()}/${DB_FILENAME}-test.db`)

export const constants = {
  NODE_ENV,

  DEBUG,

  JWT_SECRET,
  DB_URL,
}
