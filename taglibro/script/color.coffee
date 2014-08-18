{log, warn} = console
fs = require 'fs'

ls = fs.readFileSync '/dev/stdin', 'utf8'
  .split '\n'
  .slice 0, -1
  .map (l) -> l.replace /\..*$/g, ''

year = (date) ->
  (date.split '/')[0] | 0

parity = (x) -> x % 2 is 0

state = "red"
prev = not parity year ls[0]

ls.forEach (date) ->
  p = parity year date
  if p isnt prev
    prev = p
    state = if state is "black" then "red" else "black"
  log "<a class=#{state} href=#{date}.md.html>#{date}</a>"

