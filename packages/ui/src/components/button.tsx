import { type ParentComponent } from 'solid-js'
import { recipe } from '@vanilla-extract/recipes'
import { sprinkles } from '../sprinkles.css'
import { vars } from '../theme.css'

const buttonStyle = recipe({
  base: {},
  variants: {
    color: {
      accent: {}
    }
  }
})

export const Button: ParentComponent = props => {
  return <button class={}>{props.children}</button>
}
