
class Portal extends Sprite {
  constructor(width, height, x, y) {
    super(width, height, x, y, "portal")
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.isVisible = false
  }

  setVisibility(bool) {
    this.isVisible = bool ? true : false
    this.element.style.display = bool ? "block" : "none"
  }

  onCollide(gameMgr) {
    if (this.isVisible) {
      gameMgr.reset();
    }
  }
}
