class LockOn{

  constructor(locationOne, locationTwo){
    this.loc = locationOne;
    this.targetLoc = locationTwo;

  }

  run(){
    this.render();
    this.update();
  }
  render(){
    var ctx = towerGame.context;

    ctx.beginPath();
    ctx.moveTo(this.loc.x, this.loc.y);
    ctx.lineTo(this.targetLoc.x, this.targetLoc.y);
    ctx.strokeStyle = '#e806a7';
    ctx.stroke();

  }

  update(){


  }
}
