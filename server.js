/*
 * Copyright 2026 Adam Bishop Comer
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

import compression from 'compression'
import express from 'express'

const BUILD_PATH = './dist/server/index.js'
const DEVELOPMENT = process.env.NODE_ENV === 'development'
const PORT = Number.parseInt(process.env.PORT || '3000')

const app = express()

app.use(compression())
app.disable('x-powered-by')

if (DEVELOPMENT) {
  const viteDevServer = await import('vite').then((vite) =>
    vite.createServer({ server: { middlewareMode: true } })
  )
  app.use(viteDevServer.middlewares)
  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule('./server/app.ts')
      return await source.app(req, res, next)
    } catch (error) {
      if (error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error)
      }
      next(error)
    }
  })
} else {
  // Asset filenames are content-hashed, so they can be cached aggressively.
  app.use('/assets', express.static('dist/client/assets', { maxAge: '14400s', immutable: true }))
  app.use(express.static('dist/client', { maxAge: '1h' }))
  app.use(await import(BUILD_PATH).then((mod) => mod.app))
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
