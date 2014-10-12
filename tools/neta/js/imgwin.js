/*
 * image window
 */
var img_window = {};
img_window.main = document.createElement('img');
img_window.prev = document.createElement('img');
img_window.next = document.createElement('img');
img_window.main.className = 'imgwin'
img_window.prev.className = 'imgwin'
img_window.next.className = 'imgwin'

img_window.text = document.createElement('input');
img_window.text.type = 'text';
img_window.text.readOnly = true;
img_window.text.className = 'urltext';
img_window.text.addEventListener('click', function (e) {
  img_window.text.select();
});

var IW0 = document.createElement('div'); // Top
var IW1 = document.createElement('div'); // Middle
var IW2 = document.createElement('div'); // BottomLeft
var IW3 = document.createElement('div'); // BottomRight

IW0.className = 'iw0';
IW1.className = 'iw1';
IW2.className = 'iw2';
IW3.className = 'iw3';

R.appendChild(IW0);
R.appendChild(IW1);
R.appendChild(IW2);
R.appendChild(IW3);

IW0.appendChild(img_window.text);
IW1.appendChild(img_window.main);
IW2.appendChild(img_window.prev);
IW3.appendChild(img_window.next);

