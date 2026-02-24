export const omit = <T extends Record<string, unknown>, K extends [...(keyof T)[]]>(
  originalObject: T,
  keys: K,
): {
  [K2 in Exclude<keyof T, K[number]>]: T[K2]
} => {
  const copiedObject = { ...originalObject }

  for (const key of keys) {
    delete copiedObject[key]
  }

  return copiedObject
}
