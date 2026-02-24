import type { defineLayerStyles } from '@pandacss/dev'

const disabledOpacityValue = '0.5'

export const layerStyles = {
  disabled: { value: { cursor: 'not-allowed', opacity: disabledOpacityValue } },
  disabledOpacity: { value: { opacity: disabledOpacityValue } },
  none: { value: {} },
} as const satisfies Parameters<typeof defineLayerStyles>[0]
