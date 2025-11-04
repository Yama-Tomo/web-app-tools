import { createServer } from 'node:http'

export const getPort = () => {
  return new Promise<number>((resolve, reject) => {
    const server = createServer()
    server.listen(0)

    server.on('listening', () => {
      const address = server.address()
      const port = (typeof address === 'object' && address?.port) || undefined

      server.close((err) => {
        if (err || !port) {
          reject(err || new Error('Failed to get a free port'))
        } else {
          resolve(port)
        }
      })
    })
  })
}
