import { type ParentComponent } from 'solid-js'

export const SideNav: ParentComponent = props => {
  return (
    <nav>
      <ul>{props.children}</ul>
    </nav>
  )
}
