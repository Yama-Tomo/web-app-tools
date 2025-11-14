import { serveStatic } from 'hono/bun'

import { createRunner } from '~/createRunner.ts'

export const run = createRunner(serveStatic, Bun.serve)
export type Options = Parameters<typeof run>[0]
