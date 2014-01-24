function load_pls(textarea, name) {
  var con = new XMLHttpRequest();
  con.open('GET', "pls/" + name + ".pls", true);
  con.onreadystatechange = function() {
    if (con.readyState === 4 && con.status === 200) {
      textarea.value = con.responseText;
    }
  }
  con.send(null);
}

function init_pls(textarea, select) {
  var list_of_playlist = [
      "myfav"
    , "imas"
    , "anime2010"
    , "anime2011"
    , "anime2012"
    , "anime2013"
    , "animeRemix"
    , "nonowa"
    ];

  for (var i=0; i < list_of_playlist.length; ++i) {
    var n = list_of_playlist[i];
    var opt = document.createElement('option');
    opt.value = n;
    opt.innerHTML = n;
    select.appendChild(opt);
  }

  load_pls(textarea, list_of_playlist[0]);

}
