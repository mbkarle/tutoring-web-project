

class Laser extends Sprite{
  constructor(damage, x, y, gameManager){
    super(8, 30, x, y,"laser")

      this.damage = damage
      this.speed = 24
      this.manager = gameManager
      this.range = 1000
      this.startingCoords = [x, y]
      this.moveTimer = setInterval(()=>{
      this.move()
      }, 50/3)
  }



onCollide(other){
this.delete()
if(!other.invinciblity){ other.health -= this.damage
other.setInvincible(true)
setTimeout(()=> other.setInvincible(false), other.iDuration)
console.log("Health: " + other.health)}
other.updateHealthBar()
}
delete(){
  super.delete()
  this.manager.removeBallistics(this)
  clearInterval(this.moveTimer)
}
move(){
  super.move()
  var distance = getDistance(this.startingCoords, [this.x, this.y])
  if(distance>= this.range){
    this.delete()
  }
}

}
