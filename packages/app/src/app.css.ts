import { globalStyle } from '@vanilla-extract/css'

globalStyle('body', {
  fontFamily: 'sans-serif',
  margin: 0
})

globalStyle('main', {
  position: 'relative',
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
})
