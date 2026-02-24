import { definePreset } from '@pandacss/dev'

import { animationStyles } from './animationStyles.ts'
import { conditions } from './conditions.ts'
import { keyframes } from './keyframes.ts'
import { layerStyles } from './layerStyles.ts'
import { recipes } from './recipes'
import { semanticTokens } from './semanticTokens'
import { textStyles } from './textStyles.ts'

export const preset = definePreset({
  conditions: {
    extend: conditions,
  },
  name: 'yamatomo-panda-css-preset',
  theme: {
    extend: {
      animationStyles,
      keyframes,
      layerStyles,
      recipes,
      semanticTokens,
      textStyles,
    },
  },
})

export const presetValues = {
  animationStyles,
  conditions,
  keyframes,
  layerStyles,
  recipes,
  semanticTokens,
  textStyles,
}
