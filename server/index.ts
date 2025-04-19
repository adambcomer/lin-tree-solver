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

import express from 'express'
import compression from 'compression'
import { apply } from 'vike-server/express'
import { serve } from 'vike-server/express/serve'
import { router as api } from './handlers/api.js'
import { initDB } from '../repo/database.js'

initDB().catch(console.error)

const app = express()

app.use(express.json())
app.use(compression())

app.use('/api', api)

if (import.meta.env.PROD) {
  app.use((req, res, next) => {
    next()
    if (req.path.startsWith('/assets')) {
      res.set('Cache-Control', 'public,max-age=14400')
    }
  })
}

apply(app, { compress: false })
serve(app, { port: 3000 })
