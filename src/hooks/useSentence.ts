/*
 * Copyright 2024 Adam Bishop Comer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { isObject } from 'src/helpers/common'
import { RuleSet } from 'src/helpers/ruleset'
import { Sentence } from 'src/types'

const DEFAULT_SENTENCE: Sentence = [
  { word: 'The', pos: ['D'] },
  { word: 'small', pos: ['Adj'] },
  { word: 'dog', pos: ['N'] },
  // { word: '[PAST]', pos: ['T'] }, // Necessary for DP-hypothesis
  { word: 'quickly', pos: ['Adv'] },
  { word: 'ran', pos: ['V'] },
  // { word: 'ø', pos: ['D'] }, // Necessary for DP-hypothesis
  { word: 'home', pos: ['N'] },
  { word: 'to', pos: ['P'] },
  { word: 'his', pos: ['D'] },
  { word: 'owner', pos: ['N'] }
]

const isSentence = (value: unknown, ruleSet: RuleSet): value is Sentence =>
  Array.isArray(value) &&
  value.every((v) => {
    return (
      isObject(v) &&
      'word' in v &&
      typeof v.word === 'string' &&
      'pos' in v &&
      Array.isArray(v.pos) &&
      v.pos.every((p: unknown) => typeof p === 'string' && ruleSet.hasPos(p))
    )
  })

const parseSentenceParam = (
  sentence: string,
  ruleSet: RuleSet
): Sentence | null => {
  try {
    const parsedSentence: unknown = JSON.parse(
      Buffer.from(sentence, 'base64').toString('utf-8')
    )

    if (isSentence(parsedSentence, ruleSet)) {
      return parsedSentence
    }
  } catch (e) {
    console.error(e)
  }

  return null
}

interface UseSentenceResponse {
  sentence: Sentence
  setSentence: (sentence: Sentence) => void
}

export const useSentence = (ruleSet: RuleSet): UseSentenceResponse => {
  if (typeof location === 'undefined') {
    return {
      sentence: DEFAULT_SENTENCE,
      setSentence: () => {}
    }
  }

  const params = new URLSearchParams(
    location.hash.length ? location.hash.slice(1) : ''
  )

  const sentence =
    parseSentenceParam(params.get('sentence') ?? '', ruleSet) ??
    DEFAULT_SENTENCE

  return {
    sentence,
    setSentence: () => {}
  }
}
