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
    font-size: 1em;
    width: 30%;
    float: left;
  }
  div.black {
    width: 25%;
    float: left;
  }
  div.red {
    width: 25%;
    float: left;
  }
  div.black a {
    color: #f0f0f0;
    background-color: #404040;
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: 1px #808080 dashed;
  }
  div.red a {
    color: #404040;
    background-color: #f0f0f0;
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: 1px #808080 dashed;
  }
  div.black a:visited { color: #ffd0d0; }
  div.red a:visited { color: #773030; }

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
    width: 100%;
    height: 100%;
    border: 0;
    border-left: 1px black solid;
  }
</style>
<body onload='main()'>
<div class='article' id='article'></div>
<div class='dates'><a href=http://is.gd/mC4zzr>on github.com</a>
