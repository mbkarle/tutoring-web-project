console.log("He Has Come")

function randomInt(min, max){
return(Math.floor(Math.random()*(max-min))+ min)
}
function radians(degrees){
  return Math.PI * degrees / 180
}
var types = {
    "enemy":"enemy-ship.png",
    "player":"spaceship.png",
    "portal":"Portal.png",
    "laser":" "
      }
class Sprite{
  // AKA the Allmighty Class to rule all classes
  constructor(width, height, x, y, type, id){
    this.width = width
    this.height = height
    this.x = x
    this.y= y
    this.type = type


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
  element.innerHTML = ('<img src="images/'+ types[this.type]+
  '" style="width:'+ this.width+ 'px; height:'+ this.height +'px;" />')
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


   isColliding(other){
     let myHb = this.getHitbox()
     let otherHb = other.getHitbox()
     return(myHb.leftX < otherHb.rightX && myHb.rightX > otherHb.leftX &&
     myHb.topY < otherHb.bottomY && myHb.bottomY > otherHb.topY)
   }






}
