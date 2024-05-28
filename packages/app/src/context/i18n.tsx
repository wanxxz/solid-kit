import { flatten, translator, type Flatten, type Translator } from '@solid-primitives/i18n'
import { createContext, createResource, createSignal, type Accessor, type ParentProps, type Setter } from 'solid-js'
import { en_US, type LocaleCode, type LocaleDict } from '../locales'

const I18nContext = createContext<[Accessor<LocaleCode>, { t: Translator<LocaleDict>; change: Setter<LocaleCode> }]>([
  undefined as never,
  {} as never
])

async function fetchLocaleDict(locale: LocaleCode): Promise<Flatten<LocaleDict>> {
  const dict: LocaleDict = (await import(`../locales/${locale.toLowerCase()}.ts`)).default
  return flatten(dict)
}

function I18nProvider(props: ParentProps<{ code: LocaleCode }>) {
  const [code, setCode] = createSignal(props.code)
  const [dict] = createResource(code, fetchLocaleDict, {
    initialValue: en_US
  })
  const t = translator(dict)

  return <I18nContext.Provider value={[code, { t, change: setCode }]}>{props.children}</I18nContext.Provider>
}

export { I18nContext, I18nProvider }
