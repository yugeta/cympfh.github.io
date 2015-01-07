<!-- vim: set ft=html: -->
<title>cympfh</title>
<link rel="stylesheet" type="text/css" href="css/b.css">
<script src='./js/poster.js'></script>

<style>
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
<img src='img/nekomezaka.gif' width='200px' style='position:absolute;top:0;right:0' onclick='location.href="./resume.html"'>

<div id='poster'>
  <img alt='icon' title='枚方&#x0A;cympfh&#x0A;ampeloss' src='./img/identicon.png' height='96px' onclick='show()'>
  &nbsp;
  <a class='aimg' href='http://twitter.com/cympfh'><img alt='twitter' src='./img/Twitter_logo_blue.png' height='60px'></a>
  <a class='aimg' href='https://github.com/cympfh'><img alt='github' src='./img/GitHub-Mark-120px-plus.png' height='60px'></a>
</div>

<div id='cont'>
