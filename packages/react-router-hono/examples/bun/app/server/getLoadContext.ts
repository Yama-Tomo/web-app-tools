declare module 'react-router' {
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {}
}

export const getLoadContext = () => {
  return {
    httpClient: fetch,
  }
}
