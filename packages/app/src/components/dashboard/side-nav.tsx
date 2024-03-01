import { createMemo, createUniqueId, useContext } from 'solid-js'
import { I18nContext } from '../../context/i18n'

export function SideNav() {
  const [localeCode, { t, change }] = useContext(I18nContext)

  return (
    <div>
      {t('dashboard.sidenav.item.home')}
    </div>
  )
}
