function Sprite(){
  this.x = 0;
  this.y = 0;
  this.gx = -1;
  this.gy = -1;
  this.vx = 0;
  this.vy = 0;
  this.ay = 0;
  this.grav = 0;
  this.SIZE = 16;
  this.pose = 0;
  this.frame = 0;
  this.tempo = 150;
  this.poses = [
    {row: 11, col:1, frames:8, v: 4},
    {row: 10, col:1, frames:8, v: 4},
    {row: 9, col:1, frames:8, v: 4},
    {row: 8, col:1, frames:8, v: 4},
    {row: 11, col:0, frames:1, v: 4},
  ];
  this.images = null;
  this.imgKey = "pc";
}

Sprite.prototype.desenhar = function (ctx) {
  this.desenharQuadrado(ctx);
  this.desenharPose(ctx);
}

Sprite.prototype.desenharQuadrado = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  //ctx.fillRect(-this.SIZE/2, -this.SIZE/2, this.SIZE, this.SIZE);
  ctx.arc(0, 0, this.SIZE/2, 0, 2*Math.PI);
  ctx.fill();
  ctx.closePath;
  ctx.restore();
};

Sprite.prototype.desenharPose = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  this.images.drawFrame(ctx,
    this.imgKey,
    this.poses[this.pose].row,
    Math.floor(this.frame),
    -32,-56, 64
  );
  ctx.restore();
};



Sprite.prototype.mover = function (map, dt) {
  this.gx = Math.floor(this.x/map.SIZE);
  this.gy = Math.floor(this.y/map.SIZE);
  
  if(map.cells[this.gy][this.gx] == 2) {
	map.cells[this.gy][this.gx] = 0;
	map.tesouros--;
  }
  this.tempo-=2*dt;
	this.vy = (this.ay+this.grav)*20*dt;
	var yAnterior = this.y;
  
  if(this.vx>0 && map.cells[this.gy][this.gx+1]==1){
    this.x += Math.min((this.gx+1)*map.SIZE - (this.x+this.SIZE/2),this.vx*dt);
	
  } else if(this.vx <0 && map.cells[this.gy][this.gx-1]==1){
      this.x += Math.max((this.gx)*map.SIZE - (this.x-this.SIZE/2),this.vx*dt);

	}
  else {
    this.x = this.x + this.vx*dt;
  }
  if(this.vy >0 && map.cells[this.gy+1][this.gx]==1){
	var v = Math.min((this.gy+1)*map.SIZE - (this.y+this.SIZE/2),this.vy*dt);
    this.y += v;
  } else if( this.vy<0 && map.cells[this.gy-1][this.gx]==1){
	  var v = Math.max((this.gy)*map.SIZE - (this.y-this.SIZE/2),this.vy*dt);
      this.y += v;
	  if(v == 0) { // zera aceleraçao se bater no teto
			this.ay = 0;
	  }
	}
	
  else {
    this.y = this.y + this.vy*dt;
  }
  if(this.y == yAnterior) {
	this.podePular = true;
  } else {
	this.podePular = false;
  }
  if(this.ay < 200) {
	this.ay+=this.grav*2*dt;
  }
};


