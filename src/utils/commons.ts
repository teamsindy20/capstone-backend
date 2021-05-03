import { promises } from 'fs'
import { join } from 'path'

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function importSQL(dirname: string, filename: string) {
  return (await promises.readFile(join(dirname, filename), 'utf-8')).replace(/\s+/gi, ' ')
}

export function camelToSnake(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

export function returnZeroWhenZeroDivision(numerator: number, denominator: number) {
  return denominator !== 0 ? numerator / denominator : 0
}
