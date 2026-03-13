#!/usr/bin/env node

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseArgs } from 'node:util'

import { ESLint } from 'eslint'

import plugin from './index.ts'

async function runCLI() {
  const { values, positionals: targetFiles } = parseArgs({
    args: process.argv.slice(2),
    options: {
      config: { type: 'string', short: 'c' },
    },
    allowPositionals: true,
  })

  const filesToLint =
    targetFiles.length > 0 ? targetFiles : ['src/**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}']

  let cliRuleConfig: Partial<Record<string, unknown>> = {}
  if (values.config) {
    try {
      cliRuleConfig = JSON.parse(readFileSync(resolve(process.cwd(), values.config), 'utf8'))
    } catch (error) {
      console.error('❌ Failed to read or parse config JSON file:', error)
      process.exit(1)
    }
  }

  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      {
        files: filesToLint,
        languageOptions: {
          parser: require(require.resolve('@typescript-eslint/parser')),
          parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            ecmaFeatures: { jsx: true },
          },
        },
        plugins: plugin.configs.recommended.plugins,
        rules: Object.entries(plugin.configs.recommended.rules).reduce(
          (acc, [ruleId, ruleValue]) => {
            acc[ruleId] = cliRuleConfig?.[ruleId] ? [ruleValue, cliRuleConfig[ruleId]] : ruleValue
            return acc
          },
          {} as NonNullable<ESLint.ConfigData['rules']>,
        ),
      },
    ],
  })

  try {
    const results = await eslint.lintFiles(filesToLint)

    const formatter = await eslint.loadFormatter('stylish')
    const resultText = formatter.format(results)

    if (resultText) {
      console.log(resultText)
    }

    const hasError = results.some((r) => r.errorCount > 0)
    process.exit(hasError ? 1 : 0)
  } catch (error) {
    console.error('❌ An error occurred while running the linter:', error)
    process.exit(1)
  }
}

runCLI()
