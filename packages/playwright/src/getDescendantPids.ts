import { execSync } from 'node:child_process'

export const getDescendantPids = (pid: number) => {
  if (process.platform.startsWith('win')) {
    throw new Error('getDescendantPids unsupported on Windows')
  }

  let children: number[] = []
  try {
    children = execSync(`pgrep -P ${pid}`, { encoding: 'utf8' }).trim().split('\n').map(Number)
  } catch {}

  const pids: number[] = []

  if (children.length > 0) {
    children.forEach((childPid) => {
      pids.push(childPid)
      pids.push(...getDescendantPids(childPid))
    })
  }

  return pids
}
