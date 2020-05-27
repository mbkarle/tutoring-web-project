//Just like in python, class created with "class className", but now use curly braces instead of colon as in JS
console.log("Player linked in")

var types = {
    "enemy":"enemy-ship.png",
    "player":"spaceship.png"
}
function randomInt(min, max){
return(Math.floor(Math.random()*(max-min))+ min)
}

class Entity{
  constructor(type, health, damage, x, y, id){

    this.type = type
    this.health = health
    this.damage = damage
    this.x = x
    this.y = y


    if(id){
    this.element = document.getElementById(id)
    }
    else{
      this.element = this.initElement()
    }


  }

initElement(){
var element = document.createElement("div")
element.classList.add("ship")
element.innerHTML = ('<img src="'+ types[this.type]+ '" class="spaceShip"/>')
document.getElementById("gameMap").append(element)
return element
}

draw(){
  this.element.style.transform = ("translate(" + this.x + "px, " + this.y + "px)")
}
setNewCoords(x, y){
  this.x = x
  this.y = y
}






}





class Player extends Entity {
  constructor(health, damage, x, y, id){
    super("player", health, damage, x, y, id)


     this.timerID={
      "w":-1,
      's':-1,
      'a':-1,
      "d":-1
    }
    this.keyAllowed= {
      "w":true,
      "s":true,
      "a":true,
      "d":true
    }


  }



shoot(){

}
keyPress(e){
let self = this
  if(!this.keyAllowed[e.key]){
    return
  }
  if(e.key == "w"){
    this.timerID["w"] = setInterval(function(){
     self.y -= 2
     self.draw()

    },45 )
  }
  if(e.key == "s"){
    this.timerID["s"] = setInterval(function(){
      self.y += 2
      self.draw()

    }, 45)
  }
  if(e.key == "a"){
    this.timerID["a"]= setInterval(function(){
  self.x -= 2
  self.draw()


    }, 45)
  }
  if(e.key == "d"){
    this.timerID["d"]= setInterval(function(){
  self.x += 2
  self.draw()

   }, 45)
  }

  this.keyAllowed[e.key]= false



  }
keyUp(e){
  if(!this.keyAllowed[e.key]){
    this.keyAllowed[e.key] = true
    clearInterval(this.timerID[e.key])
  }

}




}

class Enemy extends Entity {
  constructor(health, damage, x, y, id){
  super("enemy", health, damage, x, y, id)
let self = this

  self.moveTimer = setInterval(() => this.randomMove() , 439)
}


randomMove(){
  this.setNewCoords(this.x + randomInt(-3, 3), this.y + randomInt(-3, 3))
  this.draw()

}












}




//in JavaScript, class methods do not need "function" in front of them, they are properties of the class
//methods also do not need to be given "self" as an input, instead always have access to "this" keyword which has same functionality
//constructor is the analogous function to __init__ in python
