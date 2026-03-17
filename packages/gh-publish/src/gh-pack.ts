#! /usr/bin/env node

import path from 'node:path'
import { parseArgs } from 'node:util'

import { pack } from './pack.ts'
import { DEFAULT_TAR_NAME } from './utils.ts'

const HELP = `\
Usage: ${path.parse(String(process.argv[1])).name} [options]

Create a tarball for GitHub Releases publishing

Options:
  --filename <string>  Package filename (default: "${DEFAULT_TAR_NAME}")
  -h, --help           Display help for command
`

const run = async () => {
  const { values: opts } = parseArgs({
    options: {
      filename: { type: 'string', default: DEFAULT_TAR_NAME },
      help: { type: 'boolean', short: 'h', default: false },
    },
  })

  if (opts.help) {
    process.stdout.write(HELP)
    process.exit(0)
  }

  await pack(opts.filename)
}

run()
