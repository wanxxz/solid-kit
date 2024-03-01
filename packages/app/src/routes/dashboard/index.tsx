import { ParentProps } from 'solid-js'
import { SideNav } from '../../components/dashboard/side-nav'
import { I18nProvider } from '../../context/i18n'
import { ThemeProvider } from 'solid-kit/ui'

export default function Index(props: ParentProps) {
  return (
    <I18nProvider code="zh-CN">
      <ThemeProvider>
        <SideNav />
        <main>{props.children}</main>
      </ThemeProvider>
    </I18nProvider>
  )
}
