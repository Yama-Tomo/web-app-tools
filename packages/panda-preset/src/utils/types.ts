import type { RecipeVariantRecord, SlotRecipeVariantRecord } from '@pandacss/dev'

export type Variants<V extends string = string> = Record<
  V,
  RecipeVariantRecord[keyof RecipeVariantRecord]
>

export type SlotVariants<S extends string, V extends string = string> = Record<
  V,
  SlotRecipeVariantRecord<S>[keyof SlotRecipeVariantRecord<S>]
>
