express = require 'express'
app = express()
app.use express.static __dirname

app.listen 3030, ->
  console.warn "http://localhost:3030"

