import { recipes as chakraPresetRecipes } from '#chakraPreset/recipes'
import { omit } from '#utils'
import { button } from './button'
import { iconButton } from './iconButton'
import { input } from './input'
import { scrollArrow } from './scrollArrow'
import { textarea } from './textarea'

export const recipes = {
  ...omit(chakraPresetRecipes, ['container']),
  button,
  containerRecipe: chakraPresetRecipes.container, // NOTE: `container` is already exported, so use a non-conflicting name
  iconButton,
  input,
  scrollArrow,
  textarea,
}
