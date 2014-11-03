#!/usr/bin/env coffee

fs = require 'fs'

dict = {}

grams = (y, m, d) ->
  fname = "nouns/#{y}/#{m}/#{d}.txt"
  ls = fs.readFileSync fname, 'utf8'
  buf = ls.replace(/[\r\n\'\"]/g, '')
  buf = buf.toLowerCase()
  ret = []
  for k in [2 .. 5]
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
      dict["#{y}_#{m}_#{d}"] = grams y, m, d

console.log '%j', dict
