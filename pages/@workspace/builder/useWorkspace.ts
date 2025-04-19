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

import { useReducer } from 'react'

interface WordData {
  text: string
  pos: string[]
}

interface SentenceData {
  words: WordData[]
}

export interface Word {
  text: string
  pos: Set<string>
}

export interface Sentence {
  words: Word[]
}

export enum SentenceActionTypes {
  SetSentence,
  UpdateSentenceText,
  AddWordPOS,
  DeleteWordPOS
}

export type SentenceActions =
  | {
      type: SentenceActionTypes.SetSentence
      data: SentenceData
    }
  | { type: SentenceActionTypes.UpdateSentenceText; text: string }
  | {
      type: SentenceActionTypes.AddWordPOS
      index: number
      pos: string
    }
  | {
      type: SentenceActionTypes.DeleteWordPOS
      index: number
      pos: string
    }

export interface Tag {
  values: string[]
  optional: boolean
  repeated: boolean
}

export interface Rule {
  name: string
  tags: Tag[]
}

export const parseRuleTags = (rule: string) => {
  return (
    rule
      .match(/(\({[a-zA-Z_/+]+}\)|{[a-zA-Z_/+]+}|\([a-zA-Z_+]+\)|[a-zA-Z_]+)/g)
      ?.map((t) => {
        if (t.startsWith('({') && t.endsWith('}+)')) {
          return {
            values: t.slice(2, t.length - 3).split('/'),
            optional: true,
            repeated: true
          }
        } else if (t.startsWith('({') && t.endsWith('})')) {
          return {
            values: t.slice(2, t.length - 2).split('/'),
            optional: true,
            repeated: false
          }
        } else if (t.startsWith('{') && t.endsWith('}')) {
          return {
            values: t.slice(1, t.length - 1).split('/'),
            optional: false,
            repeated: false
          }
        } else if (t.startsWith('(') && t.endsWith('+)')) {
          return {
            values: [t.slice(1, t.length - 2)],
            optional: true,
            repeated: true
          }
        } else if (t.startsWith('(') && t.endsWith(')')) {
          return {
            values: [t.slice(1, t.length - 1)],
            optional: true,
            repeated: false
          }
        } else {
          return { values: [t], optional: false, repeated: false }
        }
      }) ?? []
  )
}

