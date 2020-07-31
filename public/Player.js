//Just like in python, class created with "class className", but now use curly braces instead of colon as in JS

class Entity extends Sprite{
  constructor(type, health, damage, x, y, id){
    super(110, 128, x, y, type, id)
    this.health = health
    this.damage = damage
    this.speed = 6
    this.defaultSpeed = this.speed;
    this.invinciblity = false
    this.iDuration = 1000
      // Keep at 1000 ^
    this.maxHealth = health
    this.rotationSpeed = 5
    this.isAlive = true
    this.width = 100
    this.height = 110
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
  constructor(health, damage, x, y, gameManager, id){
    super("player", health, damage, x, y, id)
    this.defaultSpeed = this.speed
    this.canDash = true
    this.healthSliderID = "playerHealthSlider"
    this.fireRate = 750
// ^This is in milliseconds
    this.money = 0
    this.manager = gameManager
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
  var laser = new Laser(this.damage, ...this.getRelativePosition(this.width/2, 20),this.manager)
  laser.rotation = this.rotation
  this.manager.addBallistic(laser)
  laser.draw()
}
keydown(e){
if(this.isAlive){let self = this
  if(!this.keyAllowed[e.key]){
    return
  }
  if(e.key == "w"){
    this.timerID["w"] = setInterval(function(){
     self.speed = self.defaultSpeed;
     self.move();
    },45 )
  }
  if(e.key == "s"){
    this.timerID["s"] = setInterval(function(){
      self.speed = - self.defaultSpeed;
      self.move();

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
    self.speedMultiplier = 5
    self.canDash = false
    setTimeout(()=> self.speedMultiplier = 1, 250)
    setTimeout(()=> self.canDash = true, 2500)
  }

  this.keyAllowed[e.key]= false}



  }
keyup(e){
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
addMoney(newMoney){
  this.money += newMoney;
  document.getElementById("moneyCounter").innerHTML = ": " + this.money;
}
addHealth(change){
this.health += change;
this.updateHealthBar()

}




}

class Enemy extends Entity {
  constructor(health, damage, x, y, gameManager, id){
  super("enemy", health, damage, x, y, id)
  this.target = [this.x, this.y]
  this.moveTimer = setInterval(() => this.randomMove() , 50)
  this.boundaries = {
    minLeft:0,
    minTop:0,
    maxLeft: window.innerWidth,
    maxTop: window.innerHeight,
  }
  this.manager = gameManager
  this.lootTable = [new Credits(), new RepairPack()]
}
  delete(gameMgr){
    super.delete()
    gameMgr.removeEnemies(this)
    this.drops(gameMgr)
  }
  drops(gameMgr){
    var i = 0
    for(var loot of this.lootTable){
      loot.setNewCoords(this.x +(i * 40), this.y +(i * 40) )
      loot.spawn(gameMgr)
      i++
    }
  }
  randomMove(){
    if(this.atTarget()){
      this.speed = randomInt(2, 20)
      if(Math.random() <=this.distanceToTargetChance(getDistance(
        [this.manager.player.x, this.manager.player.y], [this.x, this.y]))){
        this.targetPlayer()
        this.speed = 15
      }
      else{
      this.randomTarget()
      }
      this.rotationSpeed = randomInt(5, 15);
    }
    this.nextRotation(...this.target);
    this.move();
  }
  atTarget(){
  return (Math.abs(this.x - this.target[0]) < this.speed * 2 && Math.abs(this.y - this.target[1]) < this.speed * 2)
  }
  setTarget(x, y){
    this.target[0] = x
    this.target[1] = y
  }
  randomTarget(){
    let x = randomInt(this.boundaries["minLeft"], this.boundaries["maxLeft"])
    let y = randomInt(this.boundaries["minTop"], this.boundaries["maxTop"])
    this.setTarget(x, y)
  }

  getBearing(x, y) {
    let theta = toDeg(Math.atan2(-(y - this.y), x - this.x));//get angle relative to positive x axis
    let bearing = (450 - theta) % 360; //get bearing from north
    return bearing;
  }

  nextRotation(x, y) {
    let bearing = this.getBearing(x, y); //get bearing
    let turnDiff = bearing - this.rotation; //get the difference between rotations in one direction
    let altTurnDiff = bearing + 360 * sign(this.rotation - bearing) - this.rotation; //get rotate diff in other direction
    let diff = minMag(turnDiff, altTurnDiff); //select the smaller turn
    if(Math.abs(diff) > this.rotationSpeed) { //if not already on course
      this.rotation += this.rotationSpeed * sign(diff); //turn in direction
      this.rotation = normalizeBearing(this.rotation); //if rotation overflows, reset to 0
    }
  }
  nextPosition(){
  let displacement = [this.target[0] - this.x, this.target[1] - this.y]
  let magnitude = Math.sqrt(displacement[0]*displacement[0] + displacement[1]*displacement[1] )
  let direction = [displacement[0]/magnitude, displacement[1]/magnitude]
  this.x += Math.ceil(direction[0]* this.speed)
  this.y += Math.ceil(direction[1]* this.speed)
  }
  setBoundaries({minLeft = 0, minTop = 0, maxLeft = window.innerWidth,
    maxTop = window.innerHeight}){
      this.boundaries.minLeft = minLeft;
      this.boundaries.minTop = minTop;
      this.boundaries.maxLeft = maxLeft;
      this.boundaries.maxTop = maxTop;
  }
  static getDefaultValues(){
    return {
        health: 75,
        damage: 30,
      }
  }
targetPlayer(){
this.setTarget(this.manager.player.x, this.manager.player.y)
}
distanceToTargetChance(distance){
return (-0.4/(window.innerWidth))*distance+0.5

}

}








//in JavaScript, class methods do not need "function" in front of them, they are properties of the class
//methods also do not need to be given "self" as an input, instead always have access to "this" keyword which has same functionality
//constructor is the analogous function to __init__ in python
