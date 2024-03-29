'use strict'

class Bullet{

  constructor(location, bImg, angle, type){
    
    this.loc = location;
    this.speed = 25;
    this.r=3;
    this.shape="circle"
    this.angle = angle;
    this.img = bImg;
    this.ability=type
    if(this.ability == "freeze"){
      this.speed = 80;
    }
  }

  run(){
    this.render();
    this.update();
  }
  render(){

    var ctx = towerGame.context;
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.angle+Math.PI/2);

    ctx.drawImage(ssImage,this.img.x, this.img.y, this.img.w, this.img.h, 0, 0, this.img.w, this.img.h);

    ctx.restore();
  }

  update(){
    this.loc.y += Math.sin(this.angle)*this.speed;
    this.loc.x += Math.cos(this.angle)*this.speed;

  }
}
