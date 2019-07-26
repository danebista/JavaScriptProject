'use strict'

class Level {
  constructor(game, number, canvas) {

    this.game = game;
    this.number = number;
    this.cnv = canvas;
    this.init();
  }
  init() {
  }
}
class Level1 extends Level {
  constructor(game){
    super(game,1)
    this.game.canvas.canDiv.style.backgroundImage="url('resources/images/bg/start.png')"
    this.panelStart = new Panel(this, 0)
    this.panelInstructions = 0
    this.panelQuit = 0
  }
  run() {
    this.game.render();
    if(this.panelStart){
      this.panelStart.render()
    }

    if(this.panelInstructions){
      this.panelInstructions.render()
    }
  }
}
class Level2 extends Level{
  constructor(game) {
    super(game,2)
    this.game.canvas.canDiv.style.backgroundImage="url('resources/images/bg/star.gif')"
    this.game.health=100
    this.game.score=0
    this.game.bankValue = 500;
    this.game.gameTime = 0
    this.game.grid = [];
    this.game.towers = [];
    this.game.enemies = [];
    this.game.bullets = [];
    this.game.currentWaveNum=0;
    this.game.wave=new Wave(this.game,AllWaves[this.game.currentWaveNum]);
    this.game.cols = Math.floor(this.game.canvas.width / this.game.w);
    this.game.rows = Math.floor(this.game.canvas.height / this.game.w);
    this.game.backgroundMusic = new Audio('resources/sounds/Elevator-music.wav')
    this.game.backgroundMusic.volume=0.2;
    this.game.loadGrid();
    this.game.root = this.game.grid[this.game.cols - 1][this.game.rows -1];
    this.game.brushfire();
  }
  init(){

  }
  run(){
    this.game.frame++;
    let gt = this.game.updateGameTime();
    this.game.updateInfoElements(gt);
    this.game.removeBullets();
    this.game.removeEnemies();
    this.game.controlWaves()
    this.game.backgroundMusic.play();
    if (this.game.isRunning) {
      this.game.render();
    }

    for(let i = 0; i < this.game.cols; i++){
      for(let j = 0; j < this.game.rows; j++){
        this.game.grid[i][j].render();
      }
    }
   
    for (let i = 0; i < this.game.towers.length; i++) {
      this.game.towers[i].run();
    }
    for (let i = 0; i < this.game.enemies.length; i++) {
      this.game.enemies[i].run();
    }
    for (let i = 0; i < this.game.bullets.length; i++) {
      this.game.bullets[i].run();
    }
    for (let i = 0; i < this.game.explosiveBullets.length; i++) {
      this.game.explosiveBullets[i].run();
      if(this.game.explosiveBullets[i].kills === true){
      }
      if(this.game.enemies.length === 0){
      }
    }
    if( this.game.health <= 0){
     var highScore=JSON.parse(localStorage.getItem('highScores')) || 0;
       if (this.game.score>=highScore){
       localStorage.setItem('highScores',JSON.stringify(this.game.score));
       highScore=this.game.score;
    }
      this.game.canvas.canDiv.style.borderColor="black";
      this.game.level=new Level3(this.game,this.game.score);
      this.game.backgroundMusic.pause();
    }
  }

}
class Level3 extends Level{
  constructor(game,score) {
    super(game)
    this.game.enemies=[]
    this.highScore=JSON.parse(localStorage.getItem('highScores')) || 0;
    this.score=score || 0;
    this.game.canvas.canDiv.style.backgroundImage="url('resources/images/bg/end.png')"
    this.ctx=this.game.context;
    this.panelQuit = new Panel(this, 2)
    this.panelCredits = 0
    this.panelStart = 0
  }
  run() {
    this.game.render();
    this.drawScore();
   
    document.getElementById("infoDiv").getElementsByClassName("infoTileDiv")[4].innerHTML = ("</br></br>" + 0);    if(this.panelQuit){
     this.panelQuit.render()
    
    }
    if(this.panelCredits){
      this.panelCredits.render()
    }
  }
  drawScore(){
    this.ctx.font="40px monospace"
    this.ctx.fillStyle="#000"
    var coordinates=70;
    var coordinates1=560;
    var coordinates2=320;
    var coordinates3=560;
    var coordinates4=70;
    var coordinates5=620;
    var coordinates6=290;
    var coordinates7=620;
    this.ctx.fillText("Your Score:",coordinates,coordinates1);
    this.ctx.fillText(this.score,coordinates2,coordinates3);
    this.ctx.fillText("HighScore:",coordinates4,coordinates5);
    this.ctx.fillText(this.highScore,coordinates6,coordinates7);
  }
}
