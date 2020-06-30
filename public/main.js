/*----------Main JS----------*/
let gameMgr;
window.onload = function() {
  //wait for dom to load
  populateStars(50)

}

function startGame(){
  gameMgr = new GameMgr(populateStars);
  gameMgr.startFirstGame();
}

function buttonClick(){
window.location.href = "/game"

}
function populateStars(num){
  var starMap = document.getElementById("starsSet")
  starMap.innerHTML=''
  for(var i = num; i > 0 ; i-- ){
    createStar(i, randomInt(0, window.innerWidth), randomInt(0,window.innerHeight ), randomInt(15, 50), randomInt(1, 10))
}


}
function createStar(num, x, y, blur, spread){
  var star = document.createElement("div")
  star.classList.add("star")
  star.id = "newStar" + num
  star.style.transform = ("translate(" + x + "px, " + y + "px)")
  star.style.boxShadow = ("0px 0px "+ blur + "px " + spread+ "px rgba(253, 253, 253, 0.8)")
  document.getElementById("starsSet").append(star)
}