export const tagToString = (tag: Tag) => {
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

interface RulesetData {
  name: string
  roots: string[]
  pos: string[]
  rules: Rule[]
}

export interface Ruleset {
  roots: Set<string>
  pos: Set<string>
  rules: Rule[]
}

export const buildRulesetGrammar = (ruleset: Ruleset) => {
  let g = `main -> ${[...ruleset.roots].join('|')}`

  for (const rule of ruleset.rules) {
    const tags = []
    for (const tag of rule.tags) {
      if (tag.optional && tag.repeated) {
        if (tag.values.length === 1) {
          if (ruleset.pos.has(tag.values[0])) {
            tags.push(`"${tag.values[0]}":*`)
          } else {
            tags.push(`${tag.values[0]}:*`)
          }
        } else {
          tags.push(
            `(${tag.values
              .map((v) => (ruleset.pos.has(v) ? `"${v}"` : v))
              .join('|')}):*`
          )
        }
      } else if (tag.optional) {
        if (tag.values.length === 1) {
          if (ruleset.pos.has(tag.values[0])) {
            tags.push(`"${tag.values[0]}":?`)
          } else {
            tags.push(`${tag.values[0]}:?`)
          }
        } else {
          tags.push(
            `(${tag.values
              .map((v) => (ruleset.pos.has(v) ? `"${v}"` : v))
              .join('|')}):?`
          )
        }
      } else {
        if (tag.values.length === 1) {
          if (ruleset.pos.has(tag.values[0])) {
            tags.push(`"${tag.values[0]}"`)
          } else {
            tags.push(`${tag.values[0]}`)
          }
        } else {
          tags.push(
            `(${tag.values
              .map((v) => (ruleset.pos.has(v) ? `"${v}"` : v))
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
            node: '${rule.name}',
            terminals: 0,
            children: children
          }
        }
      %}`

    g += `\n${rule.name} -> ${tags.join(' ')} ${f}`
  }
  return g
}

export enum RulesetActionTypes {
  SetRuleset,
  AddPOS,
  DeletePOS,
  AddRoot,
  DeleteRoot,
  AddRule,
  DeleteRule,
  UpdateRule
}

export type RulesetActions =
  | {
      type: RulesetActionTypes.SetRuleset
      data: RulesetData
    }
  | {
      type: RulesetActionTypes.AddPOS
      pos: string
    }
  | {
      type: RulesetActionTypes.DeletePOS
      pos: string
    }
  | {
      type: RulesetActionTypes.AddRoot
      root: string
    }
  | {
      type: RulesetActionTypes.DeleteRoot
      root: string
    }
  | {
      type: RulesetActionTypes.AddRule
      name: string
      rule: string
    }
  | {
      type: RulesetActionTypes.DeleteRule
      index: number
    }
  | {
      type: RulesetActionTypes.UpdateRule
      index: number
      name: string
      rule: string
    }

export interface Response {
  id: string
  sentence: SentenceData
  ruleset: RulesetData
  created_at: Date
  updated_at: Date
}

export const useWorkspace = (initialData: Response) => {
  const [ruleset, updateRuleset] = useReducer(
    (state: Ruleset, action: RulesetActions) => {
      switch (action.type) {
        case RulesetActionTypes.SetRuleset:
          return {
            pos: new Set(action.data.pos),
            roots: new Set(action.data.roots),
            rules: action.data.rules.map((r) => ({
              name: r.name,
              tags: r.tags
            }))
          }
        case RulesetActionTypes.AddPOS:
          state.pos.add(action.pos)
          return { ...state }
        case RulesetActionTypes.DeletePOS:
          state.pos.delete(action.pos)
          return { ...state }
        case RulesetActionTypes.AddRoot:
          state.roots.add(action.root)
          return { ...state }
        case RulesetActionTypes.DeleteRoot:
          state.roots.delete(action.root)
          return { ...state }
        case RulesetActionTypes.AddRule:
          return {
            ...state,
            rules: [
              ...state.rules,
              { name: action.name, tags: parseRuleTags(action.rule) }
            ]
          }
        case RulesetActionTypes.DeleteRule:
          state.rules.splice(action.index)
          return { ...state }
        case RulesetActionTypes.UpdateRule:
          state.rules[action.index] = {
            name: action.name,
            tags: parseRuleTags(action.rule)
          }
          return { ...state }
      }
    },
    {},
    () => ({
      pos: new Set(initialData.ruleset.pos),
      roots: new Set(initialData.ruleset.roots),
      rules: initialData.ruleset.rules.map((r) => ({
        name: r.name,
        tags: r.tags
      }))
    })
  )

  const [sentence, updateSentence] = useReducer(
    (state: Sentence, action: SentenceActions) => {
      switch (action.type) {
        case SentenceActionTypes.SetSentence:
          return {
            words: action.data.words.map((w) => ({
              text: w.text,
              pos: new Set(w.pos)
            }))
          }
        case SentenceActionTypes.UpdateSentenceText:
          return {
            words: action.text
              .split(' ')
              .filter((w) => w !== '')
              .map((word): Word => ({ text: word, pos: new Set() }))
          }
        case SentenceActionTypes.AddWordPOS:
          state.words[action.index].pos.add(action.pos)
          return { ...state }
        case SentenceActionTypes.DeleteWordPOS:
          state.words[action.index].pos.delete(action.pos)
          return { ...state }
      }
    },
    {},
    () => ({
      words: initialData.sentence.words.map((w) => ({
        text: w.text,
        pos: new Set(w.pos)
      }))
    })
  )

  return {
    data: {
      sentence,
      ruleset
    },
    updateSentence,
    updateRuleset
  }
}
