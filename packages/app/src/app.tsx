import { MetaProvider } from '@solidjs/meta'
import { Router, type RouteSectionProps } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense, type Component } from 'solid-js'
import './app.css'
import { I18nProvider } from './context'

const root: Component<RouteSectionProps> = props => {
  return (
    <I18nProvider code="zh-CN">
      <MetaProvider>
        <Suspense>{props.children}</Suspense>
      </MetaProvider>
    </I18nProvider>
  )
}

const App: Component = () => {
  return (
    <Router root={root}>
      <FileRoutes />
    </Router>
  )
}

export default App
