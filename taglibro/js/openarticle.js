function save (flg) {
  if (localStorage) {
    localStorage.setItem('check_iframe', flg ? 1 : 0);
  }
}
function restore(id) {
  if (localStorage && localStorage.getItem('check_iframe')) {
    var n = +localStorage.getItem('check_iframe');
    document.getElementById(id).checked = (n == 1);
  }
}

var check_id = 'check_if_iframe';

function main () {

  // restore setting
  restore(check_id);

  // update all links
  var ls = document.links;
  for (var i=0; i<ls.length; ++i) {
    var lk = ls[i];
    lk.onclick = (function(url) {
      return function () {
        var flg = document.getElementById(check_id).checked;
        save(flg);
        if (! flg) { // open ordinary
          return true;
        }
        var fr = document.createElement('iframe');
        fr.src = url;
        article.innerHTML = '';
        article.style.display = 'block';
        article.appendChild(fr);
        return false;
      };
    }(lk.href));
  }

  document.getElementById("check_wrap").onclick = function () {
    check_if_iframe.checked =! check_if_iframe.checked
    save();
  };

}
