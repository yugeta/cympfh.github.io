// pls/*.pls
var pls_list = [
  "myfav"
, "imas"
, "anime2010"
, "anime2011"
, "anime2012"
, "anime2013"
, "animeRemix"
];
function load_pls(textarea, idx) {
  var con = new XMLHttpRequest();
  con.open('GET', "pls/" + pls_list[idx] + ".pls", true);
  con.onreadystatechange = function() {
    if (con.readyState === 4 && con.status === 200) {
      textarea.value = con.responseText;
    }
  }
  con.send(null);
}
