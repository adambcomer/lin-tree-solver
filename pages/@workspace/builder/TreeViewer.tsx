import { useEffect, useRef, useState } from 'react'
import {
  buildRulesetGrammar,
  Ruleset,
  Sentence
} from '../../../api/useWorkspace'
import TreeCanvas from './TreeCanvas'
import { Node } from '../../../src/types'
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
    const worker = new Worker(
      new URL('../../../src/workers/parser.ts', import.meta.url),
      {
        type: 'module'
      }
    )

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
          <span className='material-symbols-rounded'>chevron_right</span>
        </Button>
      </Tooltip>
      <Tooltip content='Previous Tree' showArrow>
        <Button
          isIconOnly
          className='absolute right-20 top-5'
          disabled={!trees.length || treeIndex === 0}
          onPress={() => setTreeIndex(treeIndex - 1)}
        >
          <span className='material-symbols-rounded'>chevron_left</span>
        </Button>
      </Tooltip>

      <Tooltip content='Save Image' placement='right' showArrow>
        <Button
          isIconOnly
          className='absolute right-5 top-20'
          disabled={!trees.length}
          onPress={saveTreeImage}
        >
          <span className='material-symbols-rounded'>image</span>
        </Button>
      </Tooltip>

      <Tooltip content='Zoom In' showArrow>
        <Button
          isIconOnly
          className='absolute right-5 bottom-5'
          disabled={!trees.length}
          onPress={() => setCanvasZoom(canvasZoom * (4 / 3))}
        >
          <span className='material-symbols-rounded'>zoom_in</span>
        </Button>
      </Tooltip>
      <Tooltip content='Zoom Out' showArrow>
        <Button
          isIconOnly
          className='absolute right-20 bottom-5'
          disabled={!trees.length}
          onPress={() => setCanvasZoom(canvasZoom * (3 / 4))}
        >
          <span className='material-symbols-rounded'>zoom_out</span>
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
