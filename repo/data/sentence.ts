import { ISentence } from '../proto/bundle'

export const DEFAULT_SENTENCE: ISentence = {
  words: [
    { text: 'The', pos: ['D'] },
    { text: 'small', pos: ['Adj'] },
    { text: 'dog', pos: ['N'] },
    // { word: '[PAST]', pos: ['T'] }, // Necessary for DP-hypothesis
    { text: 'quickly', pos: ['Adv'] },
    { text: 'ran', pos: ['V'] },
    // { word: 'ø', pos: ['D'] }, // Necessary for DP-hypothesis
    { text: 'home', pos: ['N'] },
    { text: 'to', pos: ['P'] },
    { text: 'his', pos: ['D'] },
    { text: 'owner', pos: ['N'] }
  ]
}
