<title>taglibro</title>
<script src='./js/openarticle.js'></script>
<body onload='main()'>
<div id='article'></div>
<a href=http://is.gd/mC4zzr>on github.com</a>
<style>
  a {
    display: block;
    width: 8em;
    padding: 5px;
    margin: 0px;
    color: black;
    font-size: 1em;
    text-decoration: none;
  }

  /* menu for each articles */
  div {
    float: left;
    width: 8em;
  }
  div.black a {
    color: #f0f0f0;
    background-color: #404040;
  }
  div.black a:visited {
    color: #ffd0d0;
  }
  div.red a {
    color: #404040;
    background-color: #f0f0f0;
  }
  div.red a:visited {
    color: #773030;
  }

  /* preview window */
  div#article {
    float: right;
    display: none;
    width: 48em;
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
<body>
