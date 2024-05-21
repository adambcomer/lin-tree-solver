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

import { isObject } from './common'

export interface Tag {
  values: string[]
  optional: boolean
  repeated: boolean
}

export function isTag(value: unknown): value is Tag {
  return (
    isObject(value) &&
    'optional' in value &&
    typeof value.optional === 'boolean' &&
    'repeated' in value &&
    typeof value.repeated === 'boolean' &&
    'values' in value &&
    Array.isArray(value.values)
  )
}

export function tagToString(tag: Tag): string {
  if (tag.optional && tag.repeated) {
    if (tag.values.length === 1) {
      return `(${tag.values[0]}+)`
    }
    return `({${tag.values.join('/')}}+)`
  } else if (tag.optional) {
    if (tag.values.length === 1) {
      return `(${tag.values[0]})`
    }
    return `({${tag.values.join('/')}})`
  }
  if (tag.values.length === 1) {
    return tag.values[0]
  }
  return `{${tag.values.join('/')}}`
}

export interface ExpressionProperties {
  name: string
  tags: Tag[]
}

export function isExpressionProperties(
  value: unknown
): value is ExpressionProperties {
  return (
    isObject(value) &&
    'name' in value &&
    typeof value.name === 'string' &&
    'tags' in value &&
    Array.isArray(value.tags) &&
    value.tags.every(isTag)
  )
}

export class Expression {
  name: string
  tags: Tag[] = []

  constructor(name: string, rule: string) {
    this.name = name

    const matches =
      rule.match(
        /(\({[a-zA-Z_/+]+}\)|{[a-zA-Z_/+]+}|\([a-zA-Z_+]+\)|[a-zA-Z_]+)/g
      ) ?? []
    for (const m of matches) {
      if (m.startsWith('({') && m.endsWith('}+)')) {
        this.tags.push({
          values: m.slice(2, m.length - 3).split('/'),
          optional: true,
          repeated: true
        })
      } else if (m.startsWith('({') && m.endsWith('})')) {
        this.tags.push({
          values: m.slice(2, m.length - 2).split('/'),
          optional: true,
          repeated: false
        })
      } else if (m.startsWith('{') && m.endsWith('}')) {
        this.tags.push({
          values: m.slice(1, m.length - 1).split('/'),
          optional: false,
          repeated: false
        })
      } else if (m.startsWith('(') && m.endsWith('+)')) {
        this.tags.push({
          values: [m.slice(1, m.length - 2)],
          optional: true,
          repeated: true
        })
      } else if (m.startsWith('(') && m.endsWith(')')) {
        this.tags.push({
          values: [m.slice(1, m.length - 1)],
          optional: true,
          repeated: false
        })
      } else {
        this.tags.push({ values: [m], optional: false, repeated: false })
      }
    }
  }

  static FromProps(props: ExpressionProperties): Expression {
    const e: Expression = Object.create(Expression)
    e.tags = props.tags

    return e
  }

  tagsToString(): string {
    return this.tags.map((t) => tagToString(t)).join(' ')
  }
}

export interface RuleSetProperties {
  name: string
  root: string[]
  pos: string[]
  rules: ExpressionProperties[]
}

export function isRuleSetProperties(
  value: unknown
): value is RuleSetProperties {
  return (
    isObject(value) &&
    'name' in value &&
    typeof value.name === 'string' &&
    'pos' in value &&
    Array.isArray(value.pos) &&
    value.pos.every((r: unknown) => typeof r === 'string') &&
    'root' in value &&
    Array.isArray(value.root) &&
    value.root.every((r: unknown) => typeof r === 'string') &&
    'rules' in value &&
    Array.isArray(value.rules) &&
    value.rules.every(isExpressionProperties)
  )
}

export class RuleSet {
  name: string
  root: Set<string> = new Set()
  pos: Set<string> = new Set()
  rules: Map<string, Expression> = new Map()

  constructor(name: string) {
    this.name = name
  }

  static FromProps(props: RuleSetProperties): RuleSet {
    const r = new RuleSet(props.name)
    r.pos = new Set(props.pos)

    for (const root of props.root) {
      if (r.pos.has(root)) {
        r.root.add(root)
      }
    }

    for (const rule of props.rules) {
      r.rules.set(rule.name, Expression.FromProps(rule))
    }

    return r
  }

  addPos(pos: string): void {
    this.pos.add(pos)
  }

  addRule(name: string, rule: string): void {
    this.rules.set(name, new Expression(name, rule))
  }

  addRoot(name: string): void {
    this.root.add(name)
  }

  has(name: string): boolean {
    if (this.pos.has(name) || this.root.has(name)) return true

    return false
  }

  hasRule(name: string): boolean {
    if (this.root.has(name)) return true

    return false
  }

  hasPos(name: string): boolean {
    return this.pos.has(name)
  }

  getRule(name: string): Expression | undefined {
    if (this.rules.has(name)) return this.rules.get(name)
  }

  getPosIndex(name: string): number {
    return [...this.pos].indexOf(name)
  }

  getPos(): Set<string> {
    return this.pos
  }

  getRules(): Map<string, Expression> {
    return this.rules
  }

  getRoot(): Set<string> {
    return this.root
  }

  grammar(): string {
    let g = `main -> ${[...this.root].join('|')}`

    for (const [name, exp] of this.rules) {
      const tags = []
      for (const tag of exp.tags) {
        if (tag.optional && tag.repeated) {
          if (tag.values.length === 1) {
            if (this.hasPos(tag.values[0])) {
              tags.push(`"${tag.values[0]}":*`)
            } else {
              tags.push(`${tag.values[0]}:*`)
            }
          } else {
            tags.push(
              `(${tag.values
                .map((v) => (this.hasPos(v) ? `"${v}"` : v))
                .join('|')}):*`
            )
          }
        } else if (tag.optional) {
          if (tag.values.length === 1) {
            if (this.hasPos(tag.values[0])) {
              tags.push(`"${tag.values[0]}":?`)
            } else {
              tags.push(`${tag.values[0]}:?`)
            }
          } else {
            tags.push(
              `(${tag.values
                .map((v) => (this.hasPos(v) ? `"${v}"` : v))
                .join('|')}):?`
            )
          }
        } else {
          if (tag.values.length === 1) {
            if (this.hasPos(tag.values[0])) {
              tags.push(`"${tag.values[0]}"`)
            } else {
              tags.push(`${tag.values[0]}`)
            }
          } else {
            tags.push(
              `(${tag.values
                .map((v) => (this.hasPos(v) ? `"${v}"` : v))
                .join('|')})`
            )
          }
        }
      }

      const f = `{% 
        (data) => {
          const children = []
          for (let i = 0; i < data.length; i++) {
            if (data[i] !== null) {
              if (Array.isArray(data[i])) {
                for(let j = 0; j < data[i].length; j++) {
                  children.push(data[i][j])
                }
              } else {
                children.push(data[i])
              }
            }
          }
          return {
            node: '${name}',
            terminals: 0,
            children: children
          }
        }
      %}`

      g += `\n${name} -> ${tags.join(' ')} ${f}`
    }
    return g
  }
}
