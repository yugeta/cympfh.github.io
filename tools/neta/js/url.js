function resolve(path) {

  if (path.indexOf('http') === 0) {
    return path;
  }

  var src = 'img/' + path;
  var dir = function (url) {
    var i = url.lastIndexOf('/')
    return url.slice(0, i+1);
  }
  var url = dir(location.href) + src;
  return url;
}
