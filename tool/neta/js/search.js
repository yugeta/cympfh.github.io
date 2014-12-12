(function () {

  var ls = location.search;

  if (ls.length === 0) return;
  if (ls[0] !== '?') return;

  var w = decodeURIComponent(ls.slice(1));
  filter_by(w);

}());
