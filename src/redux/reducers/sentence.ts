import { SentenceActionTypes } from '../actions/sentence'
import { SET_SENTENCE, ADD_POS, REMOVE_POS } from '../actions/types'

export interface SentenceReducerState {
  words: Array<{
    word: string
    pos: string[]
  }>
}

const initialState: SentenceReducerState = {
  words: [
    { word: 'The', pos: ['D'] },
    { word: 'small', pos: ['Adj'] },
    { word: 'dog', pos: ['N'] },
    { word: 'quickly', pos: ['Adv'] },
    { word: 'ran', pos: ['V'] },
    { word: 'home', pos: ['N'] },
    { word: 'to', pos: ['P'] },
    { word: 'his', pos: ['D'] },
    { word: 'owner', pos: ['N'] }
  ]
}

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function reducer (state = initialState, action: SentenceActionTypes): SentenceReducerState {
  switch (action.type) {
    case SET_SENTENCE: {
      const { sentence } = action.payload

      const words: Array<{ word: string, pos: string[] }> = []
      sentence.split(' ').forEach(w => {
        if (w === '') {
          return
        }
        words.push({ word: w, pos: [] })
      })

      return {
        ...state,
        words
      }
    }
    case ADD_POS: {
      const { wordIndex, pos } = action.payload

      if (wordIndex >= state.words.length || state.words[wordIndex].pos.includes(pos)) {
        return state
      }

      const words = [...state.words]
      words[wordIndex].pos.push(pos)

      return {
        ...state,
        words
      }
    }
    case REMOVE_POS: {
      const { wordIndex, pos } = action.payload

      if (wordIndex >= state.words.length) {
        return state
      }

      const words = [...state.words]
      words[wordIndex].pos = words[wordIndex].pos.filter(p => p !== pos)

      return {
        ...state,
        words
      }
    }
    default:
      return state
  }
}
