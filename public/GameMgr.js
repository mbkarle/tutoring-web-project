class GameMgr {
  constructor(populateStars) {
    this.player;
    this.spritesHistory = [];
    this.sprites = [];
    this.enemies = [];
    this.ballistics = [];
    this.locations = [];
    this.drawLoop = -1;
    this.round = 0;
    this.map = document.getElementById("gameMap");
    this.populateStars = populateStars;
    this.boundaries = [window.innerWidth, window.innerHeight];

    window.onresize = () => this.boundaries = [window.innerWidth, window.innerHeight];
  }

  startFirstGame() {
    this.player = new Player(100, 25, 0, 0, this);
    this.addListeners(this.player);
    this.startRound();
  }

  startRound(num = this.round + 1) {
    let player = this.player;
    player.setNewCoords(0, 0);
    player.draw();
    this.sprites = [player];
    this.spritesHistory = [];
    this.enemies = [];
    [1, 1, 1].map( num => this.addGeneratedEnemy({}) );
    this.ballistics = [];
    this.locations = [new Portal(140, 140, this.boundaries[0] - 200, this.boundaries[1] - 200)];
    this.round = num;
    this.startLoop();
  }

  clearRound() {
    this.stopLoop();
    this.map.innerHTML = "";
    this.player.element = this.player.initElement();
    this.populateStars(50);
  }

  reset() {
    this.clearRound();
    this.startRound();
  }

  startLoop() {
    if(!this.isRunning()) {
      this.drawLoop = setInterval(() => this.updateState(), 50/3);
    }
  }

  stopLoop() {
    clearInterval(this.drawLoop);
    this.drawLoop = -1;
  }

  isRunning() {
    return this.drawLoop != -1;
  }

  updateState() {
    let player = this.player;
    for(var i = 0; i < this.sprites.length; i++) {
      //if(this.sprites[i].hasChanged(this.spritesHistory[i])) {
        this.sprites[i].draw();
        //let { x, y, rotation } = this.sprites[i];
        //this.spritesHistory[i] = {x, y, rotation};
      //}
    }
    for(let enemy of this.enemies) {
      if(player.isColliding(enemy)) {
        player.onCollide(enemy);
      }
      for(let ballistic of this.ballistics) {
        if(enemy.isColliding(ballistic)) {
          ballistic.onCollide(enemy)
        }
      }
    }
    for(let location of this.locations) {
      if(player.isColliding(location)) {
        location.onCollide(this)
      }
    }
  }

  addEnemy(enemy) {
    this.enemies.push(enemy)
    this.sprites.push(enemy);
  }

  addGeneratedEnemy(enemyOptions) {
    let {
      x = randomInt(100, this.boundaries[0]),
      y = randomInt(100, this.boundaries[1]),
      health = 50,
      damage = 30
    } = enemyOptions;
    let enemy = new Enemy(health, damage, x, y);
    this.addEnemy(enemy);
  }

  addBallistic(ballistic) {
    this.ballistics.push(ballistic);
    this.sprites.push(ballistic);
  }

  addLocation(location) {
    this.locations.push(location)
    this.sprites.push(location);
  }

  addListeners(player) {
    const listeners = ["keydown", "keyup", "mousedown", "mouseup"];
    listeners.map( listener => {
      document.addEventListener(listener, (e) => player[listener](e));
    });
  }
  removeBallistics(ballistic){
  this.ballistics.splice(this.ballistics.indexOf(ballistic),1)
  this.sprites.splice(this.sprites.indexOf(ballistic),1)
  
  }
}
