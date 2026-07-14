import { colors as baseColors } from '#chakraPreset/semanticTokens'

export const colors = {
  ...baseColors,
  currentBg: {
    DEFAULT: {
      value: {
        _dark: baseColors.bg.DEFAULT.value._dark,
        _light: baseColors.bg.DEFAULT.value._light,
      },
    },
  },
}

export * from '#chakraPreset/semanticTokens'
