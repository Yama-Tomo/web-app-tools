import { definePreset } from '@pandacss/dev'

import { animationStyles } from './animationStyles.ts'
import { conditions } from './conditions.ts'
import { keyframes } from './keyframes.ts'
import { recipes } from './recipes'
import { semanticTokens } from './semanticTokens'

export const preset = definePreset({
  conditions: {
    extend: conditions,
  },
  name: 'yamatomo-panda-css-preset',
  theme: {
    extend: {
      animationStyles,
      keyframes,
      recipes,
      semanticTokens,
    },
  },
})

export const presetValues = { animationStyles, conditions, keyframes, recipes, semanticTokens }
