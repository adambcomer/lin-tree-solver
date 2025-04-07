import { Router } from 'express'
import { db } from '../../repo/database.js'
import {
  createWorkspace,
  getWorkspace,
  RuleSet,
  Sentence,
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

router.put('/:id', async (req, res) => {
  const ruleset = req.body.ruleset
  if (!!RuleSet.verify(ruleset)) {
    res.send(422)
    return
  }

  const sentence = req.body.sentence
  if (!!Sentence.verify(sentence)) {
    res.send(422)
    return
  }

  await updateWorkspace(db, req.params.id, ruleset, sentence)

  res.status(200).send()
})
