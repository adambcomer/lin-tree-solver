import { Input } from '@heroui/input'
import {
  Ruleset,
  Sentence,
  SentenceActions,
  SentenceActionTypes
} from '../../../api/useWorkspace'
import { getColor } from '../../../src/helpers/colors'
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
    sentence.map((s) => s.word).join(' ')
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
        {sentence.map((w, wordIndex) => (
          <div key={wordIndex} className='border-medium rounded-medium p-4'>
            <div className='text-center font-bold'>{w.word}</div>
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
