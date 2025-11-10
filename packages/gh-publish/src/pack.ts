import { type ExecSyncOptions, execSync } from 'node:child_process'
import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'

import { getPackages } from '@manypkg/get-packages'

import { createReleaseName, getGitInfo, getPackageJsonContent } from './utils.ts'

const getUsingPackageManager = () => {
  const userAgent = process.env.npm_config_user_agent

  if (userAgent?.includes('pnpm')) {
    return 'pnpm'
  } else if (userAgent?.includes('bun')) {
    return 'bun'
  } else if (userAgent?.includes('yarn')) {
    return 'yarn'
  }

  return 'npm'
}

const getDeps = async () => {
  const packageJson = await getPackageJsonContent(path.join(process.cwd(), 'package.json'))
  return Object.keys(packageJson.dependencies || []).concat(
    Object.keys(packageJson.optionalDependencies || []),
  )
}

const cleanup = (outputTarFile: string) => {
  if (fs.existsSync(outputTarFile)) {
    fs.rmSync(outputTarFile)
  }
}

const _pack = (outputTarFile: string, options?: ExecSyncOptions) => {
  const stdout = execSync(`${getUsingPackageManager()} pack`, { ...options, encoding: 'utf-8' })

  const maybeTarFiles = fs.readdirSync(process.cwd()).filter((name) => name.endsWith('.tgz'))
  const tarFile = maybeTarFiles.at(0)

  if (maybeTarFiles.length === 0 || !tarFile) {
    throw new Error('No package tarball found after packing.')
  } else if (maybeTarFiles.length > 1) {
    throw new Error('Multiple package tarballs found after packing.')
  }

  fs.copyFileSync(tarFile, outputTarFile)
  fs.rmSync(tarFile)

  return stdout
}

const rewriteDepsVersionsToGHReleaseUrl = async (
  outputTarFile: string,
  isWorkspacePackage: (packageName: string) => boolean,
) => {
  const tarName = path.basename(outputTarFile)

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gh-pack-'))

  execSync(`tar xzf ${outputTarFile} -C ${tempDir}`)
  fs.rmSync(outputTarFile)

  const repo = getGitInfo()

  const rewrite = (dependencies: Record<string, string>) => {
    Object.entries(dependencies)
      .filter(([packageName]) => isWorkspacePackage(packageName))
      .forEach(([packageName, version]) => {
        const url = `https://github.com/${repo.owner}/${repo.repo}/releases/download/${createReleaseName(packageName, version)}/${tarName}`

        console.log(`♻️  Rewriting dependency ${packageName}@${version} -> ${url}`)
        dependencies[packageName] = url
      })
  }

  const cwd = process.cwd()

  const workingDir = path.join(tempDir, 'package')
  const packageJsonFile = path.join(workingDir, 'package.json')

  process.chdir(workingDir)

  const packageJson = await getPackageJsonContent(packageJsonFile)
  if (packageJson.dependencies) {
    rewrite(packageJson.dependencies)
  }
  if (packageJson.optionalDependencies) {
    rewrite(packageJson.optionalDependencies)
  }
  fs.writeFileSync(packageJsonFile, `${JSON.stringify(packageJson, null, 2)}\n`)
  _pack(outputTarFile, { stdio: 'ignore' })

  process.chdir(cwd)

  fs.rmSync(tempDir, { recursive: true, force: true })
}

export const pack = async (tarName: string) => {
  const packageInfo = await getPackages(process.cwd())
  if (packageInfo.packages.length === 0) {
    console.warn('⚠️  No packages found.')
  }

  const isWorkspacePackage = (packageName: string) =>
    packageInfo.packages.some(({ packageJson }) => packageJson.name === packageName)

  const outputTarFile = path.join(process.cwd(), tarName)

  cleanup(outputTarFile)

  _pack(outputTarFile, { stdio: 'inherit' })

  if ((await getDeps()).some(isWorkspacePackage)) {
    await rewriteDepsVersionsToGHReleaseUrl(outputTarFile, isWorkspacePackage)
  }

  console.log(`✅  Packed file created at ${outputTarFile}`)

  return outputTarFile
}
