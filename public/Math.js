
function randomInt(min, max) {
  return (Math.floor(Math.random() * (max - min)) + min)
}
function radians(degrees) {
  return Math.PI * degrees / 180
}
function toDeg(radians) {
  return radians * 180 / Math.PI;
}
function sign(num) {
  return num < 0 ? -1 : 1;
}
function minMag(a, b) {
  return (Math.abs(a) <= Math.abs(b)) ? a : b;
}
function normalizeBearing(bearing) { //make angle in range [0, 360]
  let pos = (bearing < 0) ? 360 + bearing : bearing;
  return pos % 360;
}
function getDistance(coords1, coords2) {
  var deltaX = coords1[0] - coords2[0]
  var deltaY = coords1[1] - coords2[1]
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
}
function removeFromArray(item, array) {
  var index = array.indexOf(item)
  return index == -1 ? false : array.splice(index, 1)
}
