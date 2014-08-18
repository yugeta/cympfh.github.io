<title>taglibro</title>
<script src='./js/openarticle.js'></script>
<style>
  a {
    display: block;
    padding: 0;
    margin: 0;
    color: black;
    text-decoration: none;
  }

  /* menu for each articles */
  div.dates {
    font-size: 0.8em;
    width: 30%;
    float: left;
  }
  a.black {
    width: 25%;
    float: left;
    color: #f0f0f0;
    background-color: #404040;
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: 1px #808080 dashed;
  }
  a.red {
    width: 25%;
    float: left;
    color: #404040;
    background-color: #f0f0f0;
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: 1px #808080 dashed;
  }
  a.black:visited { color: #ffd0d0; }
  a.red:visited { color: #773030; }

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
</style>
<body onload='main()'>
<div class='article' id='article'></div>
<div class='dates'>
<div style='position:fixed;background-color: rgba(255,255,255,0.5);'><input type='checkbox' id='check_if_iframe'>view on iframe</div><br>
<a class=red href=summary/>summary</a>
