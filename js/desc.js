/*
 * for /tools/index.html
 */

function addDesc(id, msg) {
  msg = msg.replace(/\n/g, "<br>");

  var Z = document.createElement("div");
  Z.className = "desc";
  Z.innerHTML = msg;
  close();

  var X = document.getElementById(id);
  X.parentNode.insertBefore(Z, X.nextSibling);
  X.onmouseover = open;
  X.onmouseout = close;

  function open() {
    Z.style.display = "block";
  }
  function close() {
    Z.style.display = "none";
  }
}

