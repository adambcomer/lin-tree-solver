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

export interface ParserNode {
  node: string
  terminals: number
  children: Array<ParserNode | string>
}

export interface Node {
  node: string
  terminals: number
  children: Array<Node | WordNode>
}

export function isNode(x: unknown): x is Node {
  return (
    x instanceof Object &&
    'node' in x &&
    typeof x.node === 'string' &&
    'terminals' in x &&
    typeof x.terminals === 'number' &&
    'children' in x &&
    Array.isArray(x.children)
  )
}

export interface WordNode {
  pos: string
  word: string
}

export function isWordNode(x: unknown): x is WordNode {
  return (
    x instanceof Object &&
    'pos' in x &&
    typeof x.pos === 'string' &&
    'word' in x &&
    typeof x.word === 'string'
  )
}
