var poster_state = 'hidden';

function show() {
  var P, C;
  P = document.getElementById('poster');
  C = document.getElementById('cont');

  // disappear P
  P.style.opacity = '0.0';
  P.style.top = '-100%';

  // display C
  C.style.opacity = '1.0';
  C.style.top = '25%';
  C.style.left = '35%';

  poster_state = 'display';
}

function nekome() {
  var P;
  if (poster_state === 'hidden') {
    P = document.getElementById('poster');
    P.innerHTML = '地獄へ堕ちろ<br>枚方圏内';
    P.className = 'hellfire';
  } else if (poster_state === 'display') {
    location.href = './resume.html';
  }
}

