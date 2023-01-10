import { Word } from '../Context/SentenceContext'
import { Buffer } from 'buffer'

export const appendState = (path: string, words: Word[]): string => {
  return `${path}#sentence=${Buffer.from(JSON.stringify(words)).toString(
    'base64'
  )}`
}
