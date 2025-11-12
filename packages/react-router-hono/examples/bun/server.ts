#!/usr/bin/env bun

import { run } from '@yamatomo/react-router-hono/bun'

import { createMiddlewares, getLoadContext } from '~/server'

run({ middlewares: createMiddlewares, getLoadContext })
