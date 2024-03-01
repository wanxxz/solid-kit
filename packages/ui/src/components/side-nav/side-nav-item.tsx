import { type ParentComponent } from 'solid-js'
import { vars } from '../../theme.css'
import { recipe } from '@vanilla-extract/recipes'

const SideNavItemStyle = recipe({
  base: {},
  variants: {
    selected: {},
    disabled: {}
  }
})

export interface SideNavItemProps {
  value: string
  label: string
}

export const SideNavItem: ParentComponent<SideNavItemProps> = props => {
  return <li class={SideNavItemStyle({})}>{props.children}</li>
}
