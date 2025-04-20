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

import { compileGrammar } from './compile-grammar'
import { Parser, Grammar } from 'nearley'
import { Node } from './types'

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
    children
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

function combinations(pos: string[][]): string[][] {
  if (pos.length === 1) {
    return pos[0].map((p) => [p])
  }

  const nextStrings = combinations(pos.slice(1))

  let strings: string[][] = []
  for (let i = 0; i < pos[0].length; i++) {
    strings = strings.concat(
      nextStrings.map((s) => {
        return [pos[0][i], ...s]
      })
    )
  }
  return strings
}

// eslint-disable-next-line
const ctx: Worker = self as any

ctx.onmessage = (
  e: MessageEvent<{
    grammar: string
    words: Array<{ word: string; pos: string[] }>
  }>
) => {
  if (e.data.words.length === 0) {
    return postMessage({ trees: [] })
  }

  const treeFilter = new Set()
  const grammar = Grammar.fromCompiled(compileGrammar(e.data.grammar))

  let trees: Node[] = []
  const errors = []
  const posCombinations = combinations(e.data.words.map((w) => w.pos))
  for (const comb of posCombinations) {
    const parser = new Parser(grammar, { keepHistory: true })
    try {
      parser.feed(comb.join(''))
      const t = parser
        .finish()
        .map((t: Node[]) => clone(t[0]))
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
      if (
        e instanceof Error &&
        'offset' in e &&
        typeof e.offset === 'number' &&
        'token' in e &&
        typeof e.token === 'object' &&
        e.token !== null &&
        'value' in e.token
      ) {
        // @ts-expect-error: Method not in types
        const expectantStates = parser.table[e.offset].states.filter(
          // @ts-expect-error: Unknown type
          (state) => {
            const nextSymbol = state.rule.symbols[state.dot]
            return nextSymbol && typeof nextSymbol !== 'string'
          }
        )

        let token = ''
        let offsetCounter = e.offset
        let offset = 0
        for (let i = 0; i < comb.length; i++) {
          if (offsetCounter === 0) {
            token = comb[i]
            offset = i
            break
          } else if (offsetCounter < 0) {
            token = comb[i - 1]
            offset = i - 1
            break
          }

          offsetCounter -= comb[i].length
        }

        if (expectantStates.length === 0) {
          errors.push({
            token,
            offset,
            tokens: [],
            pos: comb
          })
        } else {
          const expectedTokens = new Set<string>()

          // @ts-expect-error: Unknown type
          const stateStacks = expectantStates.map((state) => {
            // @ts-expect-error: Method not in types
            return parser.buildFirstStateStack(state, []) || [state]
          })

          stateStacks.forEach(
            (
              stateStack: Array<{
                dot: number
                rule: { symbols: Array<string | { literal: string }> }
              }>
            ) => {
              const stackSymbols = stateStack[0].rule.symbols
              const stackDot = stateStack[0].dot

              if (
                stackSymbols.every(
                  (s) => typeof s === 'object' && 'literal' in s
                )
              ) {
                expectedTokens.add(
                  `"${(stackSymbols as Array<{ literal: string }>)
                    .map((s) => s.literal)
                    .join('')}"`
                )
              } else {
                let start = stackDot + 1
                for (let i = stackDot; i >= 0; i--) {
                  const sym = stackSymbols[i]
                  if (typeof sym === 'string') {
                    break
                  }
                  start -= 1
                }

                let end = stackDot
                for (let i = stackDot; i < stackSymbols.length; i++) {
                  const sym = stackSymbols[i]
                  if (typeof sym === 'string') {
                    break
                  }
                  end += 1
                }

                expectedTokens.add(
                  `"${(
                    stackSymbols.slice(start, end) as Array<{ literal: string }>
                  )
                    .map((s) => s.literal)
                    .join('')}"`
                )
              }
            }
          )

          errors.push({
            token,
            offset,
            tokens: [...expectedTokens],
            pos: comb
          })
        }
      }
    }
  }

  if (trees.length === 0) {
    postMessage({ errors })
  } else {
    postMessage({ trees })
  }
}

export default {}
