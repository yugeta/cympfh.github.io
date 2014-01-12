var id = "EK0Z6PDBB-E"

function video_init() {
  swfobject.embedSWF(
      "http://www.youtube.com/v/"+id+"?enablejsapi=1&autoplay=1&playerapiid=player&wmode=transparent"
    , "video", "491", "490", "8", null, null
    , { allowScriptAccess: "always" }, { id: "player" }); 
}

function onYouTubePlayerReady(playerId) {
  player.cueVideoByUrl('http://www.youtube.com/v/' + id, 0);
}

/*
setTimeout(function() {
  player.style.position = 'absolute';
  player.style.left = '10px';
  player.style.top = '30px';
  player.style.zIndex = -10;

  var par = document.createElement('param');
  par.name = 'wmode';
  par.value = 'transparent';
  player.appendChild(par);
  player.setAttribute('wmode', 'transparent');

}, 3000);
*/
