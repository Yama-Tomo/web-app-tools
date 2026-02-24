import { shadows as chakraPresetShadows } from '#chakraPreset/semanticTokens'

// biome-ignore assist/source/useSortedKeys: Sizes are intentionally not sorted alphabetically for better recognizability
export const shadows = {
  xs: {
    value: {
      _dark: '0px 1px 1px {colors.black/64}, 0px 0px 1px inset {colors.gray.300/20}',
      _light: chakraPresetShadows.xs.value._light,
    },
  },
  sm: {
    value: {
      _dark: '0px 2px 4px {colors.black/64}, 0px 0px 1px inset {colors.gray.300/30}',
      _light: chakraPresetShadows.sm.value._light,
    },
  },
  md: {
    value: {
      _dark: '0px 4px 8px {colors.black/64}, 0px 0px 1px inset {colors.gray.300/30}',
      _light: chakraPresetShadows.md.value._light,
    },
  },
  lg: {
    value: {
      _dark: '0px 8px 16px {colors.black/64}, 0px 0px 1px inset {colors.gray.300/30}',
      _light: chakraPresetShadows.lg.value._light,
    },
  },
  xl: {
    value: {
      _dark: '0px 16px 24px {colors.black/64}, 0px 0px 1px inset {colors.gray.300/30}',
      _light: chakraPresetShadows.xl.value._light,
    },
  },
  '2xl': {
    value: {
      _dark: '0px 24px 40px {colors.black/64}, 0px 0px 1px inset {colors.gray.300/30}',
      _light: chakraPresetShadows['2xl'].value._light,
    },
  },
  inner: {
    value: {
      _dark: 'inset 0 2px 4px 0 {colors.black}',
      _light: 'inset 0 2px 4px 0 {colors.black/5}',
    },
  },
  inset: {
    value: {
      _dark: chakraPresetShadows.inset.value._dark,
      _light: 'inset 0 0 0 1px {colors.black/5}',
    },
  },
} as const

export { colors, radii } from '#chakraPreset/semanticTokens'
