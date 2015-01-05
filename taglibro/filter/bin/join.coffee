#!/usr/bin/env coffee

fs = require 'fs'

dict = {}

grams = (y, m, d) ->
  fname = "nouns/#{y}/#{m}/#{d}.txt"
  ls = fs.readFileSync fname, 'utf8'
  buf = ls.replace(/[\r\n\'\"]/g, '')
  buf = buf.toLowerCase()

  ret = []
  for k in [2 .. 3]
    for i in [0 .. buf.length - k]
      ret.push buf.slice(i, i + k)
  ret

lst = fs.readdirSync 'nouns'
lst.forEach (y) ->
  lst = fs.readdirSync "nouns/#{y}"
  lst.forEach (m) ->
    lst = fs.readdirSync "nouns/#{y}/#{m}"
    lst.forEach (d) ->
      d = d.slice 0, -4
      words = grams y, m, d
      for w in words
        if dict[w]?
          dict[w] .push "#{y}_#{m}_#{d}"
        else
          dict[w] = ["#{y}_#{m}_#{d}"]

#
# この時点で、dictをそのまま吐くと 9.1 MB 程度になる。
# ほとんどの word (n-gram) は不要であるという直感に基づいて
# どうにか削っていこう
#
# dict[w] は、 w を含む、ページの重複を許すリストである
# どうにかヒューリスティックにやってこう
#

famouns = [ '夢日記', 'ske', 'sch', 'che']
n =
  famouns.map((w) -> dict[w].length)
    .reduce((x, y) -> if x > y then x else y)
n = n * 2

for w of dict
  switch
    when '0' <= w[0] and w[0] <= '9'
      delete dict[w]
    when dict[w].length > n
      delete dict[w]

console.log '%j', dict
