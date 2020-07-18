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
    this.killCounter = 0;
    this.portalSound = new Audio("audio/inception.mp3");
    this.portalSound.volume = 1/7;
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
    for(var x = 0; x < 3 + Math.floor(this.round/3) ; x++ ){
    this.addGeneratedEnemy({
      health:Enemy.getDefaultValues().health *Math.pow(1.05, this.round),
      damage:Enemy.getDefaultValues().damage *Math.pow(1.05, this.round)
    })

//T

    }
    this.ballistics = [];
    this.locations = [new Portal(140, 140, this.boundaries[0] - 200, this.boundaries[1] - 200)];
    this.locations[0].setVisibility(false)
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
    this.killCounter = 0;
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
      health = Enemy.getDefaultValues().health,
      damage = Enemy.getDefaultValues().damage,
      boundaries = {
      minLeft:0,
      minTop:0,
      maxLeft: window.innerWidth,
      maxTop: window.innerHeight,}
    } = enemyOptions;
    let enemy = new Enemy(health, damage, x, y, this);
    enemy.setBoundaries(boundaries)
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
  this.ballistics.splice(this.ballistics.indexOf(ballistic),1);
  this.sprites.splice(this.sprites.indexOf(ballistic),1);
  }
  updateKillCount(){
    this.killCounter += 1;
    this.checkPortal();
  }
  removeEnemies(enemy){
  this.enemies.splice(this.enemies.indexOf(enemy),1);
  this.sprites.splice(this.sprites.indexOf(enemy),1);
  this.updateKillCount();
}
  checkPortal(){
  if(this.killCounter >= 3 && !this.locations[0].isVisible){
    this.locations[0].setVisibility(true);
    this.portalSound.play();
    this.addGeneratedEnemy({
      x : this.locations[0].x,
      y : this.locations[0].y,
      health : 200,
      boundaries : {
      minLeft:window.innerWidth*.75,
      minTop:window.innerHeight/2,}
}
  )
  }

  // function killAll(){
  // while (enemies.length > 0){
  // enemies[0].delete(gameMgr)
  // }
  }
  stopMoving(){
  for(var x = 0; x < this.enemies.length; x++){
  clearInterval(this.enemies[x].moveTimer)
  }
}
// ^for testing purposes, delete when no longer needed^





  }
