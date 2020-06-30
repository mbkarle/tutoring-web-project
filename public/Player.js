//Just like in python, class created with "class className", but now use curly braces instead of colon as in JS

class Entity extends Sprite{
  constructor(type, health, damage, x, y, id){
    super(110, 128, x, y, type, id)
    this.health = health
    this.damage = damage
    this.speed = 6
    this.invinciblity = false
    this.iDuration = 1000
      // Keep at 1000 ^
    this.maxHealth = health
    this.rotationSpeed = 5
    this.isAlive = true
    this.width = 100
    this.height = 110
  }

  delete(entities){
    super.delete()
    entities.splice( entities.indexOf(this)  , 1)
  }






isInvincible(){
return this.invinciblity
}
setInvincible(parameter){
this.invinciblity = parameter
}
onCollide(other){
if(!this.invinciblity){ this.health -= other.damage
this.setInvincible(true)
setTimeout(()=> this.setInvincible(false), this.iDuration)
console.log("Health: " + this.health)}
this.updateHealthBar()
}
updateHealthBar(){
var healthBar = document.getElementById(this.healthSliderID)
var map = document.getElementById("gameMap")
healthBar.style.width = ((this.health/this.maxHealth) * 100) + "%"
if(this.health < 0){
  healthBar.style.width = (0 + "%")
// comment the two lines below this to play without a death screen
  this.onDeath()
  setTimeout(()=> window.location.href = "/", 2000)
}
}
onDeath(){
  this.isAlive = false

  }



}





class Player extends Entity {
  constructor(health, damage, x, y, id){
    super("player", health, damage, x, y, id)
    this.defaultSpeed = this.speed
    this.canDash = true
    this.healthSliderID = "playerHealthSlider"
    this.fireRate = 750
    // ^This is in milliseconds
     this.timerID={
      "w":-1,
      's':-1,
      'a':-1,
      "d":-1,
      "click":-1
    }
    this.keyAllowed= {
      "w":true,
      "s":true,
      "a":true,
      "d":true,
      " ":true,
    }


  }
onDeath(){
  super.onDeath()
  for(var i in this.timerID){
    clearInterval(this.timerID[i])}
  var game = document.getElementById("game")
  var death = document.getElementById("death")
  game.style.display = "none"
  death.style.display = "flex"
}

shoot(){
var laser = new Laser(this.damage, this.x + 52, this.y+ 18 )
laser.rotation = this.rotation
laser.draw()
}
keyPress(e){
if(this.isAlive){let self = this
  if(!this.keyAllowed[e.key]){
    return
  }
  if(e.key == "w"){
    this.timerID["w"] = setInterval(function(){
     self.y-= self.speed * Math.cos(radians(self.rotation))
     self.x += self.speed * Math.sin(radians(self.rotation))


    },45 )
  }
  if(e.key == "s"){
    this.timerID["s"] = setInterval(function(){
      self.y += self.speed * Math.cos(radians(self.rotation))
      self.x -= self.speed * Math.sin(radians(self.rotation))


    }, 45)
  }
  if(e.key == "a"){
    this.timerID["a"]= setInterval(function(){
   self.rotation -= self.rotationSpeed



    }, 45)
  }
  if(e.key == "d"){
    this.timerID["d"]= setInterval(function(){
   self.rotation += self.rotationSpeed


   }, 45)
  }
  if(e.key == " " && self.canDash){
    self.speed = 25
    self.canDash = false
    setTimeout(()=> self.speed = this.defaultSpeed, 250)
    setTimeout(()=> self.canDash = true, 2500)
  }

  this.keyAllowed[e.key]= false}



  }
keyUp(e){
  if(!this.keyAllowed[e.key]){
    this.keyAllowed[e.key] = true
    clearInterval(this.timerID[e.key])
  }
}
mousedown(e){
this.shoot()
clearInterval(this.timerID["click"])
this.timerID["click"] = setInterval(()=>{
this.shoot()
}, this.fireRate)
}
mouseup(e){
  clearInterval(this.timerID["click"])
}






}

class Enemy extends Entity {
  constructor(health, damage, x, y, id){
  super("enemy", health, damage, x, y, id)
let self = this
this.target = [this.x, this.y]
  self.moveTimer = setInterval(() => this.randomMove() , 50)

}


randomMove(){
  if(this.atTarget()){
    this.speed = randomInt(2, 20)
    this.randomTarget()}
  this.nextPosition()


}
atTarget(){
return (Math.abs(this.x - this.target[0])<this.speed && Math.abs(this.y - this.target[1])<this.speed)
}
setTarget(x, y){
  this.target[0] = x
  this.target[1] = y
}
randomTarget(){
let x = randomInt(0, window.innerWidth)
let y = randomInt(0, window.innerHeight)
this.setTarget(x, y)
}
nextPosition(){
let displacement = [this.target[0] - this.x, this.target[1] - this.y]
let magnitude = Math.sqrt(displacement[0]*displacement[0] + displacement[1]*displacement[1] )
let direction = [displacement[0]/magnitude, displacement[1]/magnitude]
this.x += Math.ceil(direction[0]* this.speed)
this.y += Math.ceil(direction[1]* this.speed)
}




}









//in JavaScript, class methods do not need "function" in front of them, they are properties of the class
//methods also do not need to be given "self" as an input, instead always have access to "this" keyword which has same functionality
//constructor is the analogous function to __init__ in python
