
class Cell{
  constructor( game, loc, id){
    this.game = game;     
    this.loc = loc;     
    this.center = vector2d(loc.x+(game.w)/2, loc.y+(game.w)/2);
    this.color = 'pink';
    this.id = id;
    this.neighbors = [];
    this.occupied = false;
    this.wall = false;
    this.parent = 0;  
    this.dist = -1;
    this.angle=0;
    this.vec = null;
    this.hasTower = false;
  }

  getGridPos () {
    return new Vector2d(Math.floor(this.center.x / this.game.w), Math.floor(this.center.y / this.game.w));
  }

    // render() --
    // draw cells that are occupied and the root cell
  render(){
    let ctx = this.game.context;
    ctx.strokeStyle = 'white';
 //   ctx.strokeRect(this.loc.x, this.loc.y, this.game.w, this.game.w);
    if(this.wall) {
        ctx.drawImage(bsImage, Cell.wallImage.x, Cell.wallImage.y, Cell.wallImage.w, Cell.wallImage.h, this.loc.x, this.loc.y, this.game.w, this.game.w);
        }
    else if(this == this.game.root) {
      ctx.beginPath();
      ctx.save();
      ctx.translate(this.game.root.loc.x + this.game.w/2,this.game.root.loc.y + this.game.w/2);
      ctx.rotate(this.angle);
      this.angle += 0.15;
      ctx.drawImage(portHole,-25,-25,50,50); 
      ctx.restore();
      ctx.closePath();
      }


    


  }



  addNeighbors(game, grid){
    this.neighbors = [];    
    let col = this.loc.x/game.w;
    let row = this.loc.y/game.w;
    let n,ne,e,se,s,sw,w,nw = null; 

    if(row > 0 ){
          n = grid[col][row-1];
          if(!n.occupied && !n.hasTower)
            this.neighbors.push(n);    //N
        }
    if( col < game.cols-1){
        e = grid[col+1][row];
        if(!e.occupied && !e.hasTower)
        this.neighbors.push(e);    //E
    }
    if(row < game.rows-1){
        s = grid[col][row+1];
        if(!s.occupied && !s.hasTower)
            this.neighbors.push(s);    //S
    }
     if(col > 0){
        w = grid[col-1][row];
        if(!w.occupied && !w.hasTower)
            this.neighbors.push(w);    //W
    }
    if( col < game.cols-1 &&  row > 0){           //  NE
        ne = grid[col+1][row-1];
        if(!ne.occupied && !ne.hasTower && !(n && (n.occupied || n.hasTower) && e && (e.occupied || e.hasTower))){
            this.neighbors.push(ne);
            }
    }
     if(col < game.cols-1 &&  row < game.rows-1){      //  SE
        se = grid[col+1][row+1];
        if(!se.occupied && !se.hasTower && !(e && (e.occupied || e.hasTower) && s && (s.occupied || s.hasTower))){
            this.neighbors.push(se);
            }
    }
    if(col > 0 &&  row < game.rows-1 ){             //  SW
        sw = grid[col-1][row+1];
        if(!sw.occupied && !sw.hasTower && !(s && (s.occupied || s.hasTower) && w && (w.occupied || w.hasTower))){
            this.neighbors.push(sw);
            }
    }
    if(col > 0 && row > 0){                     //  NW
        nw = grid[col-1][row-1];
        if(!nw.occupied && !nw.hasTower && !(w && (w.occupied || w.hasTower) && n && (n.occupied || n.hasTower))){
            this.neighbors.push(nw);
            }
        }
  }

    
  getVector(){
    if(this.parent) {
        let dx = this.parent.loc.x - this.loc.x;
        let dy = this.parent.loc.y - this.loc.y;
        let v = new vector2d(dx, dy);
        return v;
        }
    else return(vector2d(0,0));
  }

  getText(){

    var context = this.game.context;
    context.save();
    context.fillStyle = "white";
    context.font = "14px sans-serif";
    context.fillText(""+this.dist, this.loc.x+.2*this.game.w/2, this.loc.y+this.game.w/2 - 5);
    context.fillStyle = "black";
    context.fillText(""+this.id, this.loc.x+.2*this.game.w/2, this.loc.y+this.game.w/2 +15);
   

    context.restore();
  }



}
