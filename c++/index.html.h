<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>c++</title>
<script src='../taglibro/js/openarticle.js'></script>
<style>
a {
  color: #402020;
}
/* preview window */
div#article {
  float: right;
  display: none;
  width: 66%;
}
iframe {
  padding: 0;
  position: fixed;
  margin: 0;
  padding: 0;
  width: 62%;
  height: 96%; /* for scroll bar */
  border: 0;
  border-left: 1px black solid;
}
hr.shorthr {
  width: 30%;
  text-align: left;
  margin-left: 0;
}
</style>
</head>
<body onload='opener_initial()'>
  <div class='article' id='article'></div>
  <div class='dates'>
    <div id='check_iframe' style='cursor:link'></div>
    <hr class='shorthr'>
