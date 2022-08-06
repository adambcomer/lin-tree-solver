/*
 * Copyright 2022 Adam Bishop Comer
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

import { compileGrammar } from '../helpers/compile-grammar'
import { Parser, Grammar } from 'nearley'
import { Node } from '../types'

function clone(node: Node): Node {
  const children = []
  for (const c of node.children) {
    if (typeof c !== 'string') {
      children.push(clone(c))
    } else {
      children.push(c)
    }
  }

  return {
    ...node,
    children,
  }
}

function countTerminal(node: Node): void {
  for (const c of node.children) {
    if (typeof c !== 'string') {
      countTerminal(c)
      node.terminals += c.terminals
    } else {
      node.terminals += 1
    }
  }
}

function combinations(pos: string[][]): string[] {
  if (pos.length === 1) {
    return pos[0]
  }

  let strings: string[] = []
  for (let i = 0; i < pos[0].length; i++) {
    const nextStrings = combinations(pos.slice(1))
    strings = strings.concat(nextStrings.map((s) => pos[0][i] + s))
  }
  return strings
}

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any

ctx.onmessage = (
  e: MessageEvent<{
    grammar: string
    words: Array<{ word: string; pos: string[] }>
  }>
) => {
  const treeFilter = new Set()
  const grammar = Grammar.fromCompiled(compileGrammar(e.data.grammar))

  let trees: Node[] = []
  const strings = combinations(e.data.words.map((w) => w.pos))
  for (const string of strings) {
    try {
      const parser = new Parser(grammar)
      parser.feed(string)
      const t = parser
        .finish()
        .map((t) => clone(t[0]))
        .filter((t) =>
          !treeFilter.has(JSON.stringify(t))
            ? treeFilter.add(JSON.stringify(t))
            : false
        )

      for (let i = 0; i < t.length; i++) {
        countTerminal(t[i])
      }
      trees = trees.concat(t)
    } catch (e) {
      console.log(e)
    }
  }

  postMessage({ trees, searched: 1 })
}

export default {}
