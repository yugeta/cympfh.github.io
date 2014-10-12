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

  var ret = [];

  var thresh = 10;
  //qs.map(function(t){return t.length}).reduce(function(x,y){return x+y});

  var N = ngram.length;
  var weight = function (k) {
    return 1;
  };

  for (var l=0; l<N; ++l) { // l-th image
    var img = ngram[l];
    var score = 0;

    for (var i=0; i<qs.length; ++i) {

      // k-gram
      for (var k=1; k <= 4; ++k) {
        var grams = make_ngram(qs[i], k);
        var I = grams.length;
        for (var j=0; j < I; ++j) {
          if (img[grams[j]]) {
            d_score = img[grams[j]];
            score += d_score;
            debug(images[l].src, grams[j], '+=', d_score, ' // threshold = ', thresh);
          }
        }
      }

    }

    if (score >= thresh) {
      debug(images[l].src, 'thresh,score =', thresh, score);
      ret.push(l);
    }
  }

  if (console && console.log) {
    console.log("filter of ", qs, "=>", ret);
  }

  return ret;
}
