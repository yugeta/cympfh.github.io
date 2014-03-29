
// textarea に プレイリストファイル name の中身を出力
function load_pls(textarea, name) {
  var con = new XMLHttpRequest();
  con.open('GET', "pls/" + name, false);
  con.send(null);
  proc(con.responseText);

  function proc(responseText) {
    textarea.value =
      responseText.split('\n')
                  .filter(function(l){return !!l && l[0] !== '#'})
                  .reverse()
                  .join('\n');
  }
}

// pls/index.js からプレイリストの一覧を取得、一つ目のプレイリストを load_pls する
function init_pls(textarea, select) {

  var con = new XMLHttpRequest();
  con.open('GET', "pls/index.js", false);
  con.send(null);
  proc(con.responseText);

  //con.onreadystatechange = function() {
  //  if (con.readyState === 4 && con.status === 200) {
  //  }
  //}
 
  // responseText -> IO ()
  function proc(responseText) {
    list_of_playlist =
      responseText.split('\n').filter(function(l){return !!l});

    // HTML form
    var last_group_name = "*"
      , optgroup = document.createElement('optgroup')
      ;
    for (var i=0; i < list_of_playlist.length; ++i) {
      var filename = list_of_playlist[i];
      var option = document.createElement('option');

      var head, tail;
      var xs = filename.split('/');
      if (xs.length == 1) {
        head = "*";
        tail = xs[0];
      } else {
        head = xs[0];
        tail = xs[1];
      }
      option.value = filename;
      option.innerHTML = tail;

      if (last_group_name == head) {
        optgroup.appendChild(option);
        optgroup.label = head;
      } else {
        select.appendChild(optgroup);
        optgroup = document.createElement('optgroup');
        optgroup.appendChild(option);
        optgroup.label = head;
      }
      last_group_name = head;
    }
    select.appendChild(optgroup);
    load_pls(textarea, list_of_playlist[0]);
  }

}
