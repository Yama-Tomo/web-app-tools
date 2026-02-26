import { defineConfig } from '@pandacss/dev'

import { preset as yamatomoPreset } from './src'
import { pandaDevConfig } from './src/panda.dev-config.ts'

export default defineConfig({
  ...pandaDevConfig,
  preflight: true,
  presets: [yamatomoPreset],
})
