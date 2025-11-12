import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'

import { createRunner } from '~/createRunner.ts'

export const run = createRunner(serveStatic, serve)
export type Options = Parameters<typeof run>[0]
