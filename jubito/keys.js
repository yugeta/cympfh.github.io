
function kd(e) {
  e = e || window.event;

  if (mode === 'normal') {
    if (e.keyCode === 32) start();
  }
  else if (mode === 'edit') {
    var c = String.fromCharCode(e.keyCode);
    staying_keys[c] = true;
  }
}
function ku(e) {
  e = e || window.event;
  if (mode === 'edit') {
    var c = String.fromCharCode(e.keyCode);
    staying_keys[c] = false;
  }
}

function start() {
  sum = 0;
  mode = 'edit'

  play(ctx, div);
}
