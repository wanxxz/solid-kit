import { enable, diary } from 'diary'
import { constants } from './constants'

enable(constants.DEBUG)

export const log = diary('solid-kit/api')
