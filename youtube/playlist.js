var list_of_playlist;

function load_pls(textarea, name) {
  var con = new XMLHttpRequest();
  con.open('GET', "pls/" + name, true);
  con.onreadystatechange = function() {
    if (con.readyState === 4 && con.status === 200) {
      textarea.value = con.responseText;
    }
  }
  con.send(null);

  log.innerHTML = 'http://cympfh.github.io/youtube/player.html?' + name + '<br>' + log0;
}

function init_pls(textarea, select, search) {

  var con = new XMLHttpRequest();
  con.open('GET', "pls/index.js", true);
  con.onreadystatechange = function() {
    if (con.readyState === 4 && con.status === 200) {
      list_of_playlist = con.responseText.split('\n').filter(function(l){return !!l})

      for (var i=0; i < list_of_playlist.length; ++i) {
        var n = list_of_playlist[i];
        var opt = document.createElement('option');
        opt.value = n;
        opt.innerHTML = n;
        select.appendChild(opt);
      }

      if (search === '') {
        load_pls(textarea, list_of_playlist[0]);
      } else {
        search = search.slice(1);
        if (list_of_playlist.indexOf(search) !== -1) {
          load_pls(textarea, search);
        } else {
          load_pls(textarea, list_of_playlist[0]);
        }
      }
    }
  }
  con.send(null);

}
