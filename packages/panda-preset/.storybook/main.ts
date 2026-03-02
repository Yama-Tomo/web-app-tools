import { defineMain } from '@storybook/react-vite/node'

export default defineMain({
  stories: [
    { directory: '../src', files: '**/*.stories.@(js|jsx|ts|tsx)', titlePrefix: '' },
    { directory: '../examples', files: '**/*.stories.@(js|jsx|ts|tsx)', titlePrefix: 'examples' },
  ],
  addons: ['@storybook/addon-themes'],
  framework: '@storybook/react-vite',
})
