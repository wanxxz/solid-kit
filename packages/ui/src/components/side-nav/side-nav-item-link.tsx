import { recipe } from '@vanilla-extract/recipes'
import { type Component } from 'solid-js'
import { vars } from '../../theme.css'

const SideNavItemLinkStyle = recipe({
  base: {},
  variants: {}
})

const SideNavItemLinkTextStyle = recipe({
  base: {},
  variants: {}
})

export interface SideNavItemLinkProps {
  href: string
  text: string
}

export const SideNavItemLink: Component<SideNavItemLinkProps> = props => {
  return (
    <a href={props.href} class={SideNavItemLinkStyle({})}>
      <span class={SideNavItemLinkTextStyle()}></span>
    </a>
  )
}
