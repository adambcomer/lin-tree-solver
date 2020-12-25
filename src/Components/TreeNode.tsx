import React, { useState } from 'react'
import { Node, RuleSet } from '../tree-solver'

const colors = ['#2d7ff9', '#18bfff', '#20d9d2', '#ff08c2', '#f82b60', '#ff6f2c', '#fcb400', '#20c933', '#8b46ff']

interface TreeNodeProps {
  rules: RuleSet
  name: string
  children: Node[]
  words: string[]
  start: number
  width: number
}

const TreeNode: React.FC<TreeNodeProps> = (props) => {
  const [hover, setHover] = useState(false)

  function onTextHover (): void {
    setHover(true)
  }

  function onTextHoverLeave (): void {
    setHover(false)
  }

  if (props.children.length === 0) {
    return (
      <svg y={100} x={`${props.start}%`} width={`${props.width}%`} onMouseEnter={onTextHover} onMouseLeave={onTextHoverLeave} >
        <text x='50%' y={20} fontFamily='Roboto Mono' fontSize='14' fill='#000' textAnchor="middle">{props.name}</text>
        <rect x='50%' y={50 - (hover ? 15 : 0)} width={props.words[0].length * 12} height={(hover ? 20 : 5)} transform={`translate(-${props.words[0].length * 6})`} fill={colors[props.rules.getPosIndex(props.name) % colors.length]} />
        <text x='50%' y={50} fontFamily='Roboto Mono' fontWeight='500' fontSize='16' fill={hover ? '#fff' : '#000'} textAnchor="middle">{props.words[0]}</text>
      </svg>
    )
  }

  const level = props.children[props.children.length - 1].level
  let ranges = []
  let start = props.children.length
  for (let i = props.children.length - 2; i >= 0; i--) {
    if (props.children[i].level === level) {
      ranges.push([i + 1, start])
      start = i + 1
    }
  }
  ranges.push([0, start])

  ranges = ranges.reverse()
  const posInRange = ranges.map(r => props.children.slice(r[0], r[1]).filter(n => props.rules.hasPos(n.tag.name)).length)
  const cumulativePosInRange = posInRange.map((_, i) => posInRange.slice(0, i + 1).reduce((s, n) => n + s, 0))
  const rangeTotal = posInRange.reduce((s, n) => n + s, 0)
  const rangeWidths = posInRange.map(n => n / rangeTotal)
  const cumulativeRangeWidths = rangeWidths.map((_, i) => rangeWidths.slice(0, i + 1).reduce((s, n) => n + s, 0))
  return (
    <svg y={100} x={`${props.start}%`} width={`${props.width}%`}>
      <text x='50%' y='20' fontFamily='Roboto Mono' fontSize='14' fill='#000' textAnchor='middle'>{props.name}</text>
      {ranges.map((r, i) => {
        return (
          <g key={i}>
            <line x1='50%' y1="30" x2={`${(i === 0 ? 0 : cumulativeRangeWidths[i - 1] * 100) + rangeWidths[i] * 50}%`} y2="95" stroke="black" strokeWidth='1.5' strokeLinecap='round' />
            <TreeNode name={props.children[r[1] - 1].tag.name} children={props.children.slice(r[0], r[1] - 1)} start={i === 0 ? 0 : cumulativeRangeWidths[i - 1] * 100} width={rangeWidths[i] * 100} words={props.words.slice((i === 0 ? 0 : cumulativePosInRange[i - 1]), cumulativePosInRange[i] + 1)} rules={props.rules} />
          </g>
        )
      })}
    </svg>
  )
}

export default TreeNode
