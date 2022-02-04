import React from 'react'

export interface Word {
  word: string
  pos: string[]
}

export interface Sentence {
  words: Word[]
}

export const SentenceContext = React.createContext<{ words: Word[], setWords: (words: Word[]) => void }>({ words: [], setWords: (words: Word[]) => { } })
