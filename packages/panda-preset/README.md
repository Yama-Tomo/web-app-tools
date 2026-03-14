# panda-preset

A custom [Panda CSS](https://panda-css.com/) preset based on the [Chakra UI Panda preset](https://github.com/chakra-ui/chakra-ui/tree/main/packages/panda-preset), extended with additional conditions, semantic tokens, recipes, and slot recipes.

## Usage

Add the preset to your `panda.config.ts`

```typescript
import { defineConfig } from '@pandacss/dev'
import { preset } from '@yamatomo/panda-preset'

export default defineConfig({
  preflight: true,
  presets: [preset],
  // ...
})
```

## Individual Theme Values

If you need to compose your own theme without using the preset directly, each value is also exported individually via `presetValues`.

```typescript
import { presetValues } from '@yamatomo/panda-preset'

console.log(presetValues.conditions)
```
