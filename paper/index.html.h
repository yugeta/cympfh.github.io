<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="./paper.css">
<script src="./filter/datum.js"></script>
<script src="./filter/filter.js"></script>
<title>paper/</title>
</head>
<body>
<h1>paper/</h1>

<script>

function reset_display() {
  var sections = document.getElementsByTagName("section");
  for (var i=0; i<sections.length; ++i) {
    sections[i].style.display = 'block';
  }
}

function doFilter() {
  var q = document.getElementById("q").value;
  if (q === '') {
    reset_display();
    return false;
  }

  var result = filter(q, datum);

  document.getElementById('result_msg').innerHTML =
    (result.length === 0 ? "no result":
     (result.length + " papers hits"));

  if (result.length === 0) {
    reset_display();
    return false;
  }

  var sections = document.getElementsByTagName("section");
  for (var i=0; i<sections.length; ++i) {
    var cl = sections[i].id;
    if (result.indexOf(cl) !== -1) {
      sections[i].style.display = 'block';
    } else {
      sections[i].style.display = 'none';
    }
  }
  return false;
}
</script>

<div style="border: 1px #e0e0e0 solid; background-color: #f0f0f0;">
filter:
<input onkeyup="doFilter()" type="text" id="q" style="width:50%; border:0px solid white;">
<div id="result_msg" style="color:#803030"></div>
</div>
