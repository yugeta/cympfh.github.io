var map = ["4567", "RTYU", "FGHJ", "VBNM"];

function play(ctx) {
  var full_pt = 900000 / count(scores)
    , display_dt = 10
    ;

  if (player && 'playVideo' in player) {
    player.playVideo();
    player.seekTo(0);
  }
  var ID = setInterval(loop, display_dt);

  function loop() {

    var time = player.getCurrentTime() * 1000; // [sec]
    var idx = Math.floor( time / dt );

    ctx.clearRect(0,0,500,500);

    if (idx > scores.length || mode !== 'edit') {
      clearInterval(ID);
      setTimeout(function() {
        init();
        player.stopVideo();
        player.clearVideo();
      }, 1000);
      return;
    }

    if (idx > 0 && time-idx*dt/display_dt < 5) {
      display(ctx, scores[idx-1], 1);
    }
    for (var i=0; i < 3; ++i) {
      var j = idx + i;
      if (!(j in scores)) break;
      var r = 1 - ( ((j+1) * dt - time) / 2 / dt )
      r = Math.max(0, Math.min(1, r));
      display(ctx, scores[j], r);
    }

    key_check();

    function key_check() {
      if (idx in scores) check(idx);
      if ((idx-1) in scores) check(idx-1);
      if ((idx+1) in scores) check(idx+1);
      D.innerHTML = ('000000'+(sum|0)).slice(-6) + ' pt';
    }
    function check(idx) {
      var arr = scores[idx];
      var r = 1 - ( ((idx+1) * dt - time) / 2 / dt )
      r = Math.max(0, Math.min(1, r));
      var dp = full_pt * r;

      for (var i=0;i<4;++i)
        for (var j=0;j<4;++j)
          if (arr[i][j] && staying_keys[map[i][j]]) {
            sum += dp;
            scores[idx][i][j] = 0;
          }
    }
  }

  function display(ctx, arr, r) {

    for (var i=0; i<4; ++i)
      for (var j=0; j<4; ++j)
        if (arr[i][j]) rect(i, j);

    function rect(i, j) {
      ctx.fillStyle = 'rgba(255,155,0,'+r+')';
      ctx.beginPath();
      var dy = 110 * (1 - r);
      ctx.rect(10+j*120, 10+i*120+dy, 110, 110 - dy);
      ctx.fill();
    }
  }

}

function count(a) {
  var s = 0;
  for (var i=0;i<a.length;++i)
    for (var j=0;j<4;++j) for (var k=0;k<4;++k) if (a[i][j][k]) ++s;
  return s; }

