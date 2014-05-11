function main () {
  var ls = document.links;
  for (var i=1; i<ls.length; ++i) {
    var lk = ls[i];
    lk.onclick = (function(url) {
      return function () {
        var fr = document.createElement('iframe');
        fr.src = url;
        article.innerHTML = '';
        article.style.display = 'block';
        article.appendChild(fr);
        return false;
      };
    }(lk.href));
  }
}
