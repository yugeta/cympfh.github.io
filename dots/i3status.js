#!/usr/bin/env node

var exec = require('child_process').exec;

function text(str, col) {
  col = col || "#ffffff";
  return { full_text: ''+str, color: col };
}

function date() {
  var now = new Date()
    , y = now.getFullYear()
    , m = now.getMonth()+1
    , d = now.getDate()
    , w = now.getDay()
    , hr = now.getHours()
    , min = now.getMinutes()
    , sec = now.getSeconds()
    ;
  m = futa(m);
  d = futa(d);
  w = yobi(w);
  hr = futa(hr);
  min = futa(min);
  sec = futa(sec);

  return [y,m,d].join('/') + '(' + w + ') ' + [hr,min,sec].join(':')

  function yobi(w) {
    return ['Sun','Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat'][w];
  }
  function futa(x) { return x < 10 ? ('0'+x) : x }
}

battery = (function () {
  var result;
  return function () {
    if (result && Math.random() < .3) return result;
    exec('acpi', function(err, data) {
      data = data.match(/\d+%/)[0];
      data = parseInt(data, 10) / 20;
      data =
        [0,1,2,3,4]
          .map(function (i) {
            return (i < data) ? '#' : '/' })
          .join('');
      result = data;
    });
    return result;
  };
}());

coretemp = (function () {
  var result;
  return function () {
    if (result && Math.random() < .2) return result;
    exec('sensors | grep "Core 0" | cut -d "+" -f 2 | cut -c 1-4', function (err, data) {
      result = data.split('\n')[0] + '°C';
    });
    return result;
  };
}());

(function main() {

  console.log('{"version":1}');
  console.log('[');
  console.log('[],');

  function loop(interval) {
    var ls = [];

    ls = ls.concat(text(coretemp(), '#ff0000'));
    ls = ls.concat(text(battery(), '#ffff00'));
    ls = ls.concat(text(date(), '#ffffff'));

    console.log('%j,', ls);
    setTimeout(loop, interval, interval);
  }

  loop(1000);

}());
