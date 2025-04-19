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

import { Request, Router } from 'express'
import { db } from '../../repo/database.js'
import {
  createWorkspace,
  getWorkspace,
  isRuleSet,
  isSentence,
  updateWorkspace
} from '../../repo/workspace.js'
import { randomUUID } from 'node:crypto'

export const router = Router()

router.post('/', async (_, res) => {
  const id = randomUUID()

  await createWorkspace(db, id)

  res.send({ id })
})

router.get('/:id', async (req, res) => {
  const workspace = await getWorkspace(db, req.params.id)
  if (!workspace) {
    res.send(404)
    return
  }

  res.send(workspace)
})

type WorkspacePutReqest = Request<
  { id: string },
  unknown,
  { ruleset: unknown; sentence: unknown }
>

router.put('/:id', async (req: WorkspacePutReqest, res) => {
  const ruleset: unknown = req.body.ruleset
  if (!isRuleSet(ruleset)) {
    res.send(422)
    return
  }

  const sentence: unknown = req.body.sentence
  if (!isSentence(sentence)) {
    res.send(422)
    return
  }

  await updateWorkspace(db, req.params.id, ruleset, sentence)

  res.status(200).send()
})
