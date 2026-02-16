// NOTE:
// This config file is for developing and testing this preset inside this
// repository (e.g. Storybook, local playground).
// It is not meant to be imported by applications.
export const pandaDevConfig = {
  importMap: '#panda',
  include: ['./.storybook/**/*.{js,jsx,ts,tsx}', './src/**/*.stories.{js,jsx,ts,tsx}'],
  strictTokens: true,
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          primary: {
            border: { value: { _dark: '{colors.primary.500}', base: '{colors.primary.400}' } },
            contrast: { value: { _dark: 'white', base: 'white' } },
            emphasized: { value: { _dark: '{colors.primary.700}', base: '{colors.primary.300}' } },
            fg: { value: { _dark: '{colors.primary.300}', base: '{colors.primary.700}' } },
            focusRing: { value: { _dark: '{colors.primary.500}', base: '{colors.primary.500}' } },
            muted: { value: { _dark: '{colors.primary.800}', base: '{colors.primary.200}' } },
            solid: { value: { _dark: '{colors.primary.600}', base: '{colors.primary.600}' } },
            subtle: { value: { _dark: '{colors.primary.900}', base: '{colors.primary.100}' } },
          },
        },
      },
      tokens: {
        colors: {
          gray: {
            50: { value: '#fafafa' },
            100: { value: '#f4f4f5' },
            200: { value: '#e4e4e7' },
            300: { value: '#d4d4d8' },
            400: { value: '#a1a1aa' },
            500: { value: '#71717a' },
            600: { value: '#52525b' },
            700: { value: '#3f3f46' },
            800: { value: '#27272a' },
            900: { value: '#18181b' },
            950: { value: '#111111' },
          },
          primary: {
            50: { value: '#f4f7fe' },
            100: { value: '#d4e0fb' },
            200: { value: '#afc6f8' },
            300: { value: '#81a5f3' },
            400: { value: '#6692f1' },
            500: { value: '#4177ee' },
            600: { value: '#2460e3' },
            700: { value: '#1d4db7' },
            800: { value: '#18419b' },
            900: { value: '#122f70' },
          },
        },
      },
    },
  } as const,
}
