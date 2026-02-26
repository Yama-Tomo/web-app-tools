export const conditions = {
  baseuiNestedDialogBackdrop: '[data-base-ui-inert]:has(~ &[data-nested])',
  dark: '.dark &',
  fits: '&:not([data-has-overflow-x], [data-has-overflow-y])',
  /**
   * Matches any element that has a next sibling
   * (i.e. not the last child). Useful for adding spacing
   * or borders between siblings.
   */
  hasNextSibling: '&:not(:last-child)',
  /**
   * Matches any element that has a previous sibling
   * (i.e. not the first child). Useful for adding spacing
   * or borders between siblings.
   */
  hasPreviousSibling: '&:not(:first-child)',
  hover: '&:is(:hover, [data-hover], [data-hovering])',
  /**
   * Matches interactive elements on hover,
   * but ignores disabled / aria-disabled controls.
   */
  hoverEnabled: '&:is(:hover):not(:disabled, [data-disabled], [aria-disabled=true])',
  icon: '& :where(svg)',
  light: '.light &',
  menuItemCheckbox: '&[role=menuitemcheckbox]',
  menuItemRadio: '&[role=menuitemradio]',
  placeholderShown: '&:is(:placeholder-shown, [data-placeholder-shown], [data-placeholder])',
  placementBottom: '&[data-side=bottom]',
  placementCenter: '&[data-side=none]',
  placementInlineEnd: '&:is([data-side=right], [data-side=inline-end])',
  placementInlineStart: '&:is([data-side=left], [data-side=inline-start])',
  placementTop: '&[data-side=top]',
  scrolling: '&:is([data-scrolling])',
  webkitScrollbar: '&::-webkit-scrollbar',
} as const
