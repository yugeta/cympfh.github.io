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

  var ks = [];
  keywords.forEach(function(kw, i) {
    var K = document.createElement('div');
    K.innerHTML = ':' + kw;
    K.style.cursor = 'pointer';
    K.className = 'inactive';
    K.addEventListener('click', function(e) {
      search(kw);
      ks.forEach(function(k) {
        k.className = 'inactive';
      });
      K.className = 'active';
    });
    K.style.fontSize = '12px';
    D.appendChild(K);
    ks[i] = K;
  });

  function search(kw) {
    kw = ':' + kw;
    ps.forEach(function(p) {
      if (p.innerHTML.indexOf(kw) >= 0) {
        p.className = 'active';
        itsTitle(p).className = 'active';
      } else {
        p.className = 'inactive';
        itsTitle(p).className = 'inactive';
      }
    });
  }

  function itsTitle(node) {
    var tn = node.tagName;
    if (tn === 'h2' || tn === 'H2') return node;
    return itsTitle(node.previousSibling);
  }

  document.body.appendChild(D);
};
