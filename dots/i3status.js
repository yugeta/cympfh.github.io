#!/usr/bin/env node

var exec = require('child_process').exec
  , red = '#ff0000'
  , yellow = '#ffff00'
  , pink = '#f09090'
  , white = '#ffffff'
  , gray = '#404040'
  ;

function text(str, col) {
  col = col || white;
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
  var result
    , icons = "♩♪♫♬"
    ;
  var visualize = function (x) {
    x = Math.ceil(x / 20); // [1, 2, 3, 4, 5]
    if (x === 5) {
      return text("+。:.ﾟ٩(๑>◡<๑)۶:.｡+ﾟ", pink);
    } else if (x > 1) {
      return text(icons[x-1], yellow);
    } else {
      return text(icons[0], red);
    }
  };

  return function () {
    if (result && Math.random() < .7) return result;
    exec('acpi', function(er, ou) {
      if (er) return;
      var x = ou.match(/(\d+)%/)[1];
      result = visualize(x);
    });
    return result;
  };
}());

coretemp = (function () {
  var result;
  return function () {
    if (result && Math.random() < .7) return result;
    exec('sensors | grep "Core 0" | cut -d "+" -f 2 | cut -c 1-4', function (err, data) {
      result = data.split('\n')[0] + '°C';
    });
    return result;
  };
}());

tenki = (function () {
  var result
    , icons = {}
    , url = "http://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp" // may change
    ;

  icons.Clouds = '曇';
  // '☀☔☇'.split('')
  
  return function () {
    if (result && Math.random() < .990) return result;
    exec("curl \"" + url + "\" > /tmp/w.json", function (err) {
      if (err) return;
      var w = require('/tmp/w.json')
        , t = w.weather[0].main;
      if (t in icons) {
        result = icons[t];
      } else {
        result = t;
      }
    });
    return result;
  }
}());

(function main() {

  console.log('{"version":1}');
  console.log('[');
  console.log('[],');

  function loop(interval) {
    var ls = [];

    ls = ls.concat(text(tenki(), gray));
    ls = ls.concat(text(coretemp(), red));
    ls = ls.concat(battery());
    ls = ls.concat(text(date(), white));

    console.log('%j,', ls);
    setTimeout(loop, interval, interval);
  }

  loop(1000);

}());
