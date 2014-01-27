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
}

function init_pls(textarea, select) {

  var con = new XMLHttpRequest();
  con.open('GET', "pls/index.js", true);
  con.onreadystatechange = function() {
    if (con.readyState === 4 && con.status === 200) {
      list_of_playlist = con.responseText.split('\n').filter(function(l){return !!l})

      console.log(list_of_playlist);

      for (var i=0; i < list_of_playlist.length; ++i) {
        var n = list_of_playlist[i];
        var opt = document.createElement('option');
        opt.value = n;
        opt.innerHTML = n;
        select.appendChild(opt);
      }

      load_pls(textarea, list_of_playlist[0]);
    }
  }
  con.send(null);


}
