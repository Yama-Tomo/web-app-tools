import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { reactRouterHono } from '@yamatomo/react-router-hono/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { createMiddlewares, getLoadContext } from './app/server'

export default defineConfig({
  define: {
    // Set this if you want to optimize bundle size. If you set this, you need `NODE_ENV=production` when running the start command.
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    reactRouterHono({
      dev: {
        msw: !process.env.USE_PLAYWRIGHT_MSW_FIXTURE && (await import('./app/server/msw')).msw,
        middlewares: createMiddlewares,
        getLoadContext,
      },
    }),
    tsconfigPaths(),
  ],
})
