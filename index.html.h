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
  top: 45%;
  left: 40%;
}
#poster > a.aimg > img {
  margin-bottom: 15px;
  cursor: pointer;
}

#wrap {
  font-family: Consolas, 'Courier New', Courier, Monaco, monospace;
  font-size: 14px;
  line-height: 1.2;
  opacity: 0.0;
  transition-duration:1s;
}

#message {
  position: absolute;
  left: -100%;
  top: -100%;
  opacity: 0.0;
}
#fortune {
  position: absolute;
  left: -100%;
  top: -100%;
  opacity: 0.0;
}
#ls {
  position: absolute;
  left: -100%;
  top: -100%;
  opacity: 0.0;
}

</style>
<body>

<div id='poster'>
  <img alt='icon' src='./img/identicon.png' height='96px' ondblclick='show()'>
  &nbsp;
  <a class='aimg' href='http://twitter.com/cympfh'><img alt='twitter' src='./img/Twitter_logo_blue.png' height='60px'></a>
  <a class='aimg' href='https://github.com/cympfh'><img alt='github' src='./img/GitHub-Mark-120px-plus.png' height='60px'></a>
</div>

<div id='wrap'>
<div id='message'>also visit my gist,
  <a href=https://gist.github.com/cympfh>https://gist.github.com/cympfh</a>
</div>
