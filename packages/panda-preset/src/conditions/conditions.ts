export const conditions = {
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
  /**
   * Matches interactive elements on hover,
   * but ignores disabled / aria-disabled controls.
   */
  hoverEnabled: '&:is(:hover):not(:disabled, [data-disabled], [aria-disabled=true])',
  placeholderShown: '&:is(:placeholder-shown, [data-placeholder-shown], [data-placeholder])',
} as const
