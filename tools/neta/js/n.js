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

  var cx = 0;

  // previous
  var jdx = idx - 1;
  while (true) {
    if (jdx < 0) jdx = images.length - 1;
    if (images[jdx].filtered) break;
    jdx--;
    if (cx++ > images.length * 2) break;
  }
  img_window.prev.src = resolve(images[jdx].src);

  cx = 0;

  // next
  var kdx = idx + 1;
  while (true) {
    if (kdx >= images.length) kdx = 0;
    if (images[kdx].filtered) break;
    kdx++;
    if (cx++ > images.length * 2) break;
  }
  img_window.next.src = resolve(images[kdx].src);

  viewing.main = idx;
  viewing.prev = jdx;
  viewing.next = kdx;
};

