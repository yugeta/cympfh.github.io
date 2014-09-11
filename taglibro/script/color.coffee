{log, warn} = console
fs = require 'fs'

ls = fs.readFileSync '/dev/stdin', 'utf8'
  .split '\n'
  .slice 0, -1
  .map (l) -> l.replace /\..*$/g, ''

month = (date) ->
  a = (date .split '/')[1] | 0
  switch a
    when 1 then "jan"
    when 2 then "feb"
    when 3 then "mar"
    when 4 then "apr"
    when 5 then "may"
    when 6 then "jun"
    when 7 then "jul"
    when 8 then "aug"
    when 9 then "sep"
    when 10 then "oct"
    when 11 then "nov"
    when 12 then "dec"
    else ""

ls.forEach (date) ->
  log "<a class=\"#{month date}\" href=#{date}.md.html>#{date}</a>"

