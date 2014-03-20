<a href=http://is.gd/mC4zzr>on github.com</a>
<style>
  a {
    display: block;
    width: 9em;
    padding: 5px;
    margin: 0px;
    color: black;
  }
  a.black {
    color: #f0f0f0;
    background-color: #404040;
  }
  .black:visited {
    color: #ffd0d0;
  }
  a.red {
    color: #404040;
    background-color: #f0f0f0;
  }
  .red:visited {
    color: #773030;
  }
  .c { float: left; width: 9em; }
</style>
<script>
  function yearColor(str) {
    var y = +str.split('/')[0];
    return y%2 ? 'black' : 'red';
  }

  function coloring() {
    var ls = document.links;
    for (var i=1; i<ls.length; ++i) {
      ls[i].className = yearColor(ls[i].innerHTML);
    }
  }

</script>
<body onload="coloring()">
