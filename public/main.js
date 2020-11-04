/*----------Main JS----------*/
let gameMgr;
window.onload = function () {
  //wait for dom to load
  populateStars(50)

}

function pickOne(list) {
  return list[randomInt(0, list.length)];
}

function startGame() {
  gameMgr = new GameMgr(populateStars);
  gameMgr.startFirstGame();
  let list = []
  let multipliers = {
    "common": 1,
    "rare": 2,
    "epic": 4,
    "legendary": 8,
    "mythic": 16
  }
  let effectTypes = {
    "Weapon": "damage",
    "Hull": "health",
    "Engine": "speed"
  }
  for (let i = 0; i < 100; i++) {
    let rarity = pickOne(Object.keys(multipliers));
    let type = pickOne(["Weapon", "Engine", "Hull"]);
    let multiplier = multipliers[rarity];
    list[i] = {
      name: `Upgrade #${i}`,
      rarity: rarity,
      upgradeType: type,
      effects: { [effectTypes[type]]: (randomInt(5, 20) * randomInt(multiplier / 2, multiplier)) },
      price: randomInt(10, 50) * multiplier,
      description: `Upgrade #${i} improves your ${effectTypes[type]} as an addition to your ${type} upgrades suite`
    }
  }
  gameMgr.upgradesList = new UpgradesList(list);
}

function buttonClick() {
  window.location.href = "/game"

}
function populateStars(num) {
  var starMap = document.getElementById("starsSet")
  starMap.innerHTML = ''
  for (var i = num; i > 0; i--) {
    createStar(i, randomInt(0, window.innerWidth), randomInt(0, window.innerHeight), randomInt(15, 50), randomInt(1, 10))
  }


}
function createStar(num, x, y, blur, spread) {
  var star = document.createElement("div")
  star.classList.add("star")
  star.id = "newStar" + num
  star.style.transform = ("translate(" + x + "px, " + y + "px)")
  star.style.boxShadow = ("0px 0px " + blur + "px " + spread + "px rgba(253, 253, 253, 0.8)")
  document.getElementById("starsSet").append(star)
}
