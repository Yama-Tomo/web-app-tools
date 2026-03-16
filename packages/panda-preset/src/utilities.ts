/** biome-ignore-all assist/source/useSortedKeys: Porting code directly from Chakra, maintaining the original key order as per the original code */

import type { PropertyConfig } from '@pandacss/dev'

import { utilities as chakraPresetUtilities } from '#chakraPreset/utilities'

const createTransition = (value: string) => {
  return {
    transition: value,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
  }
}

export const utilities = {
  ...chakraPresetUtilities,
  transition: {
    values: [
      'all',
      'common',
      'colors',
      'opacity',
      'position',
      'backgrounds',
      'size',
      'shadow',
      'transform',
    ],
    transform(value) {
      switch (value) {
        case 'all':
          return createTransition('all')
        case 'position':
          return createTransition('left, right, top, bottom, inset-inline, inset-block')
        case 'colors':
          return createTransition(
            'color, background-color, border-color, text-decoration-color, fill, stroke',
          )
        case 'opacity':
          return createTransition('opacity')
        case 'shadow':
          return createTransition('box-shadow')
        case 'transform':
          return createTransition('transform')
        case 'size':
          return createTransition('width, height')
        case 'backgrounds':
          return createTransition(
            'background, background-color, background-image, background-position',
          )
        case 'common':
          return createTransition(
            'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
          )
        default:
          return { transition: value }
      }
    },
  } satisfies PropertyConfig,
} as const
