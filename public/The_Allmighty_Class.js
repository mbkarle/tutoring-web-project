console.log("He Has Come")

function randomInt(min, max){
return(Math.floor(Math.random()*(max-min))+ min)
}
function radians(degrees){
  return Math.PI * degrees / 180
}
function toDeg(radians) {
  return radians * 180 / Math.PI;
}
function sign(num) {
  return num < 0 ? -1: 1;
}
function minMag(a, b) {
  return (Math.abs(a) <= Math.abs(b)) ? a : b;
}
function normalizeBearing(bearing) { //make angle in range [0, 360]
  let pos = (bearing < 0) ? 360 + bearing : bearing;
  return pos % 360;
}
function getDistance(coords1, coords2){
  var deltaX = coords1[0]-coords2[0]
  var deltaY = coords1[1]-coords2[1]
  return Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2))
}
var types = {
    "enemy":"enemy-ship.png",
    "player":"spaceship.png",
    "portal":"Portal.png",
      }
class Sprite{
  // AKA the Allmighty Class to rule all classes
  constructor(width, height, x, y, type, id){
    this.width = width
    this.height = height
    this.x = x
    this.y= y
    this.type = type
    this.rotation = 0
    this.rotationSpeed = 5;
    this.speedMultiplier = 1;
    this.speed = 5
    if(id){
    this.element = document.getElementById(id)
    }
    else{
      this.element = this.initElement()
    }
    this.draw()
  }




  initElement(){
  var element = document.createElement("div")
  element.classList.add("sprite")
  var prefix = (types[this.type])? '<img src="images/'+types[this.type]+'"':"<div class='"+this.type+"' "
  var suffix = (types[this.type])? '/>': '></div>'
  element.innerHTML = (prefix +' style="width:'+ this.width+ 'px; height:'+ this.height +'px;"'+ suffix)
  document.getElementById("gameMap").append(element)
  return element
  }

  draw(){
  var move = "translate(" + this.x + "px, " + this.y + "px)"
  if(this.rotation){
  move += "rotate("+this.rotation +"deg)"

  }
   this.element.style.transform = move}


   delete(){
     this.element.remove()
   }

   getHitbox(){
     return{
       leftX:this.x,
       rightX:this.x + this.width,
       topY: this.y,
       bottomY: this.y + this.height
     }
   }


   setNewCoords(x, y){
     this.x = x
     this.y = y
   }

  move() {
    let theta = radians(this.rotation);
    let direction = [Math.sin(theta), Math.cos(theta)]
    this.x += Math.ceil(direction[0] * this.speed * this.speedMultiplier);
    this.y -= Math.ceil(direction[1] * this.speed * this.speedMultiplier);
  }


   isColliding(other){
     let myHb = this.getHitbox()
     let otherHb = other.getHitbox()
     return(myHb.leftX < otherHb.rightX && myHb.rightX > otherHb.leftX &&
     myHb.topY < otherHb.bottomY && myHb.bottomY > otherHb.topY)
   }

  getRelativePosition(offsetX, offsetY) {
    let theta = radians(this.rotation);
    let coords = [this.x, this.y]; //top left of sprite

    //add constant to move coords relative to center of sprite, the point of rotation
    coords[0] += this.width/2;
    coords[1] += this.height/2;

    //add trig multiples to maintain coords at "top left" corner as it rotates
    coords[0] += this.height/2 * Math.sin(theta) - Math.cos(theta) * this.width / 2;
    coords[1] += - this.height/2 * Math.cos(theta) - Math.sin(theta) * this.width / 2;

    //add input offset to adjust to chosen position relative to top left corner
    coords[0] += Math.sin(theta) * offsetY + Math.cos(theta) * offsetX;
    coords[1] += Math.sin(theta) * offsetX - Math.cos(theta) * offsetY;

    return coords;
  }

  hasChanged(old) {
    return !(old && old.x === this.x && old.y === this.y && old.rotation === this.rotation);
  }

}
