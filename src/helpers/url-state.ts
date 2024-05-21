import { Buffer } from 'buffer'
import { Sentence } from 'src/helpers/sentence'

export function appendState(path: string, sentence: Sentence): string {
  return `${path}#sentence=${Buffer.from(JSON.stringify(sentence)).toString(
    'base64'
  )}`
}
