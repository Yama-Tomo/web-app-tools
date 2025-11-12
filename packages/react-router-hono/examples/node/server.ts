#!/usr/bin/env node

import { run } from '@yamatomo/react-router-hono/node'

import { createMiddlewares, getLoadContext } from '~/server'

run({ middlewares: createMiddlewares, getLoadContext })
