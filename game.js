'use strict'


window.addEventListener('load', loadImages, false);

var towerGame;   // the global game object
var FRAME_RATE=30;
var cellId = 0;

var bsImage;
var ssImage;
var portHole;
var explosion;
var load = document.getElementById('loader');
var wrap;

var sliderDiv = document.createElement('div');
sliderDiv.setAttribute('id', 'sliderDiv');

 function loadImages(){
   bsImage = new Image();
   bsImage.src = "resources/images/spritesheets/buttons.png";
   ssImage = new Image();
   ssImage.src = "resources/images/spritesheets/sprites2.png";
   portHole=new Image();
   portHole.src="resources/images/bg/porthole.png";
   explosion=new Image();
   explosion.src="resources/images/bg/explode.png";
   window.setTimeout(setup, 1500);
 }
function setup() {
  wrap = document.getElementById('wrapperDiv');
  load.style.display = 'none';
  wrap.style.display = 'block';

  towerGame = new Game();
  
  wrap.appendChild(sliderDiv);
  window.setTimeout(draw, 100);    



}

function draw() { 
    towerGame.run();

    window.setTimeout(draw, 1000/FRAME_RATE);
}


class Game {

  constructor() {
    this.isRunning = true;
    this.placingTower = false;
    this.currentTower = 0;
    this.towerType = 0;
    this.gameTime = 0;
    this.towers = [];
    this.enemies = [];
    this.bullets = [];
    this.fireSliders = [];
    this.fireSlidersText = [];
    this.dmgSliders = [];
    this.dmgSlidersText = [];
    this.costSliders = [];
    this.costSlidersText = [];
    this.explosiveBullets = [];
    this.explosiveBullets = [];
    this.bankIncValue=50;
    this.textBankInc;
    this.bankValue = 500;
    this.rays = [];
    this.towersBankValuesARR = [];
    this.checkOnce = true;
    this.enemyNum = 20;
    this.wallCost = 35;
    this.enDa = [];
    this.towImgData = [];
    this.bulletImgData = [];
    this.paused = false;
    this.frame = 0;
    this.loadEnemyImages();
    this.score = 0;
    this.wave = 0;
    this.health = 100;
    this.canvas = document.createElement("canvas");
    if(!this.canvas || !this.canvas.getContext)
        throw "No valid canvas found!";
    this.canvas.width = 900;
    this.canvas.height = 750;
    this.canvas.canDiv=document.getElementById('canDiv')
    this.canvas.canDiv.appendChild(this.canvas);
    this.createFireRateSilder();
    this.createDamageSliders();
    this.createTowerCostSliders();
    this.createEnemyDeathValueSlider();
    this.context = this.canvas.getContext("2d");
    if(!this.context)
        throw "No valid context found!";
    this.lastTime = Date.now();
    //select everything of type/class and set call backs
    this.tileDivs = this.createTileDivs();
    this.loadDOMCallBacks(this.tileDivs);
    // select canvas for callbacks
    this.canvas.addEventListener('mousemove',this.handleCNVMouseMoved,false);
    this.canvas.addEventListener('mouseover',this.handleCNVMouseOver, false);
    this.canvas.addEventListener('click', this.handleCNVMouseClicked, false);
    this.currentWaveNum=0
    this.wave=new Wave(this,AllWaves[this.currentWaveNum])

    this.mouseX = 0;
    this.mouseY = 0;
    this.w = 50;
    this.done = false;

    window.onkeydown = function (e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if (code === 38) { 
        }
    };

 
      this.loadWallImage();
    this.level= new Level1(this)





    this.grid = [];
    this.cols = Math.floor(this.canvas.width / this.w);
    this.rows = Math.floor(this.canvas.height / this.w);

    this.loadGrid();
    this.root = this.grid[this.cols - 1][this.rows -1];
    this.brushfire();


    var button = document.getElementById('pauseButton');
    button.addEventListener('click', this.pause, false);

    var fastForwardButton = document.getElementById('fastForward');
    fastForwardButton.addEventListener('click', function(){

      if (FRAME_RATE == 30){
        FRAME_RATE = 60;
        fastForwardButton.style.background=`none`;
        fastForwardButton.style.backgroundColor=`#fff`;
        fastForwardButton.style.cursor=`pointer`;
        fastForwardButton.style.backgroundImage=`url(./resources/images/bg/slow.png)`;
        fastForwardButton.style.backgroundRepeat=`no-repeat`;
        fastForwardButton.style.backgroundPosition=`50% 50%`;
      } else {
        FRAME_RATE=30;
        fastForwardButton.style.background=`none`;
        fastForwardButton.style.backgroundColor=`#fff`;
        fastForwardButton.style.cursor=`pointer`;
        fastForwardButton.style.backgroundImage=`url(./resources/images/bg/fast.png)`;
        fastForwardButton.style.backgroundRepeat=`no-repeat`;
        fastForwardButton.style.backgroundPosition=`50% 50%`;
      }
    },false);
  }
  //load wall stuff
  loadWallImage(){
    // grab the wall image from the buttons stprite sheet
   var propName =  "Block0000";
   var f = buttonsJSON.frames[propName].frame;
  // console.log(f.x);
   Cell.wallImage = f;

  }


