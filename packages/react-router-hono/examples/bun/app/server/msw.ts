import type { Options } from '@yamatomo/react-router-hono/vite'
import { HttpResponse, http } from 'msw'

const host = 'http://api.localhost'

export const msw: Options.Msw = {
  handlers: async () => {
    return [
      http.get(`${host}/message`, () => {
        return HttpResponse.json({ data: 'Hello world' })
      }),
    ]
  },
  env: () => ({ BACKEND_API_HOST: host }),
}
