/*----------Main JS----------*/
window.onload = function() {
    //wait for dom to load
    console.log("Loaded");

var width  = window.innerWidth
var height =window.innerHeight

    for(var i = 50; i > 0 ; i-- ){
      createStar(i, randomInt(0, width), randomInt(0,height ), randomInt(15, 50), randomInt(1, 10))
    }


}

function startGame(){
  var portal = new Portal(140, 140, 600, 300)
  var player = new Player(100, 25, 0, 0, "player" )
  let entities = [player]
  for(var i = 0; i < 3; i ++){
    entities.push(new Enemy(50, 30, randomInt(100, 700), randomInt(100, 700)))
  }
document.addEventListener("keydown", function(e){player.keyPress(e)})

document.addEventListener("keyup", function(e){player.keyUp(e)})
let drawLoop = setInterval(()=>{
for(var i = 0; i < entities.length; i++){
entities[i].draw()
}
for(var j = 1; j < entities.length; j++){
if(entities[0].isColliding(entities[j])){
  player.onCollide(entities[j])
  console.log("is colliding")
}
}
if(portal.isColliding(entities[0])){
  portal.onCollide()
}
} , 50/3)


}

function buttonClick(){
window.location.href = "/game"

}

function createStar(num, x, y, blur, spread){
  var star = document.createElement("div")
  star.classList.add("star")
  star.id = "newStar" + num
  star.style.transform = ("translate(" + x + "px, " + y + "px)")
  star.style.boxShadow = ("0px 0px "+ blur + "px " + spread+ "px rgba(253, 253, 253, 0.8)")
  document.getElementById("starsSet").append(star)
}
