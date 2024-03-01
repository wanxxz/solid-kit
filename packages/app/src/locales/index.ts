import { en_US } from './en-us'
import { zh_CN } from './zh-cn'

export type LocaleCode = 'en-US' | 'zh-CN'

export type LocaleDict = typeof zh_CN

export type Locales = Record<LocaleCode, LocaleDict>

export { en_US, zh_CN }
