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
  filtered.innerHTML = '';

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
      LI.innerHTML = "<a href='" + fname + ".md.html'>" + fname + "</a>";
      OL.appendChild(LI);
    });
  }
  filtered.appendChild(OL);
  opener_initial();
}

function filter(debug) {

  var query = q.value.toLowerCase();

  if (query === '') {
    filtered.innerHTML = '';
    return false;
  }

  var scores = {};
  for (var n = 2; n <= 3; ++n) {
    gram(n, query).forEach(function (word) {
      var lst = datum[word];
      if (!lst) return;
      lst.forEach(function (id) {
        if (scores[id]) ++scores[id];
        else scores[id] = 1;
      });
    });
  }

  var result = (function () {
    var mx = -1;
    for (var id in scores) {
      mx = Math.max(mx, scores[id]);
    }
    if (debug) console.log("scores = ", scores);
    //var thresh = mx / 10;
    var thresh = Math.sqrt(mx);
    if (debug) console.log("thresh = ", thresh);


    var lst = [];
    for (var id in scores) {
      if (scores[id] > thresh) {
        lst.push(id);
        if (debug) console.log("id, scores[id] = ", id, scores[id]);
      }
    }
    return lst;
  }());

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
  q.onkeyup = function (e) {
    filter();
  };

}());
