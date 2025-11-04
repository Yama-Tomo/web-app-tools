# msw-server

Utility library to run MSW (Mock Service Worker) as a standalone server for testing.

## usage

```typescript
import { createServer } from '@yamatomo/msw-server'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const server = createServer({ port: 3001, setupMsw: setupServer })

server.use(
  http.get(`http://localhost:${server.port}/`, () => {
    return HttpResponse.json({ message: 'Hello world' })
  })
)

server.listen()
```
