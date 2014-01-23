function draw(ids) {
  ls = ids.slice(1);
  idx = 0;
  setTitle(idx);

  var id = ls[0].id;
  V.height = "480px";
  swfobject.embedSWF(
      "http://www.youtube.com/v/"+id+"?enablejsapi=1&autoplay=1&playerapiid=player"
      , "V", "450", "320", "8", null, null
      , { allowScriptAccess: "always" }, { id: "player" }); 
}

function onYouTubePlayerReady() {
  P.style.display = "none";
  player.addEventListener('onStateChange', 'onStateChange');
  player.addEventListener('onError', 'onError');
}

function onStateChange(newState) { 
  if (newState == 0) next();
}
function onError(st) {
  next();
}

function load() {
  setTitle(idx);
  if (idx in ls) {
    player.loadVideoById(ls[idx].id);
  } else {
    ytExit();
  }
}

function setTitle() {
  if (idx in ls)
    W.innerHTML = "<a onclick='showMenu()'>Now playing: " + ls[idx].name + "</a>";
  else
    W.innerHTML = "push ``play''";
}

function showMenu() {
  if (!(idx in ls)) return;
  var tori = "<img src='../img/tw.png' height='14px' width='14px' onclick='tw()'>"
    , prev = "<a onclick='prev()'>≪prev</a>"
    , next = "<a onclick='next()'>next≫</a>"
    , cancel = "<a onclick='setTitle()'>cancel</a>"
    , exit = "<a onclick='ytExit()' style='margin-left:32%'>exit</a>";
  W.innerHTML = prev + ' ' + next + ' ' + tori + ' ' + cancel + ' ' + exit;;
}

function prev() { --idx; if (idx < 0) idx = ls.length-1;  load() }
function next() { ++idx; if (idx >= ls.length) idx = 0; load() }

function tw() {
  if (!(idx in ls)) return;
  var id = ls[idx].id
    , name = encodeURIComponent( ls[idx].name );
  var url = "https://twitter.com/intent/tweet?url=http://youtu.be/" + id +
      "&text=" + name + ":&via=youtube";
  open(url);
  setTitle();
}

function ytExit() {
  idx = -1;
  setTitle();
  D.removeChild(player);
  var v = document.createElement("div");
  v.id = "V";
  v.width = "640px";
  v.height = "0px";
  D.appendChild(v);
  P.style.display = "block";
}

