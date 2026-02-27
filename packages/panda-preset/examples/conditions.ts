export const conditions = {
  baseuiNestedDialogBackdrop: '[data-base-ui-inert]:has(~ &[data-nested])',
  fits: '&:not([data-has-overflow-x], [data-has-overflow-y])',
  hover: '&:is(:hover, [data-hover], [data-hovering])',
  placeholderShown: '&:is(:placeholder-shown, [data-placeholder-shown], [data-placeholder])',
  placementBottom: '&[data-side=bottom]',
  placementCenter: '&[data-side=none]',
  placementInlineEnd: '&:is([data-side=right], [data-side=inline-end])',
  placementInlineStart: '&:is([data-side=left], [data-side=inline-start])',
  placementTop: '&[data-side=top]',
  scrolling: '&:is([data-scrolling])',
} as const
