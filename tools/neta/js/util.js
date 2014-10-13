DEBUG = false;
function debug() {
  if (DEBUG && console && console.log) {
    console.log.apply(null, arguments);
  }
}
