import { assignVars, createTheme, createThemeContract, style } from '@vanilla-extract/css'
import { token } from './token'

export const vars = createThemeContract({
  background: {},

  color: {},

  border: {},

  spacing: {}
})

export const light = createTheme(vars)

export const dark = createTheme(vars)

export const responsive = style({
  vars: assignVars(vars, {
    spacing: {}
  }),
  '@media': {
    'screen and (min-width: 769px)': {
      vars: assignVars(vars, {
        spacing: {}
      })
    }
  }
})
