{log, warn} = console
fs = require 'fs'

ls = fs.readFileSync '/dev/stdin', 'utf8'
  .split '\n'
  .slice 0, -1
  .map (l) -> l.replace /\..*$/g, ''

month = (date) ->
  a = (date .split '/')[1] | 0
  p = a % 2
  switch p
    when 0 then "even"
    when 1 then "odd"
    else "else"

ls.forEach (date) ->
  log "<a class=\"#{month date}\" href=#{date}.md.html>#{date}</a>"

