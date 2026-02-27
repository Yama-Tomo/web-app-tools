import { slotRecipes as chakraPresetSlotRecipes } from '#chakraPreset/slotRecipes'
import { omit } from '#utils'
import { attachedTextField } from './attachedTextField'
import { textField } from './textField'

export const slotRecipes = {
  ...omit(chakraPresetSlotRecipes, ['switch']),
  attachedTextField,
  switchSlotRecipe: chakraPresetSlotRecipes.switch,
  textField,
}
