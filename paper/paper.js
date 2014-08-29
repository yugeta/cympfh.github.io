var selected = [];

window.onload = function () {
  var _ps = document.getElementsByTagName('p');
  var ps = [];
  for (var i=0; i < _ps.length; ++i) { ps[i] = _ps[i]; }

  var D = document.createElement('div');
  D.style.position = 'fixed';
  D.style.right = 0;
  D.style.bottom = 0;
  D.style.borderLeft = '4px black solid';
  D.style.borderRight = '4px black solid';
  D.style.paddingLeft = '8px';
  D.style.paddingRight = '8px';
  D.style.opacity = '0.8';

  keywords.forEach(function(kw) {
    var K = document.createElement('div');
    K.innerHTML = ':' + kw;
    K.style.cursor = 'pointer';
    K.onmouseover = function() { this.style.color = 'red' };
    K.onmouseout = function() { this.style.color = 'black' };
    K.addEventListener('click', function(e) {
      search(kw);
    });
    K.style.fontSize = '12px';
    D.appendChild(K);
  });

  function search(kw) {
    kw = ':' + kw;
    ps.forEach(function(p) {
      if (p.innerHTML.indexOf(kw) >= 0) {
        p.className = 'active';
        console.log(p.innerHTML);
      } else {
        p.className = 'inactive';
      }
    });
  }

  document.body.appendChild(D);
};
