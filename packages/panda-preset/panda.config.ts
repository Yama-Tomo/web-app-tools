import { defineConfig } from '@pandacss/dev'

import { preset as yamatomoPreset } from '#yamatomo/panda-preset'
import { pandaDevConfig } from './panda.dev-config.ts'

export default defineConfig({
  ...pandaDevConfig,
  preflight: true,
  presets: [yamatomoPreset],
})
