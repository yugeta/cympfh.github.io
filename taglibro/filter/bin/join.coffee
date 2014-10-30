#!/usr/bin/env coffee

fs = require 'fs'

dict = {}

tri = (y, m, d) ->
  fname = "nouns/#{y}/#{m}/#{d}.txt"
  ls = fs.readFileSync fname, 'utf8'
  buf = ls.replace(/[\r\n\'\"]/g, '')
  ret = []
  for i in [0 .. buf.length - 3]
    ret.push buf.slice(i, i+3)
  ret

lst = fs.readdirSync 'nouns'
lst.forEach (y) ->
  lst = fs.readdirSync "nouns/#{y}"
  lst.forEach (m) ->
    lst = fs.readdirSync "nouns/#{y}/#{m}"
    lst.forEach (d) ->
      d = d.slice 0, -4
      dict["#{y}_#{m}_#{d}"] = tri y, m, d

console.log '%j', dict
