function gram(n, t) {
  var ret = [];
  var i;
  for (i = 0; i <= t.length - n; ++i) {
    ret.push(t.slice(i, i + n));
  }
  return ret;
}

function display(lst) {

  var OL = document.createElement('ol');

  if (lst.length === 0) {
    var LI = document.createElement('li');
    LI.innerHTML = "Nothing";
    OL.appendChild(LI);
  } else {
    lst.forEach(function (item) {
      var LI = document.createElement('li');
      var xs = item.title.split('_');
      if (xs.length !== 3) {
        return;
      }
      var fname = xs[0] + '/' + xs[1] + '/' + xs[2];
      // LI.innerHTML = "<a href='" + fname + ".md.html'>" + fname + ' (' + (item.cx*100 | 0) + ")</a>";
      LI.innerHTML = "<a href='" + fname + ".md.html'>" + fname + '</a>';
      OL.appendChild(LI);
    });
  }
  filtered.innerHTML = '';
  filtered.appendChild(OL);
  opener_initial();
}

function filter() {

  var text = q.value.toLowerCase();
  var a;

  if (text === '') {
    filtered.innerHTML = '';
    return;
  }

  var cx;
  var standing = [];
  for (a in datum) {
    cx = 0;
    datum[a].forEach(function (x) {
      for (var n = 2; n <= 4; ++n) {
        gram(n, text).forEach(function (y) {
          if (x === y) {
            cx += Math.pow(n, 1.55);
          }
        });
      }
    });
    cx = cx / datum[a].length;
    standing.push({ title: a, cx: cx });
  }
  standing.sort(function (a, b) {
    return b.cx - a.cx;
  });

  var result = standing;
  result = result.filter(function (x) {return x.cx > 0.04; });
  //result = result.slice(0, 10);
  display(result);

  return false;
}

(function () {

  var baby = true;
  q.value = 'filter';
  q.style.color = '#c0c0c0';
  q.onfocus = function () {
    if (baby) {
      q.value = '';
      baby = false;
    }
    q.style.color = 'black';
  };
  q.onblur = function () {
    q.style.color = '#c0c0c0';
  };
  q.onkeydown = function (e) {
    var kc = e.keyCode;
    if (kc === 10 || kc === 13) {
      filtered.innerHTML = 'processing...';
      setTimeout(filter,100);
    }
  };

}());
