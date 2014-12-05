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
  for (k = 2; k <= 5; ++k) {
    for (i = 0; i < query.length - k; ++i) {
      word = query.slice(i, i + k);
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

  if (scores.length === 0) {
    return [];
  }

  var sup = maximum(scores);
  var ret = [];
  var id;
  for (id in scores) {
    if (scores[id] > sup * 0.03) {
      ret.push(id);
      console.log('push', id, scores[id]);
    }
    else {
      console.log('sute', id, scores[id]);
    }
  }

  return ret;
}

