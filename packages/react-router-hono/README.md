# react-router-hono

A Vite plugin to integrate React Router and Hono.

## usage

### add `reactRouterHono` plugin to your Vite project

```typescript
// vite.config.ts
import { reactRouter } from '@react-router/dev/vite'
import { reactRouterHono } from '@yamatomo/react-router-hono/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    reactRouter(),
    reactRouterHono(),
  ],
})
```

### add production server entry point

```typescript
// server.ts
#!/usr/bin/env node

import { run } from '@yamatomo/react-router-hono/node'

run()
```

### update package.json scripts

```json
"scripts": {
  "build": "react-router build",
  "dev": "react-router dev",
  "start": "./build/server/server.js",
}
```

For more usage, please see the `examples` directory.
