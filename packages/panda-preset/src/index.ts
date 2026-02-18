import { definePreset } from '@pandacss/dev'

import { conditions } from './conditions'
import { recipes } from './recipes'
import { semanticTokens } from './semanticTokens'

export const preset = definePreset({
  conditions: {
    extend: conditions,
  },
  name: 'yamatomo-panda-css-preset',
  theme: {
    extend: {
      recipes,
      semanticTokens,
    },
  },
})

export const presetValues = { conditions, recipes, semanticTokens }
