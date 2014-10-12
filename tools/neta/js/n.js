// import from 'list.js'
var images = list.map(function(src) {
  return {
    src: src,
    filtered: true,
    elem: null
  };
});

var L = document.getElementById("left");
var R = document.getElementById("right");

// display the idx-th image on `R`
function image_select(idx) {

  img_window.main.src =
    img_window.text.value =
    resolve(images[idx].src);

  img_window.main.onclick = function() {
    if (console && console.log)
      console.log(img_window.main.src, '_blank');
    open(img_window.main.src, '_blank');
  };

  // previous
  var jdx = idx - 1;
  while (true) {
    if (jdx < 0) jdx = images.length - 1;
    if (images[jdx].filtered) break;
    jdx--;
  }
  img_window.prev.src = resolve(images[jdx].src);

  img_window.prev.onclick = function() {
    freezing = false;
    image_select(jdx);
  }

  // next
  var kdx = idx + 1;
  while (true) {
    if (kdx >= images.length) kdx = 0;
    if (images[kdx].filtered) break;
    kdx++;
  }
  img_window.next.src = resolve(images[kdx].src);

  img_window.next.onclick = function() {
    freezing = false;
    image_select(kdx);
  }

};

