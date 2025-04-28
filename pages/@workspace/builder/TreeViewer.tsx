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

import { useEffect, useRef, useState } from 'react'
import { buildRulesetGrammar, Ruleset, Sentence } from './useWorkspace'
import TreeCanvas from './TreeCanvas'
import { Node } from './types'
import { Spinner } from '@heroui/spinner'
import { Tooltip } from '@heroui/tooltip'
import { Button } from '@heroui/button'

interface TreeViewerProps {
  sentence: Sentence
  ruleset: Ruleset
}

export const TreeViewer = ({ sentence, ruleset }: TreeViewerProps) => {
  const [trees, setTrees] = useState<Node[]>([])
  const [treeIndex, setTreeIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] =
    useState<
      { token: string; offset: number; tokens: string[]; pos: string[] }[]
    >()
  const [canvasZoom, setCanvasZoom] = useState(1)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const worker = new Worker(new URL('./parser.ts', import.meta.url), {
      type: 'module'
    })

    const t1 = performance.now()
    worker.onmessage = (
      e: MessageEvent<
        | { trees: Node[] }
        | {
            errors: {
              token: string
              offset: number
              tokens: string[]
              pos: string[]
            }[]
          }
      >
    ) => {
      if ('trees' in e.data) {
        setTrees(e.data.trees)
        setTreeIndex(0)
        setErrors([])

        console.log(`Solved in ${performance.now() - t1}ms`)
      } else {
        setTrees([])
        setTreeIndex(0)
        setErrors(e.data.errors)
      }
      setLoading(false)
    }
    worker.postMessage({
      grammar: buildRulesetGrammar(ruleset),
      words: sentence.words.map((w) => ({ word: w.text, pos: [...w.pos] }))
    })
  }, [ruleset, sentence])

  const saveTreeImage = (): void => {
    if (canvas.current === null) return

    const image = document.createElement('canvas')
    image.width = canvas.current.width
    image.height = canvas.current.height

    const context = image.getContext('2d')
    if (context === null) return
    context.fillStyle = '#fff'
    context.fillRect(0, 0, image.width, image.height)
    context.drawImage(canvas.current, 0, 0)

    const png = image
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    const link = document.createElement('a')
    link.download = 'tree.png'
    link.href = png
    link.click()
  }

  if (loading) {
    return (
      <div className='mt-8 flex items-center justify-center h-32'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='mt-8 w-full aspect-video relative'>
      <Tooltip content='Next Tree' showArrow>
        <Button
          isIconOnly
          className='absolute right-5 top-5'
          disabled={!trees.length || treeIndex === trees.length - 1}
          onPress={() => setTreeIndex(treeIndex + 1)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z' />
          </svg>
        </Button>
      </Tooltip>
      <Tooltip content='Previous Tree' showArrow>
        <Button
          isIconOnly
          className='absolute right-20 top-5'
          disabled={!trees.length || treeIndex === 0}
          onPress={() => setTreeIndex(treeIndex - 1)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='m432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z' />
          </svg>
        </Button>
      </Tooltip>

      <Tooltip content='Save Image' placement='right' showArrow>
        <Button
          isIconOnly
          className='absolute right-5 top-20'
          disabled={!trees.length}
          onPress={saveTreeImage}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0 0v-560 560Zm80-80h400q12 0 18-11t-2-21L586-459q-6-8-16-8t-16 8L450-320l-74-99q-6-8-16-8t-16 8l-80 107q-8 10-2 21t18 11Z' />
          </svg>
        </Button>
      </Tooltip>

      <Tooltip content='Zoom In' showArrow>
        <Button
          isIconOnly
          className='absolute right-5 bottom-5'
          disabled={!trees.length}
          onPress={() => setCanvasZoom(canvasZoom * (4 / 3))}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='M340-540h-40q-17 0-28.5-11.5T260-580q0-17 11.5-28.5T300-620h40v-40q0-17 11.5-28.5T380-700q17 0 28.5 11.5T420-660v40h40q17 0 28.5 11.5T500-580q0 17-11.5 28.5T460-540h-40v40q0 17-11.5 28.5T380-460q-17 0-28.5-11.5T340-500v-40Zm40 220q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z' />
          </svg>
        </Button>
      </Tooltip>
      <Tooltip content='Zoom Out' showArrow>
        <Button
          isIconOnly
          className='absolute right-20 bottom-5'
          disabled={!trees.length}
          onPress={() => setCanvasZoom(canvasZoom * (3 / 4))}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
          >
            <path d='M320-540q-17 0-28.5-11.5T280-580q0-17 11.5-28.5T320-620h120q17 0 28.5 11.5T480-580q0 17-11.5 28.5T440-540H320Zm60 220q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z' />
          </svg>
        </Button>
      </Tooltip>

      {!!errors?.length && (
        <div className='mx-auto w-full font-mono overflow-y-scroll h-screen'>
          {errors.map((err, i) => (
            <div className='mt-2' key={i}>
              <div className='font-medium'>
                Unexpected token &quot;{err.token}&quot; at position{' '}
                {err.offset} in the following sentence:
              </div>
              <div className='mt-1'>
                {sentence.words.map((word, i) => {
                  return (
                    <span
                      className={
                        i === err.offset
                          ? 'mr-1 font-medium text-red-500 underline'
                          : 'mr-1'
                      }
                      key={word.text + err.pos[i]}
                    >
                      {word.text}({err.pos[i]})
                    </span>
                  )
                })}
              </div>
              <div className='mt-1'>
                Expected one of the following parts of speech:{' '}
                {err.tokens.join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {trees.length ? (
        <TreeCanvas
          ref={canvas}
          tree={trees[treeIndex]}
          sentence={sentence}
          ruleset={ruleset}
          zoom={canvasZoom}
        />
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          viewBox='0 100 1000 500'
        >
          <text
            x='50%'
            y='50%'
            fontFamily='Roboto Mono'
            fontSize='16'
            fill='#000'
            textAnchor='middle'
          >
            No Complete Trees Found
          </text>
        </svg>
      )}
    </div>
  )
}
