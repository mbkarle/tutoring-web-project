
class Backpack {
  constructor(owner, capacity, icon) {

    this.owner = owner
    this.capacity = capacity
    this.icon = icon
    this.inventory = []
    this.gui = document.getElementById("cargoBay")
    this.equippedItems = {
      "Hull": [],
      "Engine": [],
      "Weapon": [],
    }
  }


  addItem(item) {
    if (!this.isCarrying(item)) {
      this.inventory.push(item)
    }
  }
  removeItem(item) {
    return removeFromArray(item, this.inventory)
  }
  isCarrying(item) {
    return this.inventory.indexOf(item) != -1
  }
  equipItem(item) {
    if (this.removeItem(item)) {
      this.equippedItems[item.upgradeType].push(item)
      item.equip(this.owner)
      return true
    }
    return false
  }
  unequipItem(item) {
    if (removeFromArray(item, this.equippedItems[item.upgradeType])) {
      this.addItem(item)
      item.unequip(this.owner)
      return true
    }
    return false
  }




}




class UpgradesList {
  constructor(list) {
    this.list = list

  }
  static makeUpgrade(data) {
    return new BasicUpgrade(data)
  }
  static makeRandomUpgrade(dataList) {
    var chosenUpgrade = randomInt(0, dataList.length)
    return UpgradesList.makeUpgrade(dataList[chosenUpgrade])
  }
  filterBy(field, value) {
    var filteredList = []
    for (var i in this.list) {
      if (this.list[i][field] === value) {
        filteredList.push(this.list[i])
      }
    }
    return filteredList
  }
  getMostExpensive() {
    let currentMostExpensive = 0
    let upgrade = ""
    for (var obj of this.list) {
      if (obj.price > currentMostExpensive) {
        currentMostExpensive = obj.price
        upgrade = obj
      }
    }
    return upgrade
  }
  priceSort() {
    var lst = [...this.list]

    for (var i = 1; i < lst.length; i++) {
      var j = i
      while (j > 0 && lst[j].price < lst[j - 1].price) {
        this.swap(j, j - 1, lst)
        j--
      }
    }
    return lst
  }
  //            ^  Insertion Sort  ^
  swap(index1, index2, lst) {
    var item1 = lst[index1]
    lst[index1] = lst[index2]
    lst[index2] = item1
  }
  priceBubbleSort() {
    var sortedList = []
    while (this.list.length > 0) {
      var mostExpensive = this.getMostExpensive()
      this.list.splice(this.list.indexOf(mostExpensive), 1)
      sortedList.push(mostExpensive)
    }
    this.list = sortedList
    return this.list
  }


  // fancyFilter(field, value){
  // return this.list.filter((obj)=>this.list[i][field] === value)
  // }
  // ^ this uses JavaScript's built in filter ^

}


// function fibonacci(term){
//   if(term == 0){
//     return 0
//   }
//   if(term == 1){
//     return 1
//   }
//   return fibonacci(term - 1) + fibonacci(term - 2)
// }
// ^ example of a recursive function ^ with a speed of O(n^2)












class Item extends Sprite {
  // Mainly item drops ^
  constructor(width, height, x, y, type) {
    super(width, height, x, y, type, "fakeID")





  }
  delete(gameMgr) {
    super.delete()
    gameMgr.removeItem(this)

  }
  onCollide(gameMgr, player) {
    this.delete(gameMgr)
    this.addEffect(player)
  }
  spawn(gameMgr) {
    gameMgr.items.push(this)
    gameMgr.sprites.push(this)
    this.element = this.initElement()
    // individual items will most likly change this
  }
  addEffect() {
    console.log("You have picked up an Item")
    // individual Items must define their own specific addEffect

  }




}

class Credits extends Item {
  constructor(x, y, amount) {
    super(30, 30, x, y, "credits")
    this.amount = amount ? amount : randomInt(5, 15)
  }
  addEffect(player) {
    player.addMoney(this.amount)
  }
}




class RepairPack extends Item {
  constructor(x, y, repair) {
    super(30, 30, x, y, "repair-pack")
    this.repair = repair ? repair : 20
  }

  addEffect(player) {
    if (player.health + this.repair >= player.maxHealth) {
      player.addHealth(player.maxHealth - player.health)
      console.log("You are fully Repaired")
    }
    else {
      player.addHealth(this.repair)
    }
  }
}








class Upgrade {
  constructor(name, upgradeType, image, description, rarity, addEffect, removeEffect) {

    this.name = name
    this.upgradeType = upgradeType
    this.image = image
    this.description = description
    this.rarity = rarity
    this.isEquipped = false
    this.addEffect = addEffect
    this.removeEffect = removeEffect
  }

  equip(player) {
    if (!this.isEquipped) {
      this.isEquipped = true
      this.addEffect(player)
    }
  }
  unequip(player) {
    if (this.isEquipped) {
      this.isEquipped = false
      this.removeEffect(player)
    }
  }
}



class BasicUpgrade extends Upgrade {
  constructor({ name, upgradeType, image, description, rarity, effects }) {
    super(name, upgradeType, image, description, rarity,
      (player) => {
        for (var property in effects) {
          player[property] += effects[property]
        }
      },
      (player) => {
        for (var property in effects) {
          player[property] -= effects[property]
        }
      })

    this.effects = effects

  }

}
