/*
 * when freezing, mouseover never effect
 */
var freezing = false;
function freeze() {
  freezing = true;
  var time = 3000;
  setTimeout(function () { freezing = false; }, time);
}

