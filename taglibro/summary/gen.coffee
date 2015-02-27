fs = require 'fs'
{log, warn} = console

# num of lines of one page
N = 7

load = (filename) ->
  fs.readFileSync filename, 'utf8'
    .split '\n'
    .slice 0, -1

images = load process.argv[2]
newest = load process.argv[3]
random = load process.argv[4]

n = images.length / 2 | 0
m = images.length - n

newest = newest[0 .. n]
random = random[0 .. m]

head = (filename, n) ->
  console.warn filename
  fs.readFileSync filename, 'utf8'
    .split '\n'
    .slice 0, n
    .filter ((x) -> not not x)
    .filter ((x) -> x isnt '===')
    .filter ((x) -> x[0..3] isnt '```')
    .join ''

print = (image, page) ->
  log "<div class=page>"
  log "<a href=#{page}.html>"
  log "<img class=lgtm src=#{image}>"
  log head page, N
  log "</a>"
  log "</div>"

# main
log "<div class=minititle>#{n} recents</div>"
print images[i], newest[i] for i in [0 ... n]

log "<div class=minititle>#{m} randoms</div>"
print images[i+n], random[i] for i in [0 ... m]
