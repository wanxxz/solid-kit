import { constants } from './constants'

function isDev() {
  return constants.NODE_ENV === 'development'
}

function isProd() {
  return constants.NODE_ENV === 'production'
}

function isTest() {
  return constants.NODE_ENV === 'test'
}

export const utils = { isDev, isProd, isTest }
