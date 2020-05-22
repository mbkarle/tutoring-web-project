//Just like in python, class created with "class className", but now use curly braces instead of colon as in JS
console.log("Player linked in")

class Player {
  constructor(health, damage, x, y, outsideID){
    this.health = health
    this.damage = damage
    this.x = x
    this.y = y
    this.element = document.getElementById(outsideID)

     this.timerID={
      "w":-1,
      's':-1,
      'a':-1,
      "d":-1
    }
    this.keyAllowed= {
      "w":true,
      "s":true,
      "a":true,
      "d":true
    }


  }
draw(){
    this.element.style.transform =("translate(" + this.x +"px, " + this.y +"px)")
}


shoot(){

}
keyPress(e){
let self = this
  if(!this.keyAllowed[e.key]){
    return
  }
  if(e.key == "w"){
    this.timerID["w"] = setInterval(function(){
     self.y -= 2
     self.draw()

    },45 )
  }
  if(e.key == "s"){
    this.timerID["s"] = setInterval(function(){
      self.y += 2
      self.draw()

    }, 45)
  }
  if(e.key == "a"){
    this.timerID["a"]= setInterval(function(){
  self.x -= 2
  self.draw()


    }, 45)
  }
  if(e.key == "d"){
    this.timerID["d"]= setInterval(function(){
  self.x += 2
  self.draw()

   }, 45)
  }

  this.keyAllowed[e.key]= false



  }
keyUp(e){
  if(!this.keyAllowed[e.key]){
    this.keyAllowed[e.key] = true
    clearInterval(this.timerID[e.key])
  }

}




}






//in JavaScript, class methods do not need "function" in front of them, they are properties of the class
//methods also do not need to be given "self" as an input, instead always have access to "this" keyword which has same functionality
//constructor is the analogous function to __init__ in python
