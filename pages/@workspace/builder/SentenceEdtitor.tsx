import { Input } from "@heroui/input"
import {
  Ruleset,
  Sentence,
  SentenceActions,
  SentenceActionTypes
} from '../../../api/useWorkspace'
import { getColor } from '../../../src/helpers/colors'
import { Dispatch, useState } from 'react'
import { Button } from "@heroui/button"

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

      <div className='grid grid-cols-8 gap-4 mt-8'>
        {sentence.map((w, wordIndex) => (
          <div key={wordIndex} className='border-medium rounded-medium p-4'>
            <div className='text-center font-bold'>{w.word}</div>
            <div className='flex flex-wrap gap-2 mt-4'>
              {[...ruleset.pos].map((p, i) => (
                <Button
                  key={p}
                  size='sm'
                  style={
                    w.pos.has(p)
                      ? { backgroundColor: getColor(i), color: '#fff' }
                      : {}
                  }
                  onPress={() =>
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
                  className='font-mono'
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
