import { animationStyles as chakraPresetAnimationStyles } from '#chakraPreset/animationStyles'

const slideFadeIn = chakraPresetAnimationStyles['slide-fade-in']
const slideFadeOut = chakraPresetAnimationStyles['slide-fade-out']

export const animationStyles = {
  ...chakraPresetAnimationStyles,
  'slide-fade-in': {
    value: {
      ...slideFadeIn,
      _placementBottom: slideFadeIn.value['&[data-placement^=bottom]'],
      _placementCenter: chakraPresetAnimationStyles['scale-fade-in'].value.animationName,
      _placementInlineEnd: slideFadeIn.value['&[data-placement^=right]'],
      _placementInlineStart: slideFadeIn.value['&[data-placement^=left]'],
      _placementTop: slideFadeIn.value['&[data-placement^=top]'],
    },
  },
  'slide-fade-out': {
    value: {
      ...slideFadeOut,
      _placementBottom: slideFadeOut.value['&[data-placement^=bottom]'],
      _placementCenter: chakraPresetAnimationStyles['scale-fade-out'].value.animationName,
      _placementInlineEnd: slideFadeOut.value['&[data-placement^=right]'],
      _placementInlineStart: slideFadeOut.value['&[data-placement^=left]'],
      _placementTop: slideFadeOut.value['&[data-placement^=top]'],
    },
  },
} as const
