var checked = true;
function save() {
  if (localStorage) {
    localStorage.setItem('check_iframe', checked);
  }
}

function check(b) {
  var false_inner = "✗ view with new window";
  var true_inner = "✔ view on iframe";
  checked = b;
  document.getElementById('check_iframe').innerHTML = b ? true_inner : false_inner;
  save();
}

function restore() {
  if (localStorage) {
    if (localStorage.getItem('check_iframe')) {
      check(localStorage.getItem('check_iframe') === 'true');
    } else {
      check(true);
    }
  }
}

function toggle() {
  check(!checked);
}

function opener_initial() {

  // restore setting
  restore();

  var restore_hober = false;

  // update all links
  var ls = document.links;
  for (var i = 0; i < ls.length; ++i) {
    var lk = ls[i];
    lk.onclick = (function(url, lk) {
      return function () {
        save();
        if (! checked) {
          return true;
        }
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

  document.getElementById('check_iframe').onclick = function () {
    toggle();
  };

}
