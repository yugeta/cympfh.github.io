function ngram_filter(qs) {
  var xs = filter(qs);
  var N = images.length;
  for (var i=0; i<N; ++i) {
    if (xs.indexOf(i) !== -1) {
      images[i].elem.style.display = 'block';
    images[i].filtered = true;
    } else {
      images[i].elem.style.display = 'none';
    images[i].filtered = false;
    }
  };
}

function clear_filter() {
  var N = images.length;
  for (var i=0; i<N; ++i) {
    images[i].elem.style.display = 'block';
    images[i].filtered = true;
  };
}

function make_ngram(text, n) {
  I = text.length;
  var ret = [];
  for (var i=0; i<=I-n; ++i) {
    ret.push(text.slice(i, i+n));
  }
  return ret;
}

function filter(qs) {

  var weight = {
    '2': 2,
    '3': 3
  };
  var ret = [];

  var N = ngram.length;
  for (var l=0; l<N; ++l) { // l-th image
    var img = ngram[l];
    var score = 0;

    for (var i=0; i<qs.length; ++i) {
      for (var k=2; k <= 3; ++k) {
        var grams = make_ngram(qs[i], k);
        var I = grams.length;
        for (var j=0; j < I; ++j) {
          if (img[grams[j]]) score += img[grams[j]] * weight[k];
        }
      }
    }
    if (score > 1) {
      ret.push(l);
    }
  }
  if (console && console.log) {
    console.log("filter of ", qs, "=>", ret);
  }
  return ret;
}
