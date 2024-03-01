import { createContext, createSignal, type ParentComponent, type ParentProps, type Setter } from 'solid-js'
import { light, dark } from './theme.css'

const THEMES = ['light', 'dark'] as const
type Theme = (typeof THEMES)[number]

const dict: Record<Theme, string> = {
  light: light[0],
  dark: dark[0]
}

export const ThemeContext = createContext<[Theme, Setter<Theme>]>(['light', () => {}])

export type ThemeProviderProps = ParentProps<{ theme?: Theme }>

export const ThemeProvider: ParentComponent<ThemeProviderProps> = props => {
  const [theme, setTheme] = createSignal<Theme>(props.theme || 'light')

  return (
    <ThemeContext.Provider value={[theme(), setTheme]}>
      <div class={dict[theme()]}>{props.children}</div>
    </ThemeContext.Provider>
  )
}
