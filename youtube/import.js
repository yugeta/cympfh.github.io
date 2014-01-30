#!/usr/local/bin/node

var exec = require('child_process').exec

if (process.argv.length < 4) {
  console.log('usage$ ./% plsFileName IDorURL')
  process.exit(0);
}

var path = process.argv[2];
var id = process.argv[3];

// full url?
if (id.indexOf('v=') > 0) id = id.slice(id.indexOf('v=') + 2);

// shorten?
if (id.indexOf('/') > 0) id = id.slice(id.lastIndexOf('/') + 1);

exec('curl -s http://www.youtube.com/watch?v=' + id, function(err, stdout, stderr) {

  var idx = stdout.indexOf('<title>') + '<title>'.length
    , idy = stdout.indexOf('</title>');

  var title = stdout.slice(idx, idy);
  title = title.replace(' - YouTube', '');

  var ln = id + ' ' + title;

  console.log(ln, ">>", path);
  exec('echo "' + ln + '" >> ' + path, function(err) {
    if (err) console.dir(err);
  });
});
