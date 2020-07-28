
class Item extends Sprite{
constructor(width, height, x, y, type){
super(width, height, x, y, type, "fakeID")





}
delete(gameMgr){
super.delete()
gameMgr.removeItem(this)

}
onCollide(gameMgr, player){
this.delete(gameMgr)
this.addEffect(player)
}
spawn(gameMgr){
gameMgr.items.push(this)
gameMgr.sprites.push(this)
this.element = this.initElement()
// individual items will most likly change this
}
addEffect(){
console.log("You have picked up an Item")
// individual Items must define their own specific addEffect

}




    }

class Credits extends Item{
  constructor(x, y, amount){
    super(30, 30, x, y, "credits")
    this.amount = amount ? amount:randomInt(5, 15)
  }
  addEffect(player){
    player.addMoney(this.amount)
  }
}




class RepairPack extends Item{
  constructor(x, y, repair){
    super(30, 30, x, y, "repair-pack")
    this.repair = repair ? repair:20
  }

  addEffect(player){
    if(player.health + this.repair >= player.maxHealth){
        player.health = player.maxHealth
        console.log("You are fully Repaired")
    }
    else{
      player.addHealth(this.repair)
    }
  }
}
