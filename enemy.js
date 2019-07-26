class Enemy {

  constructor(game) {
    this.game = game;
    this.currentCell = this.game.grid[0][Math.floor(Math.random()*10)];
    this.loc = this.currentCell.center.copy();
    this.randomPath =1;  
    this.radius = 20.0;
    this.r = 15.0;
    this.vel = 3.0;
    this.sound;
    this.isLocked = false;
    this.initialVel = 1.8;
    this.isTarget= false;
    this.deathSound = new Audio('resources/sounds/splat.mp3');
    this.damageSound=new Audio('resources/sounds/damage.mp3');
    this.hitSound=new Audio('resources/sounds/bullet2.mp3');
    this.thunderSound=new Audio('resources/sounds/thunder.wav');
    this.gunSound=new Audio('resources/sounds/gun.wav');
    this.lazerSound=new Audio('resources/sounds/lazer.wav')
    this.lastTime = Date.now();
    this.coolDown = 1000;
    this.towerLoc =  vector2d(0, 0);
    this.velVec;
    this.increasedDamg = 20;
 
    this.slowVel= this.initialVel - .8;
     
      this.damages = 0;
    this.vel = 3.0;     
    this.targetCell = this.nextTarget();
    this.target =  this.targetCell.center;
    this.shape = "circle";
    var targetVec = this.target.copy().sub(this.loc);
    this.velVec = targetVec.copy().normalize().scale(this.vel);      
    this.kill = false;
    this.angle=this.velVec.angle()

     this.img = Enemy.image3;

    this.frame = 0;

    this.offset = 0.01;
  }

  run() {
    this.update();
    this.render();
  }

 
  nextTarget() {
    if(!this.randomPath)
        return(this.currentCell.parent);   
    else {  
        let candidates = [];
        for(let i = 0; i < this.currentCell.neighbors.length; i++) {
            if(this.currentCell.neighbors[i].dist < this.currentCell.dist)
                candidates.push(this.currentCell.neighbors[i]);
            }
       
        return(candidates[Math.floor(Math.random() * candidates.length)]);
        }
    }

  
  render() {
    
    var ctx = this.game.context
    ctx.save();

    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.angle + Math.PI/2);

    ctx.drawImage(ssImage,this.img.x, this.img.y, this.img.w, this.img.h, 0, 0, this.img.w, this.img.h);
    ctx.restore();
  }

    
  update() {
    
    let millis = Date.now();
    for(let h = 0; h < towerGame.bullets.length; h++){
         
      if(this.checkCollide(this, towerGame.bullets[h])){
        if(towerGame.bullets[h].ability == "normal"){
          this.sound=this.deathSound.cloneNode();
          this.sound.play();
         
          this.health = this.health - towerGame.dmgSliders[0].value;
          
          towerGame.bullets.splice(h, 1);
        } else if(towerGame.bullets[h].ability == "fast"){
          this.sound=this.hitSound.cloneNode();
          this.sound.volume=0.1;
          this.sound.play();
          this.health = this.health - towerGame.dmgSliders[1].value; //450
        //  console.log(this.health)
          towerGame.bullets.splice(h, 1);
        }else if(towerGame.bullets[h].ability == "freeze"){
          this.sound=this.thunderSound.cloneNode();
          this.sound.volume=0.3;
          this.sound.play();
          this.health =parseInt(this.health) - parseInt(towerGame.dmgSliders[2].value);
          console.log(this.health); 
          //console.log("asdfasdfa");
        //  this.vel = this.initialVel - .8;
        }else if(towerGame.bullets[h].ability == "explosive"){
          this.sound=this.gunSound.cloneNode();
          this.sound.play();
          this.health = this.health - 50;
          //this.health = this.health - 10;
          if(this.health <= 0){
            this.kill = true;
          }
          this.locations = this.loc;
          towerGame.explosiveBullets.push(new Explosives(towerGame.bullets[h].loc));
          console.log(towerGame.explosiveBullets.length);
          //towerGame.explosiveBullets.push(new Explosives(towerGame.bullets[h].loc));
          towerGame.bullets.splice(h, 1);
          //console.log("exp");
        }


    }
  }

  if(this.isLocked){
    console.log(towerGame.dmgSliders[4].value);
    this.damages = parseInt((this.damages),10) +parseInt((towerGame.dmgSliders[4].value),10);//this.increasedDamg;
    this.health = this.health-this.damages;
    console.log(this.damages);
    if(this.damages>=600){
      this.damages=0;
    }
    this.sound=this.lazerSound.cloneNode();
    this.sound.volume=0.1;
    this.sound.play();
  }



    for(let i = 0; i < towerGame.explosiveBullets.length; i++){
      if(this.loc.dist(towerGame.explosiveBullets[i].loc) < 70){
        this.health = this.health - towerGame.dmgSliders[3].value;
      }
      if(towerGame.explosiveBullets[i].kills == true ){
        towerGame.explosiveBullets.splice(i, 1);
      //  console.log("die");
      }
    }




//  console.log(this.health);
if(this.health <= 0){
  this.kill = true;
  
  this.game.score=this.game.score+10;
 // this.deathSound.play();
  //console.log("play");
  var incValue = parseInt(towerGame.bankIncValue.value);

  towerGame.bankValue += incValue;
  //towerGame.bankValue += towerGame.bankIncValue.value;

  //console.log("kills");
}

    if(this.loc.dist(this.target) <= this.vel) {  
        this.currentCell = this.targetCell;
        if(this.currentCell == this.game.root) {  
            this.kill = true;
            this.game.health=this.game.health-10;
            for(var m=0;m<4;m++){
              this.damageSound.play();
            }
            this.game.canvas.canDiv.style.borderColor=`red`;
            this.game.frame = 0;
            
            
            return;
            }
        this.targetCell = this.nextTarget();                 
        if(!this.targetCell) {
            this.kill = true;   
            return;
            }
         this.target = this.targetCell.center;   
        }
   
    var targetVec = this.target.copy().sub(this.loc);   
    var angleBetween = this.velVec.angleBetween(targetVec);
    if(angleBetween) {  
        if(angleBetween > 0 && angleBetween > Math.PI)  
            angleBetween = angleBetween - 2*Math.PI;   
        else if(angleBetween < 0 && angleBetween < -Math.PI) 
            angleBetween = angleBetween = angleBetween + 2*Math.PI;  

        this.velVec.rotate(angleBetween/2);
        this.angle=this.velVec.angle();
        }
    this.loc.add(this.velVec);         
    this.fun();
    if (this.game.frame > 5) {
      this.game.canvas.canDiv.style.borderColor = 'black';
    }

   
    
  }

  fun() {
  }
  checkCollide(shape1, shape2) {

     if(shape1.shape === "circle") {
       if(shape2.shape === "circle") {
         //circle-circle
         //console.log(this.dist(shape1.loc, shape2.loc) );
         if(shape1.r + shape2.r >= shape1.loc.copy().dist(shape2.loc)) return true;
         return false;
       } else if(shape2.shape === "square") {
         //circle-square
         let topLeft = shape2.loc;
         let topRight = new vector2d(shape2.loc.x + shape2.w, shape2.loc.y);
         let bottomRight = new vector2d(shape2.loc.x + shape2.w, shape2.loc.y + shape2.w);
         let bottomLeft = new vector2d(shape2.loc.x, shape2.loc.y +_shape2.w);
         let dist1 = this.dist(topLeft, shape1.loc);
         let dist2 = this.dist(topRight, shape1.loc);
         let dist3 = this.dist(bottomRight, shape1.loc);
         let dist4 = this.dist(bottomLeft, shape1.loc);
         if(dist1 <= shape1.r || dist2 <= shape1.r || dist3 <= shape1.r || dist4 <= shape1.r) return true;
         return false;
        } else if(shape2.shape === "point") {
          //circle-point
          if(shape1.r >= this.dist(shape1.loc, shape2.loc)) return true;
          return false;
        } else {
          throw "shape2 shape not acceptable.";
        }

      } else if(shape1.shape === "square") {
        if(shape2.shape === "circle") {
          //square-circle
          let topLeft = shape1.loc;
          let topRight = new vector2d(shape1.loc.x + shape1.w, shape1.loc.y);
          let bottomRight = new vector2d(shape1.loc.x + shape1.w, shape1.loc.y + shape1.w);
          let bottomLeft = new vector2d(shape1.loc.x, shape1.loc.y + shape1.w);
          let dist1 = this.dist(topLeft, shape2.loc);
          let dist2 = this.dist(topRight, shape2.loc);
          let dist3 = this.dist(bottomRight, shape2.loc);
          let dist4 = this.dist(bottomLeft, shape2.loc);
          if(dist1 <= shape2.r || dist2 <= shape2.r || dist3 <= shape2.r || dist4 <= shape2.r) return true;
          return false;
        } else if(shape2.shape === "square") {
          //square-square
          if (shape1.loc.x < shape2.loc.x + shape2.w &&
            shape1.loc.x + shape1.w > shape2.loc.x &&
            shape1.loc.y < shape2.loc.y + shape2.w &&
            shape1.w + shape1.loc.y > shape2.loc.y) {
              return true;
          }
          return false;
        } else if(shape2.shape === "point") {
          //square-point
        } else {
          throw "shape2 shape not acceptable.";
        }
      } else if(shape1.shape === "point") {
        if(shape2.shape === "circle") {
          //point-circle
          if(shape2.r >= vector2d.dist(shape2.loc, shape1.loc)) return true;
          return false;
        } else if(shape2.shape === "square") {
          //point-square
        } else if(shape2.shape === "point") {
          //point-point
          if(vector2d.dist(shape2.loc, shape1.loc) < 1) return true;
          return false;
        } else {
        throw "shape2 shape not acceptable.";
      }
    } else {
      throw "shape1 shape not acceptable.";
    }

  
  }

} // end class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Enemy1 extends Enemy {
  constructor(game) {
    super(game)
    this.img = game.enDa[0];
    this.health = 1500;
  //  this.img=Enemy.image1
  }
}
class Enemy2 extends Enemy {
  constructor(game) {
    super(game)
  //  this.img=Enemy.image2
  this.img = game.enDa[1];
  this.health =4000;
  }
  
}
class Enemy3 extends Enemy {
  constructor(game) {
    super(game)
  //  this.img=Enemy.image3
    this.img = game.enDa[2];
    this.health=22000
  }

}
class Enemy4 extends Enemy {
  constructor(game) {
    super(game)
    this.img = game.enDa[3];
  //  this.img=Enemy.image4
    this.health=100000
  }
  
}
class Enemy5 extends Enemy {
  constructor(game) {
    super(game)
    this.img = game.enDa[4];
  //  this.img=Enemy.image5
    this.health=1000000000000000000
  }
}
