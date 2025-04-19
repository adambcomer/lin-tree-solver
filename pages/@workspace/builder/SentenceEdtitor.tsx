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

import { Input } from '@heroui/input'
import {
  Ruleset,
  Sentence,
  SentenceActions,
  SentenceActionTypes
} from './useWorkspace'
import { getColor } from './colors'
import { Dispatch, useState } from 'react'
import { cn } from '@heroui/theme'

interface SentenceEditorProps {
  sentence: Sentence
  ruleset: Ruleset
  updateSentence: Dispatch<SentenceActions>
}

export const SentenceEditor = ({
  sentence,
  ruleset,
  updateSentence
}: SentenceEditorProps) => {
  const [sentenceText, setSentenceText] = useState(
    sentence.words.map((s) => s.text).join(' ')
  )

  return (
    <div className='mt-8'>
      <Input
        size='lg'
        label='Sentence'
        value={sentenceText}
        onChange={(e) => {
          setSentenceText(e.target.value)
          updateSentence({
            type: SentenceActionTypes.UpdateSentenceText,
            text: e.target.value
          })
        }}
      />

      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-8'>
        {sentence.words.map((w, wordIndex) => (
          <div key={wordIndex} className='border-medium rounded-medium p-4'>
            <div className='text-center font-bold'>{w.text}</div>
            <div className='grid grid-cols-2 gap-2 mt-4'>
              {[...ruleset.pos].map((p, i) => (
                <div
                  key={p}
                  style={
                    w.pos.has(p)
                      ? { backgroundColor: getColor(i), color: '#fff' }
                      : {}
                  }
                  onClick={() =>
                    w.pos.has(p)
                      ? updateSentence({
                          type: SentenceActionTypes.DeleteWordPOS,
                          index: wordIndex,
                          pos: p
                        })
                      : updateSentence({
                          type: SentenceActionTypes.AddWordPOS,
                          index: wordIndex,
                          pos: p
                        })
                  }
                  className={cn(
                    'py-2 text-center font-mono cursor-pointer rounded-lg border-medium',
                    {
                      [`bg-${getColor(i)} text-white border-transparent`]:
                        w.pos.has(p)
                    }
                  )}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
