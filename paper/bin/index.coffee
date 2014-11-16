db = require '../index.json'
fs = require 'fs'

###
#
# 1. each has to contain "title" and "id"
# 1. memo may be memo/id.html
# 1. memo may be memo/id.txt
# 1. bibtex may be bibtex/id.txt
#
###

# assertion
#
if not (db.every ((pp) -> pp.title? and pp.id?))
  db.forEach (pp) ->
    if not pp.id?
      console.warn "#{JSON.stringify pp}\nnot contain id"
    if not pp.title?
      console.warn "#{JSON.stringify pp}\nnot contain title"
  process.exit 1

shorten = (str) ->
  N = 60
  M = N / 2 | 0
  if str.length > N
    str.slice(0, M) + '...' + str.slice (M - N)
  else
    str

has_bibtex = (id) ->
  fn = "./bibtex/#{id}.txt"
  if fs.existsSync fn then fn else false

has_memo = (id) ->
  fn1 = "./memo/#{id}.html"
  fn2 = "./memo/#{id}.md"
  #fn3 = "./memo/#{id}.pdf"
  switch
    when fs.existsSync fn1 then fn1
    when fs.existsSync fn2 then fn2
    #when fs.existsSync fn3 then fn3
    else false

# output
#
print = console.log
db.forEach (pp) ->
  print "<section id=\"#{pp.id}\">"
  print "<div class=\"title\">#{pp.title}</div>"
  print "<div class=\"url\"><a href=\"#{pp.url}\">#{shorten pp.url}</a></div>" if pp.url?

  bibtex = has_bibtex pp.id
  memo = has_memo pp.id

  if bibtex or memo
    print "<div class=\"read\">"

    print "<div class=\"bibtex\"><a href=\"#{bibtex}\">bibtex</a></div>" if bibtex
    print "<div class=\"memo\"><a href=\"#{memo}\">memo</a></div>" if memo
    print "</div>"

  else
    print "<div class=\"unread\"></div>"

  if pp.comment
    print "<div class=\"comment\">#{pp.comment}</div>"

  print "</section>"
