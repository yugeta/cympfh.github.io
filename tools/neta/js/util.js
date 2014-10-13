DEBUG = true;
function debug() {
  if (DEBUG && console && console.log) {
    console.log.apply(null, arguments);
  }
}
