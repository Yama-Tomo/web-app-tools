import { store } from '~/fixtureConfig.ts'

export const isPlaywrightFixtureConfigured = () => {
  return !!store.isFixtureConfigured
}
