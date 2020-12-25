import { SET_SENTENCE, ADD_POS, REMOVE_POS } from './types'

interface SetSentenceAction {
  type: typeof SET_SENTENCE
  payload: {
    sentence: string
  }
}

interface AddPosAction {
  type: typeof ADD_POS
  payload: {
    wordIndex: number
    pos: string
  }
}

interface RemovePosAction {
  type: typeof REMOVE_POS
  payload: {
    wordIndex: number
    pos: string
  }
}

export type SentenceActionTypes = SetSentenceAction | AddPosAction | RemovePosAction

export function setSentence (sentence: string): SentenceActionTypes {
  return {
    type: SET_SENTENCE,
    payload: {
      sentence
    }
  }
}

export function addPos (wordIndex: number, pos: string): SentenceActionTypes {
  return {
    type: ADD_POS,
    payload: {
      wordIndex,
      pos
    }
  }
}

export function removePos (wordIndex: number, pos: string): SentenceActionTypes {
  return {
    type: REMOVE_POS,
    payload: {
      wordIndex,
      pos
    }
  }
}
