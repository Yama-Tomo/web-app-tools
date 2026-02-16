import { defineMain } from '@storybook/react-vite/node'

export default defineMain({
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-themes'],
  framework: '@storybook/react-vite',
})
