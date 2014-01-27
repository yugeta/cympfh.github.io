#!/usr/local/bin/node
// vim: set ft=javascript:

var exec = require('child_process').exec

if (process.argv.length < 4) {
  console.log('usage$ ./% plsFileName IDorURL')
  process.exit(0);
}

var path = process.argv[2];

var id = process.argv[3];
id = id.slice(id.indexOf('v=') + 2);

exec('curl http://www.youtube.com/watch?v=' + id, function(err, stdout, stderr) {
  var idx = stdout.indexOf('<title>') + '<title>'.length
    , idy = stdout.indexOf('</title>');
  var title = stdout.slice(idx, idy);
  title = title.replace(' - YouTube', '');
  console.log(id, title);

  var ln = id + ' ' + title;

  console.log('cp '+path+' /tmp/ && echo "' + ln + '" >> ' + path);
  exec('cp '+path+' /tmp/ && echo "' + ln + '" >> ' + path, function(err) {
    if (err) console.dir(err);
  });
});
