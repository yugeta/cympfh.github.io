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

// viewing sources
var viewing = {
  main: 1,
  prev: 0,
  next: 2
}

// display the idx-th image on `R`
function image_select(idx) {


  img_window.main.src =
    img_window.text.value =
    resolve(images[idx].src);

  // previous
  var jdx = idx - 1;
  while (true) {
    if (jdx < 0) jdx = images.length - 1;
    if (images[jdx].filtered) break;
    jdx--;
  }
  img_window.prev.src = resolve(images[jdx].src);

  // next
  var kdx = idx + 1;
  while (true) {
    if (kdx >= images.length) kdx = 0;
    if (images[kdx].filtered) break;
    kdx++;
  }
  img_window.next.src = resolve(images[kdx].src);

  viewing.main = idx;
  viewing.prev = jdx;
  viewing.next = kdx;
};

