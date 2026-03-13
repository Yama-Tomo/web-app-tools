import pkg from '../package.json' with { type: 'json' }
import { recipeComponentName } from './rules/recipe-component-name.ts'

const ruleName = {
  recipeComponentName: 'recipe-component-name',
} as const

const plugin = {
  meta: { name: pkg.name, version: pkg.version },
  rules: {
    [ruleName.recipeComponentName]: recipeComponentName,
  },
} as const

const recommendedPluginName = 'panda-jsx' as const
const recommended = {
  plugins: {
    [recommendedPluginName]: plugin,
  },
  rules: {
    [`${recommendedPluginName}/${ruleName.recipeComponentName}` as const]: 'error',
  },
} as const

export default {
  ...plugin,
  configs: {
    recommended,
  },
}
