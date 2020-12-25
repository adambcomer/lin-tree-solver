import { makeStyles } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { Node, RuleSet, Tree } from '../tree-solver'
import FontFaceObserver from 'fontfaceobserver'
import { getColor } from '../helpers/colors'

interface TreeCanvasProps {
  rules: RuleSet
  words: Array<{
    word: string
    pos: string[]
  }>
  tree: Tree
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
    if (canvas.current == null) {
      return
    }
    setCanvasSize({ width: canvas.current.clientWidth * 4, height: canvas.current.clientHeight * 4 })
  }, [canvas])

  useEffect(() => {
    function drawTree (ctx: CanvasRenderingContext2D, nodes: Node[], words: string[], start: number, width: number): void {
      if (nodes.length === 1) {
        ctx.fillStyle = '#000'
        ctx.textAlign = 'center'
        ctx.font = '64px Roboto Mono'
        ctx.fillText(nodes[0].tag.name, Math.floor(width / 2) + start, 200 + (nodes[0].level * 400))

        ctx.fillStyle = getColor(props.rules.getPosIndex(nodes[0].tag.name))
        ctx.fillRect(Math.floor(width / 2) + start - (26 * words[0].length), 325 + (nodes[0].level * 400), 52 * words[0].length, 20)

        ctx.fillStyle = '#000'
        ctx.font = '500 72px Roboto Mono'
        ctx.fillText(words[0], Math.floor(width / 2) + start, 325 + (nodes[0].level * 400))
        return
      }

      const level = nodes[nodes.length - 1].level
      let ranges = []
      let s = nodes.length - 1
      for (let i = nodes.length - 3; i >= 0; i--) {
        if (nodes[i].level === level + 1) {
          ranges.push([i + 1, s])
          s = i + 1
        }
      }
      ranges.push([0, s])

      ranges = ranges.reverse()
      const posInRange = ranges.map(r => nodes.slice(r[0], r[1]).filter(n => props.rules.hasPos(n.tag.name)).length)
      const cumulativePosInRange = posInRange.map((_, i) => posInRange.slice(0, i + 1).reduce((s, n) => n + s, 0))
      const rangeTotal = posInRange.reduce((s, n) => n + s, 0)
      const rangeWidths = posInRange.map(n => n / rangeTotal)
      const cumulativeRangeWidths = rangeWidths.map((_, i) => rangeWidths.slice(0, i + 1).reduce((s, n) => n + s, 0))

      ctx.fillStyle = '#000'
      ctx.textAlign = 'center'
      ctx.font = '64px Roboto Mono'
      ctx.fillText(nodes[nodes.length - 1].tag.name, Math.floor(width / 2) + start, 200 + (level * 400))

      ranges.forEach((r, i) => {
        ctx.beginPath()
        ctx.moveTo(Math.floor(width / 2) + start, 250 + (level * 400))
        ctx.lineTo((i === 0 ? 0 : cumulativeRangeWidths[i - 1] * width) + (rangeWidths[i] * (width / 2)) + start, 500 + (level * 400))
        ctx.lineWidth = 6
        ctx.lineCap = 'round'
        ctx.stroke()

        drawTree(ctx, nodes.slice(r[0], r[1]), words.slice((i === 0 ? 0 : cumulativePosInRange[i - 1]), cumulativePosInRange[i] + 1), i === 0 ? start : Math.floor(cumulativeRangeWidths[i - 1] * width) + start, Math.floor(rangeWidths[i] * width))
      })
    }

    const font = new FontFaceObserver('Roboto Mono')
    font.load().then(() => {
      requestAnimationFrame(() => {
        if (canvas.current == null) {
          return
        }
        var ctx = canvas.current.getContext('2d')
        if (ctx === null) {
          return
        }
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

        ctx.setTransform(1, 0, 0, 1, 0, 0)

        ctx.translate(canvasPan.dx, canvasPan.dy)
        ctx.scale(canvasZoom, canvasZoom)

        const nodes = props.tree.nodes.filter(n => n.expanded)
        drawTree(ctx, nodes, props.words.map(w => w.word), 0, canvasSize.width)
      })
    }).catch(() => { })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasSize, canvasPan, canvasZoom, props.tree])

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
    <div>
      <canvas ref={canvas} width={canvasSize.width} height={canvasSize.height} className={classes.svg} onMouseDown={onMouseDownCanvas} onMouseUp={onMouseUpCanvas} onMouseMove={onMouseMoveCanvas}></canvas>
    </div>
  )
}

export default TreeCanvas
