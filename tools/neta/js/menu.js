/*
 * create images list menu on `L`
 */
var OL = document.createElement('ul');

(function RANDOM_IMAGE() {
  var LI = document.createElement('li');
  LI.innerHTML = '<b>RANDOM</b>';
  random_select = function() {
    var idx = Math.random() * images.length | 0;
    image_select(idx);
    freeze();
  };
  LI.addEventListener('mousedown', random_select);
  OL.appendChild(LI);
}());

(function HELP_THIS() {
  var LI = document.createElement('li');
  LI.innerHTML = '<b>HELP</b>';
  LI.addEventListener('mousedown', function() {
    HELP.style.opacity = 0.9;
  });
  OL.appendChild(LI);
}());

list.forEach(function(filename, idx) {
  var LI = document.createElement('li');
  LI.innerHTML = filename;
  var select_it = (function(idx) {
    return function() {
      if (freezing) return;
      image_select(idx);
    }
  }(idx));
  LI.addEventListener('mouseover', select_it);
  LI.addEventListener('mousedown', function() {
    freezing = false;
    select_it();
    freeze();
  });
  OL.appendChild(LI);
  images[idx].elem = OL;
});

L.appendChild(OL);

