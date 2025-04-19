/*
 * Copyright 2025 Adam Bishop Comer
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

import { ISentence } from '../proto/bundle.js'

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
