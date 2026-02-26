import { slotRecipes as chakraPresetSlotRecipes } from '#chakraPreset/slotRecipes'
import { omit } from '#utils'
import { attachedTextField } from './attachedTextField'
import { checkbox } from './checkbox'
import { dialog } from './dialog'
import { field } from './field'
import { menu } from './menu'
import { numberField } from './numberField'
import { radio } from './radio'
import { scrollArea } from './scrollArea'
import { select } from './select'
import { textField } from './textField'

export const slotRecipes = {
  ...omit(chakraPresetSlotRecipes, ['switch']),
  attachedTextField,
  checkbox,
  dialog,
  field,
  menu,
  numberField,
  radio,
  scrollArea,
  select,
  switchSlotRecipe: chakraPresetSlotRecipes.switch,
  textField,
}
