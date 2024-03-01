import { flatten, translator, type Flatten, type Translator } from '@solid-primitives/i18n'
import { createContext, createResource, createSignal, type ParentProps, type Setter } from 'solid-js'
import { zh_CN, type LocaleCode, type LocaleDict } from '../locales'

export const I18nContext = createContext<[LocaleCode, { t: Translator<LocaleDict>; change: Setter<LocaleCode> }]>([
  'zh-CN',
  {} as never,
])

export function I18nProvider(props: ParentProps<{ code?: LocaleCode }>) {
  const [code, setCode] = createSignal<LocaleCode>(props.code || 'zh-CN')

  async function fetchLocaleDict(locale: LocaleCode): Promise<Flatten<LocaleDict>> {
    const dict: LocaleDict = await import(`../locales/${locale.toLowerCase()}.ts`)
    return flatten(dict)
  }

  const [dict] = createResource(code, fetchLocaleDict, {
    initialValue: flatten(zh_CN),
  })

  const t = translator(dict)

  return <I18nContext.Provider value={[code(), { t, change: setCode }]}>{props.children}</I18nContext.Provider>
}
