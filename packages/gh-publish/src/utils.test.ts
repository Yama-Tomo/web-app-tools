import { execSync } from 'node:child_process'
import fs from 'node:fs'

import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.spyOn(console, 'warn').mockImplementation(() => undefined)

vi.mock('node:child_process')
vi.mock('node:fs')

describe('createReleaseName', () => {
  const createReleaseName = async (
    ...args: Parameters<typeof import('./utils.ts')['createReleaseName']>
  ) => (await import('./utils.ts')).createReleaseName(...args)

  it('removes scope and combines with version', async () => {
    expect(await createReleaseName('@scope/pkg', '1.2.3')).toBe('pkg-1.2.3')
    expect(await createReleaseName('pkg', '0.0.1')).toBe('pkg-0.0.1')
  })
})

describe('getGitInfo', () => {
  const getGitInfo = async () => (await import('./utils.ts')).getGitInfo()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('parses owner and repo from https remote url', async () => {
    vi.mocked(execSync).mockReturnValue('https://github.com/owner/repo.git\n')
    expect(await getGitInfo()).toEqual({ owner: 'owner', repo: 'repo' })
  })

  it('parses owner and repo from ssh remote url', async () => {
    vi.mocked(execSync).mockReturnValue('git@github.com:owner/repo.git\n')
    expect(await getGitInfo()).toEqual({ owner: 'owner', repo: 'repo' })
  })

  it('throws if owner is missing', async () => {
    vi.mocked(execSync).mockReturnValue('https://github.com//repo.git\n')
    await expect(getGitInfo()).rejects.toThrow(
      'Could not parse repo owner from remote URL: https://github.com//repo.git',
    )
  })

  it('throws if repo is missing', async () => {
    vi.mocked(execSync).mockReturnValue('https://github.com/owner/.git\n')
    await expect(getGitInfo()).rejects.toThrow(
      'Could not parse repo name from remote URL: https://github.com/owner/.git',
    )
  })
})

describe('extractChangelogContent', () => {
  const extractChangesetsChangelogContent = async (
    ...args: Parameters<typeof import('./utils.ts')['extractChangesetsChangelogContent']>
  ) => (await import('./utils.ts')).extractChangesetsChangelogContent(...args)

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(fs.existsSync).mockReturnValue(true)
  })

  it('should extract the latest version correctly when multiple versions exist', async () => {
    const multiVersionLog = `
## 1.0.0

### Patch Changes

- changes1
- changes2

## 0.9.0

### Patch Changes

- changes2
`
    vi.mocked(fs.readFileSync).mockReturnValue(multiVersionLog)

    const expected = `### Patch Changes

- changes1
- changes2`
    expect(await extractChangesetsChangelogContent('1.0.0')).toBe(expected)
  })

  it('should extract content correctly when only a single version exists (end of file)', async () => {
    const singleVersionLog = `
## 1.0.0

### Patch Changes

- changes1
- changes2
`
    vi.mocked(fs.readFileSync).mockReturnValue(singleVersionLog)

    const expected = `### Patch Changes

- changes1
- changes2`
    expect(await extractChangesetsChangelogContent('1.0.0')).toBe(expected)
  })

  it('should extract content for a version with a pre-release tag (e.g., -beta.1)', async () => {
    const logWithPrerelease = `
## 1.0.0

- final changes

## 1.2.3-beta.1

### Patch Changes

- beta.1 changes

## 1.2.3-beta.0

### Patch Changes
- beta.0 changes
`
    vi.mocked(fs.readFileSync).mockReturnValue(logWithPrerelease)

    const expected = `### Patch Changes

- beta.1 changes`
    expect(await extractChangesetsChangelogContent('1.2.3-beta.1')).toBe(expected)
  })

  it('should include non-version headers as part of the content', async () => {
    const logWithNonVersionHeader = `
## 1.0.0

### Patch Changes

- changes1
- changes2

## [Unreleased]

- future changes
- note1

## 0.9.0

### Patch Changes
- changes2
`
    vi.mocked(fs.readFileSync).mockReturnValue(logWithNonVersionHeader)

    const expected = `### Patch Changes

- changes1
- changes2

## [Unreleased]

- future changes
- note1`
    expect(await extractChangesetsChangelogContent('1.0.0')).toBe(expected)
  })

  it('should return an error message if the specified version does not exist', async () => {
    const singleVersionLog = `
## 1.0.0

### Patch Changes

- changes1
- changes2
`
    vi.mocked(fs.readFileSync).mockReturnValue(singleVersionLog)

    expect(await extractChangesetsChangelogContent('9.9.9')).toBe('')
  })

  it('warns if CHANGELOG does not exist', async () => {
    vi.mocked(fs).existsSync.mockReturnValue(false)

    expect(await extractChangesetsChangelogContent('1.0.0')).toBe('')
    expect(vi.mocked(console).warn).toHaveBeenCalledWith('⚠️  CHANGELOG file not found.')
  })
})