  loadEnemyImages(){
    var enemyData = [];


    for (var i = 1; i <= 5; i++){
      var propName = "E" + i + "0000";
      var f = jsonx.frames[propName].frame;
   
 
    this.enDa.push(f);

    }


   }


  hideImgElement() { this.style.display = "none"; }

  run() { 

    if (!this.paused){
    this.level.run()
    this.updateFireRateSliders();
    this.updateDamageSliders();
    this.updateTileDivs();
  }

  }


  pause(){
    var butt = document.getElementById('pauseButton');
  towerGame.paused = !towerGame.paused;
  if (towerGame.paused){
     butt.style.background=`none`;
     butt.style.backgroundColor=`#fff`;
     butt.style.backgroundImage=`url(./resources/images/bg/playb.png)`;
     butt.style.backgroundRepeat=`no-repeat`;
     butt.style.backgroundPosition=`48% 50%`;
  } 
  if (!towerGame.paused){
     butt.style.background=`none`;
     butt.style.backgroundColor=`#fff`;
     butt.style.backgroundImage=`url(./resources/images/bg/pause.png)`;
     butt.style.backgroundRepeat=`no-repeat`;
     butt.style.backgroundPosition=`48% 50%`;
  }
}



  render() { // draw game stuff
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);

  }

      

  brushfire(undo) { 
    for(var i = 0; i < this.cols; i++){
      for(var j = 0; j < this.rows; j++){
        var cell = this.grid[i][j];
        cell.dist = this.cols * this.rows * 10;   
        cell.vec = null;   
        cell.parent = 0;   
        cell.addNeighbors(this,  this.grid); 
      }
    }
   
    this.root.dist = 0;
    this.root.occupied = false; 
    var queue = [this.root];

    while(queue.length) {
        var current = queue.shift();  
        for(let j =0; j < current.neighbors.length; j++){
            let neighbor = current.neighbors[j];
            var dist = current.dist+10; 
            if(current.loc.x != neighbor.loc.x && current.loc.y != neighbor.loc.y)
                dist = current.dist+14; 
          
            if(neighbor.dist > dist) {
                neighbor.parent = current;
                neighbor.dist = dist;
                queue.push(neighbor);
                }
          }     
        }  
    if(!this.validMap()){
      if(undo){
          undo()
          this.brushfire()
      }else{
      
        for(let i = 0; i < this.enemies.length;  i++) {
            let enemy = towerGame.enemies[i];
            if(!enemy.currentCell.parent)
                enemy.kill = true;   
            }
            console.log("brushfire created an invalid map and no undo was inputed")

      }
    }


    }
    validMap() {
      for (var k=0;k<=9;k++){
        if(this.grid[0][k].wall || this.grid[0][k].hasTower){
          return false;
      }
      }
        for(var i = 0; i < this.cols; i++){
          for(var j = 0; j < this.rows; j++){
            var cell = this.grid[i][j];
            if(!cell.parent && !(cell.occupied || cell.hasTower)&& cell!=this.root){
              return false;

            }
          }
        }
        return true;
      }
    
    
    undo(cell,tower) {
      if(tower){
        return function() {
          cell.hasTower=false;
          towerGame.towers.splice(towerGame.towers.indexOf(tower))
          alert("you cannot place a tower here")
        }
      }else{
        return function() {
          if (cell.occupied){
            cell.occupied = false;
            cell.wall = false;
            let gPos = cell.getGridPos();
            if(towerGame.grid[gPos.x][gPos.y - 1] && !towerGame.grid[gPos.x][gPos.y - 1].wall && towerGame.grid[gPos.x][gPos.y - 1].occupied){
              towerGame.grid[gPos.x][gPos.y - 1].occupied = false;
            }
            if(towerGame.grid[gPos.x][gPos.y + 1] && !towerGame.grid[gPos.x][gPos.y + 1].wall && towerGame.grid[gPos.x][gPos.y + 1].occupied){
              towerGame.grid[gPos.x][gPos.y + 1].occupied = false;
            }
            towerGame.bankValue += towerGame.wallCost;
          } else {
            cell.occupied = true;
            towerGame.bankValue -= towerGame.wallCost;
          }
          alert("performing that action would create an invalid grid")
        }
      }
    }

    sendEnemies() {
        var numEnemies = Math.random() * 5;     
        var row, col, startCell, i, j;
        for( i = 0; i < numEnemies; i++) {
            for(j = 0; j < 3; j++) { 
                startCell = this.grid[0][0];
                if(startCell && startCell.parent)
                    break;
                }
            if(j < 3) { 
                let randomPath = Math.floor(Math.random() * 2);   
                this.enemies.push(new Enemy(this, startCell, randomPath));
                }
            }
    }
    controlWaves() {
      if(this.wave.isWaveOver()){
        this.currentWaveNum+=1
        this.wave=new Wave(this,AllWaves[this.currentWaveNum])
      }else{
        this.wave.run()
      }
    }
  
    removeEnemies() {
      for(let i = this.enemies.length-1; i >= 0; i--) {
        if(this.enemies[i].kill)
            this.enemies.splice(i,1); 

        }
    }

  removeBullets(){
    if(this.bullets.length < 1) return;
    for(let i = this.bullets.length-1; i >= 0; i--){

       if( this.bullets[i].loc.x < 0 ||
           this.bullets[i].loc.x > this.canvas.width ||
           this.bullets[i].loc.y < 0 ||
           this.bullets[i].loc.y > this.canvas.height ){
             this.bullets.splice(i, 1);
           }

    }
  }
  updateInfoElements(time){
    let infoElements = document.getElementById('infoDiv').getElementsByClassName('infoTileDiv');
    for(let i = 0; i < infoElements.length-1; i++){
      let info = infoElements[i];
      if(i==0){
        info.innerHTML = '<br/>';
        var value = document.createElement('p');
        value.style.fontSize = '12pt';
        value.innerHTML = this.bankValue;
        info.appendChild(value)
        if(this.bankValue < 0){
          this.bankValue == 0;
        }
      }else if(i==2){
        info.innerHTML = '<br/>';
        var value = document.createElement('p');
        value.style.fontSize = '12pt';
        value.innerHTML = time;
        info.appendChild(value);
      }
      if(i==3){
        info.innerHTML = '<br/>';
        var value = document.createElement('p');
        value.style.fontSize = '12pt';
        value.innerHTML = this.score;
        info.appendChild(value);
      }
      if(i==1){
        info.innerHTML = 'Wave <br/>';
        var value = document.createElement('p');
        value.style.fontSize = '12pt';
        value.innerHTML = this.wave.waveJson.name;
        info.appendChild(value);
      }
      if(i==4){
        info.innerHTML = '<br/>';
        var value = document.createElement('p');
        value.style.fontSize = '12pt';
        value.innerHTML = this.health;
        info.appendChild(value);
      }
    }
  }
  updateCostInfoElement(value) {
  let infoElements = document.getElementById('infoDiv').getElementsByClassName('infoTileDiv');
  let info = infoElements[infoElements.length-3];
  info.style.backgroundImage=`url(./resources/images/bg/cost.png)`;
  info.style.backgroundRepeat=`no-repeat`;
  info.style.backgroundPosition=`50% 30%`;
  info.style.fontFamily=`Game-Font`;
  info.innerHTML = '<br/> <br/>' + value;
  
  }

  updateGameTime(){
    var millis = Date.now();
    if(millis - this.lastTime >= 1000 ) {
      this.gameTime++;
      this.lastTime = millis;
    }
    return this.gameTime;
  }

  loadGrid(){
    for(var i = 0; i < this.cols; i++){    
      this.grid[i] = [];
      for(var j = 0; j < this.rows; j++){
        this.grid[i][j] = new Cell(this, vector2d((i*this.w), (j*this.w)), ++cellId);

      }
    }

  }  

  createTowerBitmaps(ssImage, mtd, index){
      if (!ssImage || !bsImage.complete){
          alert("Images not loaded");
      }
      var propertyName = "T" + (index+1) + "0000";
      var frame = jsonx.frames[propertyName].frame;
      var bulletPropertyName = "p" + (index+1) + "0000";
      var bulletFrame = jsonx.frames[bulletPropertyName].frame;
      this.towImgData.push(frame);
      this.bulletImgData.push(bulletFrame);
     mtd.cnvTurImg = this.towImgData[index];
      mtd.cnvBulImg = this.bulletImgData[index];

    }
  printSliderData(){
    console.log("Tower1 Shoot Speed: " + slider1.value);
  }

  createFireRateSilder(){
    var towers = [];
    for(var i = 0; i < 4; i++){
      var sl = document.createElement('input');
      sl.setAttribute('type', 'range');
      sl.setAttribute('min', '50');
      sl.setAttribute('max', '3000');
      if(i == 0){
          sl.setAttribute('value', '700');
      } else if( i == 1) {
          sl.setAttribute('value', '200');
      } else if(i == 2){
        sl.setAttribute('value', '2500');
      } else if (i ==3) {
        sl.setAttribute('value', '700');

      }

      //sl.setAttribute('value', '1000');
      sl.setAttribute('id', 'slider1');

    var CoolDownSliderText = document.createElement('div');
    CoolDownSliderText.id = "cd";
	  CoolDownSliderText.innerHTML = 'Tower ' + (i+1) + ' Cool Down: ' + sl.value;
	  CoolDownSliderText.style.color = '#ffffff';
	  sliderDiv.appendChild(CoolDownSliderText);
    sliderDiv.appendChild(sl);
    this.fireSliders.push(sl);
    this.fireSlidersText.push(CoolDownSliderText);
  }
}

  createDamageSliders(){
    for(var i = 0; i < 5; i++){
      var dmgSlider = document.createElement("input");
      dmgSlider.setAttribute('type', 'range');
      dmgSlider.setAttribute('min', '5');

      dmgSlider.setAttribute('id', 'slider2');
      if(i == 0){
        dmgSlider.setAttribute('max', '1000');
        dmgSlider.setAttribute('value', '500');
      } else if( i == 1) {
        dmgSlider.setAttribute('max', '1000');
        dmgSlider.setAttribute('value', '400');
      } else if(i == 2){
        dmgSlider.setAttribute('max', '1750');
        dmgSlider.setAttribute('value', '1200');
      } else if (i ==3) {
        dmgSlider.setAttribute('max', '400');
        dmgSlider.setAttribute('value', '100');
      } else {
        dmgSlider.setAttribute('max', '80');
        dmgSlider.setAttribute('value', '20');
      }

      var dmgSliderText = document.createElement('div');
      dmgSliderText.id = "dmg";
      dmgSliderText.innerHTML = 'Tower ' + (i + 1) +' Damage: ' + dmgSlider.value;
      dmgSliderText.style.color = '#ffffff';
      sliderDiv.appendChild(dmgSliderText);
      sliderDiv.appendChild(dmgSlider);
      this.dmgSliders.push(dmgSlider);
      this.dmgSlidersText.push(dmgSliderText);


    }
  }

  createTowerCostSliders(){
    for(var i = 0; i < 5; i++){
      var costSlider = document.createElement("input");
      costSlider.setAttribute('type', 'range');
      costSlider.setAttribute('min', '100');
      costSlider.setAttribute('max', '1500');
      costSlider.setAttribute('id', 'slider3');
      if(i == 0){
        costSlider.setAttribute('value', '200');
      } else if( i == 1) {
        costSlider.setAttribute('value', '500');
      } else if(i == 2){
        costSlider.setAttribute('value', '500');
      } else if (i ==3) {
        costSlider.setAttribute('value', '700');
      } else {
        costSlider.setAttribute('value', '1000');
      }
      if(i == 5) {
        costSlider.setAttribute('type', 'range');
        costSlider.setAttribute('min', '10');
        costSlider.setAttribute('max', '100');
        costSlider.setAttribute('value', '20');
      }
      var costSliderText = document.createElement('div');
      costSliderText.id = "cost";
      costSliderText.innerHTML = 'Tower ' + (i + 1) +' Cost: ' + costSlider.value;
      costSliderText.style.color = '#ffffff';
      sliderDiv.appendChild(costSliderText);
      sliderDiv.appendChild(costSlider);
      this.costSliders.push(costSlider);
      this.costSlidersText.push(costSliderText);
    }
  }

  createEnemyDeathValueSlider(){
    var bankInc = document.createElement("input");
    bankInc.setAttribute('type', 'range');
    bankInc.setAttribute('min', '1');
    bankInc.setAttribute('max', '75');
    bankInc.setAttribute('id', 'slider4');
    var text = document.createElement('div');
    text.id = "inc";
    text.innerHTML = 'Money Given After Kill ' + bankInc.value;
    text.style.color = '#ffffff';
    sliderDiv.appendChild(text);
    sliderDiv.appendChild(bankInc);
    this.bankIncValue = bankInc;
    this.textBankInc = text;
  }

  updateDamageSliders(){
    for(var i = 0; i < 5; i++){
      this.dmgSlidersText[i].innerHTML = 'Tower ' + (i+1) +' Damage: ' + this.dmgSliders[i].value;

    }
    for(var i = 0; i < 5; i++){
        this.costSlidersText[i].innerHTML = 'Tower ' + (i+1) + ' Cost: ' + this.costSliders[i].value;
    }
    this.textBankInc.innerHTML = 'Money After Kill ' + this.bankIncValue.value;
  }

  updateFireRateSliders(){
    for(var i = 0; i < 4; i++){
      this.fireSlidersText[i].innerHTML = 'Tower ' + (i+1) + ' Cool Down: ' + this.fireSliders[i].value;
    }
  }

  updateTileDivs(){
    for(var i = 0; i < 5; i++){
        this.towersBankValuesARR[i].cost = this.costSliders[i].value;
    }
  }

  createTileDivs(){
    var tiles = [];
    var buttons = ["B10000", "B20000", "B30000", "B40000", "B50000", "B60000"];
    
    for(var i = 0; i < 5; i++){
      var mtd = document.createElement("div");
      if(i == 0){
      mtd.ability = "normal";
      mtd.cost = this.costSliders[0].value;

    } else if(i == 1){
      mtd.ability = "fast";
      mtd.cost = this.costSliders[1].value;

    } else if(i == 2){
      mtd.ability = "freeze";
      mtd.cost = this.costSliders[2].value;

    } else if(i == 3){
      mtd.ability = "explosive";
      mtd.cost = this.costSliders[3].value;

    } else {
      mtd.ability = "ray";
      mtd.cost = this.costSliders[4].value;
    }// createDiv("");

      var b = buttons[i];
      var button = buttonsJSON.frames[b].frame;

      var innerDiv = document.createElement("div");
      innerDiv.id = "innerDiv" + i;
      innerDiv.style.width = "90px";
      innerDiv.style.height = "90px";
      innerDiv.style.backgroundImage = "url(resources/images/spritesheets/buttons.png)";
      innerDiv.style.backgroundPosition = `${-button.x}px ${-button.y}px`;
      innerDiv.style.margin = "5px";
      mtd.appendChild(innerDiv);

      document.getElementById("menuDiv").appendChild(mtd);


      mtd.id = 'towImgDiv' + i;
      tiles.push(mtd);
      this.towersBankValuesARR.push(mtd);
      this.createTowerBitmaps(ssImage, mtd,i)

    }
    return tiles;

  }

  getBankValue(){
    return this.bankValue;
  }

  canAddTower(cell) {

    if(towerGame.placingTower) {
        if(!cell.wall && !cell.hasTower && cell != towerGame.root){
          return true;
        }
      return(false);
    }
  }

  createTower(mtd) { 
  
    if(this.bankValue >= mtd.cost){
      var tower = new Tower( mtd.cost, mtd.cnvTurImg, mtd.cnvBulImg, mtd.ability);
 
      if(tower) {
        this.towers.push(tower); 
        return(true);
        }
      else {
        println('failed to make tower');
      }
    }
    else alert("Insufficient Funds!");
    return(false);
  }

  placeTower(cell) {
  
    towerGame.towers[towerGame.towers.length-1].loc = cell.center.copy();
    towerGame.towers[towerGame.towers.length-1].placed = true;
    cell.hasTower = true;
    towerGame.placingTower = false;
    towerGame.brushfire(towerGame.undo(cell,towerGame.towers[towerGame.towers.length-1]));  
  }

  loadDOMCallBacks(menuTiles) {
    for (var i = 0; i < menuTiles.length; i++) {
        var mtd = menuTiles[i];
        mtd.addEventListener('mouseover',this.tileRollOver,false);
        mtd.addEventListener('mouseout', this.tileRollOut, false);
        mtd.addEventListener('mousedown', this.tilePressed, false);
        mtd.addEventListener('click', this.tileClicked, false);
    }

  }

  tileRollOver() {
    this.style.backgroundColor = '#f7e22a';
    towerGame.updateCostInfoElement(this.cost);
  }

  tileRollOut() {
    this.style.backgroundColor = '#DDD';
    towerGame.updateCostInfoElement("");
  }

  tilePressed() {
    this.style.backgroundColor = '#900';
  }

  tileClicked() {
    if(towerGame.placingTower === true) return;
    if(towerGame.createTower(this))
        towerGame.placingTower = true;



  }
  handleCNVMouseOver() {
    if(towerGame.towers.length < 1) return;
    towerGame.towers[towerGame.towers.length-1].visible = true;
  }

  handleCNVMouseMoved(event) {
    this.mouseX = event.offsetX;
    this.mouseY = event.offsetY;
    if(towerGame.towers.length < 1) return;
    if(!towerGame.towers[towerGame.towers.length-1].placed &&
      towerGame.placingTower === true ){
       
        towerGame.towers[towerGame.towers.length-1].loc.x = this.mouseX;
        towerGame.towers[towerGame.towers.length-1].loc.y = this.mouseY;
      }
  }

  handleCNVMouseClicked(event) {
    var row = Math.floor(event.offsetY/towerGame.w);
    var col = Math.floor(event.offsetX/towerGame.w);
    var cell = towerGame.grid[col][row];

    if(towerGame.placingTower && towerGame.canAddTower(cell)){
      towerGame.placeTower(cell);
    }

    else if(!towerGame.placingTower && !cell.hasTower) {
      
        if (!cell.wall && towerGame.bankValue >= towerGame.wallCost){
            towerGame.bankValue -= towerGame.wallCost;
            if(row > 0){
              towerGame.grid[col][row - 1].occupied = true;
            }
            if(row < 14){
              towerGame.grid[col][row + 1].occupied = true;
            }
            cell.occupied = true;
            cell.wall = true;
        } else if(!cell.wall) {
            alert("Insufficient Funds!");
            }
        else {
            towerGame.bankValue += towerGame.wallCost;
            cell.occupied = false;
            cell.wall = false;
        }
        towerGame.brushfire(towerGame.undo(cell));  
        }
  }


  distance(c0, c1){
      this.x0 = c0.x;
      this.y0 = c0.y;
      this.x1 = c1.x;
      this.y1 = c1.y;

      var dx = this.x1 - this.x0;
      var dy = this.y1 - this.y0;

      return Math.sqrt(dx * dx + dy * dy);

    }

    distanceXY(x0, y0, x1, y1){
      var dx = x1 - x0;
      var dy = y1 - y0;

      return Math.sqrt(dx * dx + dy * dy);
    }

    inRange(value, min, max){
      return value >= Math.min(min, max) && Math.max(min, max) <= Math.max(min, max);
    }

    circleCollision(loc1, loc2, rad1, rad2){
      if(this.distance(loc1, loc2) <= rad1 + rad2){
        return true;
      }
    }

    circlePointCollision(x, y, circx, circy, radius){
      if(this.distanceXY(x, y, circx, circy) < radius){
        return true;
      }
    }

    range(min0, max0, min1, max1){
      return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1);
    }

    rectangleCollision(loc1, rectWidth1, rectHeight1, loc2, rectWidth2, rectHeight2){
      if(this.range(loc1.x, loc1.x + rectWidth1, loc2.x, loc2.x + rectWidth2) &&
      this.range(loc1.y, loc1.y + rectHeight1, loc2.y, loc2.y + rectHeight2)){
    return true;
  }
    }


} 

