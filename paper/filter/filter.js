function maximum(o) {
  var ac = -1;
  var i;
  for (i in o) {
    ac = Math.max(ac, o[i]);
  }
  return ac;
}

function filter(query, datum) {
  var k, i;
  var scores = {};
  var word, ls, j;

  var queries =
    query.trim().split(' ')
    .map(function (l) { return l.trim(); })
    .filter(function (l) { return !!l; });

  queries.forEach(function (q) {

    for (k = 2; k <= 5; ++k) {
      for (i = 0; i < q.length - k; ++i) {
        word = q.slice(i, i + k);
        ls = datum[word];
        if (ls) {
          for (j = 0; j < ls.length; ++j) {
            if (scores[ls[j]]) {
              scores[ls[j]]++;
            } else {
              scores[ls[j]] = 1;
            }
          }
        }
      }
    }

  });

  if (scores.length === 0) {
    return [];
  }

  var sup = maximum(scores);
  var threshold = sup * 0.10;
  console.dir({ sup: sup, threshold: threshold });
  var ret = [];
  var id;
  for (id in scores) {
    if (scores[id] > threshold) {
      ret.push(id);
      console.log('push', id, scores[id]);
    } else {
      console.log('sute', id, scores[id]);
    }
  }

  return ret;
}

if (!console) {
  console = {
    log: function () { return 0; },
    warn: function () { return 0; },
    dir: function () { return 0; }
  };
}


