# eslint-plugin-panda-jsx

## Usage

```javascript
import typescriptParser from '@typescript-eslint/parser'
import pandaJsx from '@yamatomo/eslint-plugin-panda-jsx'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      'panda-jsx': pandaJsx,
    },
    rules: {
      'panda-jsx/recipe-component-name': 'error',
    },
  },
]
```

Alternatively, you can use the recommended config which automatically sets up the plugin and rule

```javascript
import typescriptParser from '@typescript-eslint/parser'
import pandaJsx from '@yamatomo/eslint-plugin-panda-jsx'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
    },
  },
  pandaJsx.configs.recommended,
]
```

## Rules

| Rule                                                                       | Description                                                                             |
|:---------------------------------------------------------------------------|:----------------------------------------------------------------------------------------|
| [`panda-jsx/recipe-component-name`](./docs/rules/recipe-component-name.md) | Enforce component naming conventions for Panda CSS recipes to enable JSX auto-tracking. |

## Standalone CLI

This package comes with standalone CLI

```bash
npx <this package url>
```

You can also pass specific files or globs

```bash
npx <this package url> "src/components/**/*.tsx"
```

You can also provide a JSON config file

```bash
npx <this package url> --config path/to/panda-jsx.config.json
# or
npx <this package url> -c path/to/panda-jsx.config.json
```

The JSON file is forwarded as options for this plugin's rules. A minimal example looks like

```json
{
  "panda-jsx/recipe-component-name": { /* rule options */ }
}
```

See each rule's documentation for the supported options and their shapes.
