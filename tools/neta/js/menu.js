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

(function NGRAM_THIS() {
  var LI = document.createElement('li');
  var IN = document.createElement('input');
  IN.type = 'text';
  IN.onkeyup = function() {
    var text = IN.value;
    if (text.length > 0) {
      text = text.replace(/　/g, ' ');
      text = text.replace(/  /g, ' ');
      text = text.replace(/  /g, ' ');
      ngram_filter(text.split(' '));
    } else {
      clear_filter();
    }
  }
  random_select = function() {
    var idx = Math.random() * images.length | 0;
    image_select(idx);
    freeze();
  };
  LI.innerHTML = '<b>FILTER</b>';
  LI.appendChild(IN);
  OL.appendChild(LI);
}());

(function HELP_THIS() {
  var LI = document.createElement('li');
  LI.innerHTML = '<a href="./help.html">HELP</a>';
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
  images[idx].elem = LI;
});

L.appendChild(OL);

