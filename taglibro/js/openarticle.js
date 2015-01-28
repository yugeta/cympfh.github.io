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

  // update all links
  var ls = document.links;
  for (var i = 0; i < ls.length; ++i) {
    var lk = ls[i];
    lk.onclick = (function(url) {
      return function () {
        save();
        if (! checked) {
          return true;
        }
        fr.src = url;
        //article.innerHTML = '';
        //article.style.display = 'block';
        //article.appendChild(fr);
        return false;
      };
    }(lk.href));
  }

  document.getElementById('check_iframe').onclick = function () {
    toggle();
  };

}
