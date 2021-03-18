import { makeStyles } from '@material-ui/core'
import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  zoom: number
}

let frame: number | undefined

const useStyles = makeStyles(() => ({
  canvas: {
    width: '100%',
    height: '100vh',
    fontFamily: 'Roboto Mono',
    background: '#f5f5f5',
    cursor: 'all-scroll'
  }
}))

const TreeCanvas = forwardRef<HTMLCanvasElement, TreeCanvasProps>((props, ref) => {
  const [canvasSize, setCanvasSize] = useState({ height: 0, width: 0 })
  const [canvasPan, setCanvasPan] = useState({ x: 0, y: 0, dx: 0, dy: 0, down: false })
  const canvas = useRef<HTMLCanvasElement>(null)
  const classes = useStyles()

  useLayoutEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(canvas.current)
      } else {
        (ref as any).current = canvas.current
      }
    }
  }, [canvas, ref]);

  useEffect(() => {
    const font = new FontFaceObserver('Roboto Mono')
    font.load().then(() => {
      if (canvas.current == null) return
      setCanvasSize({ width: canvas.current.clientWidth * 4, height: canvas.current.clientHeight * 4 })
    }).catch(() => { })
  }, [canvas, ref])

  const drawTree = useCallback((height: number, width: number, dx: number, dy: number) => {
    if (!height || !width) return
    if (frame) return

    const recursiveDraw = (ctx: CanvasRenderingContext2D, node: Node | string, words: string[], start: number, width: number, level: number): void => {
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

        recursiveDraw(ctx, c, words.slice(cumulative, cumulative + w), (cumulative * widthChunk) + start, w * widthChunk, level + 1)

        cumulative += w
      }
    }

    frame = requestAnimationFrame(() => {
      if (canvas.current == null) return

      const ctx = canvas.current.getContext('2d')
      if (ctx === null) return

      ctx.setTransform(1, 0, 0, 1, 0, 0)

      ctx.clearRect(0, 0, width, height)

      ctx.translate(dx, dy)
      ctx.scale(props.zoom, props.zoom)

      recursiveDraw(ctx, props.tree, props.words.map(w => w.word), 0, width, 0)
      frame = undefined
    })
  }, [canvas, props.zoom, props.rules, props.words, props.tree])

  useEffect(() => {
    drawTree(canvasSize.height, canvasSize.width, canvasPan.dx, canvasPan.dy)
  }, [canvasSize, canvasPan, drawTree])

  function onMouseDownCanvas(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
    setCanvasPan({ ...canvasPan, x: e.clientX, y: e.clientY, down: true })
  }

  function onMouseUpCanvas(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
    setCanvasPan({ ...canvasPan, x: e.clientX, y: e.clientY, down: false })
  }

  function onMouseMoveCanvas(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
    if (!canvasPan.down) return

    const dx = (e.clientX - canvasPan.x) * 4
    const dy = (e.clientY - canvasPan.y) * 4

    setCanvasPan({ ...canvasPan, x: e.clientX, y: e.clientY, dx: canvasPan.dx + dx, dy: canvasPan.dy + dy })
  }

  function onTouchDownCanvas(e: React.TouchEvent<HTMLCanvasElement>): void {
    setCanvasPan({ ...canvasPan, x: e.touches[0].clientX, y: e.touches[0].clientY, down: true })
  }

  function onTouchUpCanvas(e: React.TouchEvent<HTMLCanvasElement>): void {
    setCanvasPan({ ...canvasPan, down: false })
  }

  function onTouchMoveCanvas(e: React.TouchEvent<HTMLCanvasElement>): void {
    if (!canvasPan.down) return

    const dx = (e.touches[0].clientX - canvasPan.x) * 4
    const dy = (e.touches[0].clientY - canvasPan.y) * 4

    setCanvasPan({ ...canvasPan, x: e.touches[0].clientX, y: e.touches[0].clientY, dx: canvasPan.dx + dx, dy: canvasPan.dy + dy })
  }

  return (
    <canvas ref={canvas} width={canvasSize.width} height={canvasSize.height} className={classes.canvas} onMouseDown={onMouseDownCanvas} onMouseUp={onMouseUpCanvas} onMouseMove={onMouseMoveCanvas} onTouchStart={onTouchDownCanvas} onTouchMove={onTouchMoveCanvas} onTouchEnd={onTouchUpCanvas}></canvas>
  )
})

export default TreeCanvas
