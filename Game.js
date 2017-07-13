var canvas;
var ctx;
var pc;
var dt;
var images;
var anterior = 0;
var frame = 0;
var levels = [];
var levelAtual = 1;
var cont = 2;

function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 800;
  canvas.height = 480;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images.load("pc","pc.png");
  var map1 = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map1.images = images;
  map1.setCells([
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,0,0,1,0,0,0,1,1,1,1,0,1,0,0,0,0,0,0,1],
    [1,1,1,0,1,0,1,0,2,2,1,0,0,2,0,1,1,0,2,1],
    [1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,1],
    [1,0,1,1,1,1,0,1,1,0,0,1,1,1,1,0,1,0,0,1],
    [1,0,1,2,0,0,0,0,0,0,1,0,0,0,0,0,2,1,0,1],
    [1,0,0,0,0,1,0,0,1,1,1,0,1,2,1,1,1,2,0,1],
    [1,0,1,1,1,2,0,1,1,0,0,0,0,0,0,0,1,0,1,1],
    [1,2,1,0,0,0,0,0,0,0,1,1,1,2,1,0,0,0,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]);
  
  levels.push(map1);
  pc = new Sprite();
  pc.x = 60;
  pc.y = 60;
  pc.tempo = 100;
  pc.grav = 100;
  pc.podePular = false;
  pc.images = images;
  initControls();
  requestAnimationFrame(passo);
}

function desenhaInfo() {
	if(pc.tempo < 0) {
		this.ctx.font = "50px Arial";
		this.ctx.fillStyle = "red";
		this.ctx.fillText("Voce perdeu!", 50, canvas.height/2);
	}
	if(levels[levelAtual-1].tesouros <= 0) {
		this.ctx.font = "50px Arial";
		this.ctx.fillStyle = "green";
		this.ctx.fillText("Voce venceu! Parabéns", 50, canvas.height/2);
	}
  this.ctx.font = "15px Arial";
  this.ctx.fillStyle = "orange";
  this.ctx.fillText("Tempo: ", 17, 17);
  this.ctx.fillRect(80, 0,pc.tempo+1,20);
  this.ctx.fillText("Tesouros restantes: " + levels[levelAtual-1].tesouros, 200, 17);
}

function passo(t){
  dt = (t-anterior)/1000;
  requestAnimationFrame(passo);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate((canvas.width/2)-2*pc.x,(canvas.height/2)-2*pc.y);
  ctx.scale(2,2);
  
  
  if(pc.tempo > 0 && levels[levelAtual-1].tesouros > 0) {
	pc.mover(levels[levelAtual-1], dt);
  }
  
  levels[levelAtual-1].desenhar(ctx);
  pc.desenhar(ctx);

  ctx.restore();
  desenhaInfo();
  anterior = t;
}


function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
      case 37:
        pc.vx = -100;
        pc.pose = 2;
        e.preventDefault();
        break;
      case 38:
        e.preventDefault();
        break;
      case 39:
        pc.vx = 100;
        pc.pose = 0;
        e.preventDefault();
        break;
      case 40:
        e.preventDefault();
        break;
      default:

    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
	  case 32:
		if(pc.podePular) {
		    pc.pose = 3;
			pc.ay = -400;
		}
	  break;
      case 37:
		pc.vx = 0;
		break;
      case 39:
        pc.vx = 0;
        break;
      case 38:

		break;
      case 40:

        break;
      default:

    }
  });
}
