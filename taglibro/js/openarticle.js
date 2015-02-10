function opener_initial() {

  var restore_hober = false;

  // update all links
  var ls = document.links;
  for (var i = 0; i < ls.length; ++i) {
    var lk = ls[i];
    lk.onclick = (function(url, lk) {
      return function () {
        fr.src = url;

        (function (lk) {
          var hoberClassName = 'article hober';
          var origin = lk.className;
          if (origin === hoberClassName) return;

          if (restore_hober) restore_hober();
          lk.className = hoberClassName;

          restore_hober = function () {
            lk.className = origin;
          };
        }(lk));

        return false;
      };
    }(lk.href, lk));
  }

}
