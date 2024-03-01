import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { token } from './token'

const colorProperties = defineProperties({
  conditions: {
    light: { '@media': '(prefers-color-scheme: light)' },
    dark: { '@media': '(prefers-color-scheme: dark)' }
  },
  defaultCondition: 'light',
  properties: {
    color: { ...token.color.global, ...token.color.alias },
    background: { ...token.color.global, ...token.color.alias }
  }
})

const sizeProperties = defineProperties({
  conditions: {
    mobile: { '@media': 'screen and (max-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 769px)' }
  },
  defaultCondition: 'desktop',
  properties: {
    height: { ...token.size.global, ...token.size.component }
  }
})

const layoutProperties = defineProperties({
  conditions: {
    mobile: { '@media': 'screen and (max-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 769px)' }
  },
  defaultCondition: 'desktop',
  properties: {
    borderRadius: token.layout.rounding,
    borderWidth: token.layout.border,
    paddingBlock: token.layout.spacing
  }
})

export const sprinkles = createSprinkles(colorProperties, sizeProperties)

export type Sprinkles = Parameters<typeof sprinkles>[0]
