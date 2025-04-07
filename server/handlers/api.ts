import { Router } from 'express'
import { router as workspace } from './workspace.js'

export const router = Router()

router.use('/workspaces', workspace)
