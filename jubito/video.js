var id = "EK0Z6PDBB-E"

function video_init() {
  swfobject.embedSWF(
      "http://www.youtube.com/v/"+id+"?enablejsapi=1&autoplay=0&playerapiid=player"
    , "video", "490", "490", "8", null, null
    , { allowScriptAccess: "always" }, { id: "player" }); 
}

function onYouTubePlayerReady(playerId) {
  document.title = playerId;
}
