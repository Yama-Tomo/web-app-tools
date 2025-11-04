#! /usr/bin/env node

import { Command } from 'commander'

import { pack } from './pack.ts'
import { DEFAULT_TAR_NAME } from './utils.ts'

const run = async () => {
  const opts = new Command()
    .description('Create a tarball for GitHub Releases publishing')
    .option('--filename <string>', `Package filename`, DEFAULT_TAR_NAME)
    .parse()
    .opts<{ filename: string; tool: string }>()

  await pack(opts.filename)
}

run()
