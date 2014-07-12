function show() {
  var P, W, X1, X2, X3;
  P = document.getElementById('poster');
  P.style.opacity = '0.0';
  P.style.top = '-100%';
  W = document.getElementById('wrap');
  W.style.opacity = '1.0';

  X1 = document.getElementById('message');
  X2 = document.getElementById('fortune');
  X3 = document.getElementById('ls');
  X1.style.opacity = '1.0';
  X2.style.opacity = '1.0';
  X3.style.opacity = '1.0';

  X1.style.left = '80%';
  X1.style.top = '60%';

  X2.style.left = '5%';
  X2.style.top = '10%';

  X3.style.left = '40%';
  X3.style.top = ' 50%';
  X3.style.width = '30%';

}
