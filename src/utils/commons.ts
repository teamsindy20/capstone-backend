import { readFileSync } from 'fs'
import { join } from 'path'

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function importSQL(dirname: string, filename: string) {
  return readFileSync(join(dirname, filename), 'utf-8').replace(/\s+/gi, ' ')
}
