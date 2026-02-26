import { definePreset } from '@pandacss/dev'

import { breakpoints } from '#chakraPreset/breakpoints'
import { globalCss } from '#chakraPreset/globalCss'
import { keyframes } from '#chakraPreset/keyframes'
import { layerStyles } from '#chakraPreset/layerStyles'
import { textStyles } from '#chakraPreset/textStyles'
import * as tokens from '#chakraPreset/tokens'
import { utilities } from '#chakraPreset/utilities'
import { animationStyles } from './animationStyles.ts'
import { conditions } from './conditions.ts'
import { recipes } from './recipes'
import * as semanticTokens from './semanticTokens.ts'
import { slotRecipes } from './slotRecipes'

export const preset = definePreset({
  conditions: {
    extend: conditions,
  },
  globalCss,
  name: 'yamatomo-panda-css-preset',
  theme: {
    animationStyles,
    breakpoints,
    keyframes,
    layerStyles,
    recipes,
    semanticTokens,
    slotRecipes,
    textStyles,
    tokens,
  },
  utilities: {
    extend: utilities,
  },
})

export const presetValues = {
  animationStyles,
  breakpoints,
  conditions,
  globalCss,
  keyframes,
  layerStyles,
  recipes,
  semanticTokens,
  slotRecipes,
  textStyles,
  tokens,
}
