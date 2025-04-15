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
