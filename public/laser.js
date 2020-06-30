

class Laser extends Sprite{
  constructor(damage, x, y,){
    super(8, 30, x, y,"laser")

      this.damage = damage

  }



onCollide(other){
if(!other.invinciblity){ other.health -= this.damage
other.setInvincible(true)
setTimeout(()=> other.setInvincible(false), other.iDuration)
console.log("Health: " + other.health)}
other.updateHealthBar()
}



}
