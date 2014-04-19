var sleep = 200;
var dt = 600;
var scores;

function txt2scores(str) {
  var ret = [];

  var ls =
    str.replace(/\r/g, '')
       .split('\n')
       .filter(function(l){ return l!=='' && l[0]!=='#' })

  for (var i=0; i<=ls.length-4; i+=4) {
    ret.push(
      [
        con(ls[i])
      , con(ls[i+1])
      , con(ls[i+2])
      , con(ls[i+3])
      ]
    );
  }
  return ret;

  //where
  function con(s) { return s.split('').map(function(c){return c==='o'?1:0}) }
}
