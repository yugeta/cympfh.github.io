index = require '../index.json'
fs = require 'fs'

ls = fs.readFileSync('/tmp/info', 'utf8').split '\n'

url = ls[0]
title = ls[1]
id = ls[2]
unread = ls[3] is 'unread'

trim = (str) ->
  str = str.trim()
  str.replace /"/g, ''

url = trim url
title = trim title
id = trim id

index.push
  url: url
  title: title
  id: id

require('fs').writeFileSync '/tmp/index.json', (JSON.stringify index)
