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

}
