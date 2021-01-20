import { makeStyles } from '@material-ui/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RuleSet } from '../helpers/ruleset'
import FontFaceObserver from 'fontfaceobserver'
import { getColor } from '../helpers/colors'
import { Node } from '../types'

interface TreeCanvasProps {
  rules: RuleSet
  words: Array<{
    word: string
    pos: string[]
  }>
  tree: Node
}

const useStyles = makeStyles(() => ({
  svg: {
    width: '100%',
    height: '100vh',
    fontFamily: 'Roboto Mono',
    background: '#f5f5f5',
    cursor: 'all-scroll'
  }
}))

const TreeCanvas: React.FC<TreeCanvasProps> = (props) => {
  const [canvasSize, setCanvasSize] = useState({ height: 0, width: 0 })
  const [canvasPan, setCanvasPan] = useState({ x: 0, y: 0, dx: 0, dy: 0, down: false })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [canvasZoom, setCanvasZoom] = useState(1)
  const canvas = useRef<HTMLCanvasElement>(null)
  const classes = useStyles()

  useEffect(() => {
    const font = new FontFaceObserver('Roboto Mono')
    font.load().then(() => {
      if (canvas.current == null) {
        return
      }
      setCanvasSize({ width: canvas.current.clientWidth * 4, height: canvas.current.clientHeight * 4 })
    }).catch(() => { })
  }, [canvas])

  const drawTree = useCallback((ctx: CanvasRenderingContext2D, node: Node | string, words: string[], start: number, width: number, level: number): void => {
    if (typeof node === 'string') {
      ctx.fillStyle = '#000'
      ctx.textAlign = 'center'
      ctx.font = '64px Roboto Mono'
      ctx.fillText(node, Math.floor((width / 2) + start), 200 + (level * 400))

      ctx.fillStyle = getColor(props.rules.getPosIndex(node))
      ctx.fillRect(Math.floor((width / 2) + start - (26 * words[0].length)), 325 + (level * 400), 52 * words[0].length, 20)

      ctx.fillStyle = '#000'
      ctx.font = '500 72px Roboto Mono'
      ctx.fillText(words[0], Math.floor((width / 2) + start), 325 + (level * 400))
      return
    }

    ctx.fillStyle = '#000'
    ctx.textAlign = 'center'
    ctx.font = '64px Roboto Mono'
    ctx.fillText(node.node, Math.floor((width / 2) + start), 200 + (level * 400))

    const widthChunk = width * (1 / node.terminals)

    let cumulative = 0
    for (const c of node.children) {
      let w = 1
      if (c instanceof Object) {
        w = c.terminals
      }

      ctx.beginPath()
      ctx.moveTo(Math.floor((width / 2) + start), 250 + (level * 400))
      ctx.lineTo(Math.floor((cumulative * widthChunk) + (((w * widthChunk) / 2)) + start), 500 + (level * 400))
      ctx.lineWidth = 6
      ctx.lineCap = 'round'
      ctx.stroke()

      drawTree(ctx, c, words.slice(cumulative, cumulative + w), (cumulative * widthChunk) + start, w * widthChunk, level + 1)

      cumulative += w
    }
  }, [props.rules])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (canvas.current == null) return

      var ctx = canvas.current.getContext('2d')
      if (ctx === null) return

      ctx.setTransform(1, 0, 0, 1, 0, 0)

      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

      ctx.translate(canvasPan.dx, canvasPan.dy)
      ctx.scale(canvasZoom, canvasZoom)

      drawTree(ctx, props.tree, props.words.map(w => w.word), 0, canvasSize.width, 0)
    })

    return () => cancelAnimationFrame(frame)
  }, [canvasSize, canvasPan.dx, canvasPan.dy, canvasZoom, props.tree, props.words, drawTree])

  function onMouseDownCanvas (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
    setCanvasPan({ ...canvasPan, x: e.clientX, y: e.clientY, down: true })
  }

  function onMouseUpCanvas (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
    setCanvasPan({ ...canvasPan, x: e.clientX, y: e.clientY, down: false })
  }

  function onMouseMoveCanvas (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
    if (!canvasPan.down) return

    const dx = (e.clientX - canvasPan.x) * 4
    const dy = (e.clientY - canvasPan.y) * 4

    setCanvasPan({ ...canvasPan, x: e.clientX, y: e.clientY, dx: canvasPan.dx + dx, dy: canvasPan.dy + dy })
  }

  return (
    <canvas ref={canvas} width={canvasSize.width} height={canvasSize.height} className={classes.svg} onMouseDown={onMouseDownCanvas} onMouseUp={onMouseUpCanvas} onMouseMove={onMouseMoveCanvas}></canvas>
  )
}

export default TreeCanvas
