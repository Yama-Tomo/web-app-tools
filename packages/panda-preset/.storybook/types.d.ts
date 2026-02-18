import '@storybook/react-vite'

declare module '@storybook/react-vite' {
  interface Parameters {
    tableDecorator?: {
      cols?: string[] | readonly string[]
      rows: { name?: string; items: Record<string, unknown>[] }[]
    }
  }
}
