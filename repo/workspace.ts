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

import sqlite3 from 'sqlite3'
import { Sentence, RuleSet } from './proto/bundle.js'
import { DEFAULT_SENTENCE } from './data/sentence.js'
import { DEFAULT_RULESET } from './data/ruleset.js'

export { Sentence, RuleSet } from './proto/bundle.js'

export const isSentence = (value: unknown): value is Sentence =>
  !!value && !Sentence.verify(value)

export const isRuleSet = (value: unknown): value is RuleSet =>
  !!value && !RuleSet.verify(value)

interface WorkspaceRow {
  id: string
  ruleset: Buffer
  sentence: Buffer
  created_at: string
  updated_at: string
}

interface Workspace {
  id: string
  ruleset: RuleSet
  sentence: Sentence
  createdAt: Date
  updatedAt: Date
}

export const createWorkspace = async (db: sqlite3.Database, id: string) => {
  const timestamp = new Date()

  const sentence = Sentence.encode(DEFAULT_SENTENCE).finish()
  const ruleSet = RuleSet.encode(DEFAULT_RULESET).finish()

  return new Promise<sqlite3.RunResult>((resolve, reject) =>
    db.run(
      'INSERT INTO workspaces (id, sentence, ruleset, created_at, updated_at) VALUES (?, ?, ?, ?, ?);',
      [id, sentence, ruleSet, timestamp.toISOString(), timestamp.toISOString()],
      function (this, err) {
        if (err) {
          reject(err)
          return
        }

        resolve(this)
      }
    )
  )
}

export const getWorkspace = async (db: sqlite3.Database, id: string) => {
  return new Promise<Workspace | void>((resolve, reject) => {
    db.get(
      'SELECT id, sentence, ruleset, created_at, updated_at FROM workspaces WHERE id = ?;',
      id,
      function (this, err, row: WorkspaceRow) {
        if (err) {
          reject(err)
          return
        }
        if (!row) {
          resolve()
          return
        }

        resolve({
          id: row.id,
          ruleset: RuleSet.decode(row.ruleset),
          sentence: Sentence.decode(row.sentence),
          createdAt: new Date(row.created_at),
          updatedAt: new Date(row.updated_at)
        })
      }
    )
  })
}

export const updateWorkspace = async (
  db: sqlite3.Database,
  id: string,
  ruleset: RuleSet,
  sentence: Sentence
) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE workspaces SET sentence = ?, ruleset = ?, updated_at = ? WHERE id = ?;',
      [
        Sentence.encode(sentence).finish(),
        RuleSet.encode(ruleset).finish(),
        new Date().toISOString(),
        id
      ],
      function (this, err) {
        if (err) {
          reject(err)
          return
        }

        resolve(this)
      }
    )
  })
}
