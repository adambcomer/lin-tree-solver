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

export interface Word {
  word: string
  pos: string[]
}

export type Sentence = Word[]

export const isSentence = (
  value: unknown,
  ruleSet: RuleSet
): value is Sentence =>
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
