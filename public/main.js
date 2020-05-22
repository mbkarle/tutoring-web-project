/*----------Main JS----------*/
var keyAllowed= {
  "w":true,
  "s":true,
  "a":true,
  "d":true,
}
var timerID={
  "w":-1,
  's':-1,
  'a':-1,
  "d":-1,



}
var playerX = 0
var playerY = 0
window.onload = function() {
    //wait for dom to load
    console.log("Loaded");

var width  = window.innerWidth
var height =window.innerHeight

    for(var i = 50; i > 0 ; i-- ){
      createStar(i, randomInt(0, width), randomInt(0,height ), randomInt(15, 50), randomInt(1, 10))

    }
// var x = 0
// var y = 0
// var movement = setInterval(function(){
// var player =document.getElementById("player")
// player.style.transform = ("translate(" + x + "px, " + y + "px)")
// x += 1
// y += 1
//
// }, 40)
//
// setTimeout(function(){
// clearInterval(movement)
//
//
// }, 10000)
document.addEventListener("keydown", function(e){
console.log(e.key)
if(keyAllowed[e.key]== false){
  return
}
if(e.key == "w"){
  timerID["w"] = setInterval(function(){
   playerY -= 2
   move(playerX, playerY)

  },45 )
}
if(e.key == "s"){
  timerID["s"] = setInterval(function(){
    playerY += 2
    move(playerX, playerY)

  }, 45)
}
if(e.key == "a"){
  timerID["a"]= setInterval(function(){
playerX -= 2
move(playerX, playerY)


  }, 45)
}
if(e.key == "d"){
  timerID["d"]= setInterval(function(){
playerX += 2
move(playerX, playerY)

  }, 45)
}

keyAllowed[e.key]= false
})

document.addEventListener("keyup", function(e){
 keyAllowed[e.key] = true
 clearInterval(timerID[e.key])
})


}

function createStar(num, x, y, blur, spread){
  var star = document.createElement("div")
  star.classList.add("star")
  star.id = "newStar" + num
  star.style.transform = ("translate(" + x + "px, " + y + "px)")
  // document.getElementById("starsSet").append(star)
  star.style.boxShadow = ("0px 0px "+ blur + "px " + spread+ "px rgba(253, 253, 253, 0.8)")
  document.getElementById("starsSet").append(star)
}

function move(x, y){
var player = document.getElementById("player")
player.style.transform = ("translate(" + x + "px, " + y + "px)")

}

function randomInt(min, max){
return(Math.floor(Math.random()*(max-min))+ min)


}
