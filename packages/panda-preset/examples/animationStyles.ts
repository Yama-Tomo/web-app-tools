import { presetValues } from '#yamatomo/panda-preset'

const slideFadeIn = presetValues.animationStyles['slide-fade-in']
const slideFadeOut = presetValues.animationStyles['slide-fade-out']

export const animationStyles = {
  'slide-fade-in': {
    value: {
      _placementBottom: slideFadeIn.value['&[data-placement^=bottom]'],
      _placementCenter: presetValues.animationStyles['scale-fade-in'].value.animationName,
      _placementInlineEnd: slideFadeIn.value['&[data-placement^=right]'],
      _placementInlineStart: slideFadeIn.value['&[data-placement^=left]'],
      _placementTop: slideFadeIn.value['&[data-placement^=top]'],
    },
  },
  'slide-fade-out': {
    value: {
      _placementBottom: slideFadeOut.value['&[data-placement^=bottom]'],
      _placementCenter: presetValues.animationStyles['scale-fade-out'].value.animationName,
      _placementInlineEnd: slideFadeOut.value['&[data-placement^=right]'],
      _placementInlineStart: slideFadeOut.value['&[data-placement^=left]'],
      _placementTop: slideFadeOut.value['&[data-placement^=top]'],
    },
  },
} as const
