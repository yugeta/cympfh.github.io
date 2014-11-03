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
  R.innerHTML = '';

  if (lst.length === 0) {
    var LI = document.createElement('li');
    LI.innerHTML = "Nothing";
    OL.appendChild(LI);
  } else {
    lst.forEach(function (item) {
      var LI = document.createElement('li');
      var xs = item.split('_');
      if (xs.length !== 3) {
        return;
      }
      var fname = xs[0] + '/' + xs[1] + '/' + xs[2];
      LI.innerHTML = "<a href='../" + fname + ".md.html'>" + fname + "</a>";
      OL.appendChild(LI);
    });
  }
  R.appendChild(OL);
}

function filter() {

  R.innerHTML = 'filtering';

  var t = q.value;
  var tris = gram(3, t);
  var bis = gram(2, t);
  var a;
  var article;

  var cx;
  var standing = [];
  for (a in datum) {
    cx = 0;
    article = datum[a];
    article.forEach(function (x) {
      tris.forEach(function (y) {
        if (x === y) {
          cx += 3;
        }
      });
      bis.forEach(function (y) {
        if (x === y) {
          cx += 1;
        }
      });
    });
    standing.push({ title: a, cx: cx });

  }
  standing.sort(function (a, b) {
    return b.cx - a.cx;
  });

  var result = standing;
  result = result.filter(function (x) {return x.cx > 0; });
  result = result.slice(0, 10);
  result = result.map(function (x) { return x.title; });
  display(result);

  return false;
}
