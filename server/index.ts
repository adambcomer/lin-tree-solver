import express from 'express'
import { apply } from 'vike-server/express'
import { serve } from 'vike-server/express/serve'

const app = express()
apply(app)

serve(app, { port: 3000 })
