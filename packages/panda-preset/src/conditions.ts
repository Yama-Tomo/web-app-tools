const notFirst = '&:not(:first-child)'
const notLast = '&:not(:last-child)'

export const conditions = {
  dark: '.dark &',
  /**
   * Matches any element that has a next sibling
   * (i.e. not the last child). Useful for adding spacing
   * or borders between siblings.
   */
  hasNextSibling: notLast,
  /**
   * Matches any element that has a previous sibling
   * (i.e. not the first child). Useful for adding spacing
   * or borders between siblings.
   */
  hasPreviousSibling: notFirst,
  /**
   * Matches interactive elements on hover,
   * but ignores disabled / aria-disabled controls.
   */
  hoverEnabled: '&:is(:hover):not(:disabled, [data-disabled], [aria-disabled=true])',
  icon: '& :where(svg)',
  light: '.light &',
  menuItemCheckbox: '&[role=menuitemcheckbox]',
  menuItemRadio: '&[role=menuitemradio]',
  notFirst,
  notLast,
  webkitScrollbar: '&::-webkit-scrollbar',
} as const
