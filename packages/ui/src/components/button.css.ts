import { recipe } from '@vanilla-extract/recipes'
import { sprinkles } from '../sprinkles.css'

export const button = recipe({
  base: sprinkles({}),

  variants: {
    color: {}
  },

  defaultVariants: {}
})
