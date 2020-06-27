
class Portal extends Sprite {
  constructor(width, height, x, y){
    super(width, height, x, y, "portal")
    this.width =  width
    this.height = height
    this.x = x
    this.y = y
    this.isVisible = true
  }

  setVisibility(bool){
    this.isVisible = bool ? true : false
    this.element.style.display = bool ? "block" : "none"
  }

  onCollide(reset){
    if(this.isVisible){reset()}


  }







}
