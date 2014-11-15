#!/usr/bin/env coffee

fs = require 'fs'

dict = {}

grams = (id) ->
  fname = "nouns/#{id}.txt"
  ls = fs.readFileSync fname, 'utf8'
  buf = ls.replace(/[\r\n\'\"]/g, '')
  buf = buf.toLowerCase()
  ret = []
  for k in [2 .. 5]
    for i in [0 .. buf.length - k]
      ret.push buf.slice(i, i + k)
  ret

lst = fs.readdirSync 'nouns'
lst.forEach (text) ->
  id = text.slice(0, -4)
  words = grams id
  for w in words
    if dict[w]?
      dict[w] .push id
    else
      dict[w] = [id]

console.log '%j', dict
