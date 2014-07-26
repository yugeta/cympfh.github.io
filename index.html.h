<!-- vim: set ft=html: -->
<title>cympfh.github.io</title>
<script src='./js/poster.js'></script>
<style>

body {
  background-image: url(./img/nekomezaka.gif);
  background-repeat: no-repeat;
  background-position: right 0;
  background-size: 200px;
  background-color: white;
}
a {
  color: #402020;
}

#poster {
  opacity: 1.0;
  position: absolute;
  transition-duration:1s;
  transition-timing-function: ease-out;
  top: 40%;
  left: 40%;
}
#poster > a.aimg > img {
  margin-bottom: 15px;
  cursor: pointer;
}

#cont {
  font-family: Consolas, 'Courier New', Courier, Monaco, monospace;
  font-size: 14px;
  line-height: 1.2;
  opacity: 0.0;
  transition-duration:1.5s;
  transition-property: opacity;
  position: absolute;
  left: -100%;
  top: -100%;
}

</style>
<body>

<div id='poster'>
  <img alt='icon' src='./img/identicon.png' height='96px' onclick='show()'>
  &nbsp;
  <a class='aimg' href='http://twitter.com/cympfh'><img alt='twitter' src='./img/Twitter_logo_blue.png' height='60px'></a>
  <a class='aimg' href='https://github.com/cympfh'><img alt='github' src='./img/GitHub-Mark-120px-plus.png' height='60px'></a>
</div>

<div id='cont'>
