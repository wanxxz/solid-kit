import { en_US } from './en-us'
import { zh_CN } from './zh-cn'

type LocaleCode = 'en-US' | 'zh-CN'

type LocaleDict = typeof zh_CN

type Locales = Record<LocaleCode, LocaleDict>

export { en_US, zh_CN, type LocaleCode, type LocaleDict, type Locales }
