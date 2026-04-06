import { cursor as chakraPresetCursor } from '#chakraPreset/tokens'

export * from '#chakraPreset/tokens'
export const cursor = { ...chakraPresetCursor, switch: chakraPresetCursor.swittch } as const
