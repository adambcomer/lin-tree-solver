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
