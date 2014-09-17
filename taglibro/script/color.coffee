{log, warn} = console
fs = require 'fs'

ls = fs.readFileSync '/dev/stdin', 'utf8'
  .split '\n'
  .slice 0, -1
  .map (l) -> l.replace /\..*$/g, ''

month = (date) ->
  a = (date .split '/')[1] | 0
  p = a % 2
  switch
    when a is 1 then "article odd one"
    when a is 12 then "article even twelve"
    when p is 0 then "article even"
    when p is 1 then "article odd"
    else "else"

ls.forEach (date) ->
  log "<a class=\"#{month date}\" href=#{date}.md.html>#{date}</a>"

