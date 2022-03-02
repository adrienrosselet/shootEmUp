export default class Invader {
  gameHeight: number;
  position: { x: number; y: number; };
  gaW: number;
  size: number;
  speedNorm: number;
  speedDir: number;
  speed: { x: number; y: number; };
  delete: boolean;
  explode: boolean;
  game: any;
  color: string;
  colorNum: number;
  constructor(game){
    this.gameHeight = game.gameHeight;
    this.position = {
      x: game.gameWidth,
      y: game.gameHeight * Math.random()
    }
    this.gaW = game.gameWidth;
    this.size = 20;
    this.speedNorm = 0.1;
    this.speedDir = Math.random() * Math.PI + Math.PI/2;
    this.speed = {
      x: this.speedNorm*Math.cos(this.speedDir),
      y: this.speedNorm*Math.sin(this.speedDir)
    }
    this.delete = false;
    this.explode = false;
    this.game = game;
    this.color = '#406393';
    this.colorNum = 93;
  }
  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, Math.PI*2, 0, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    // ctx.stroke();
  }
  update(timeDiff){
    this.speedDir += (Math.random()-0.5)/3;
    if(this.speedDir > Math.PI*3/2){
      this.speedDir = Math.PI*3/2;
    } else if(this.speedDir < Math.PI/2){
      this.speedDir = Math.PI/2;
    }
    this.speed = {
      x: this.speedNorm*Math.cos(this.speedDir),
      y: this.speedNorm*Math.sin(this.speedDir)
    }
    this.position.x += this.speed.x * timeDiff;
    this.position.y += this.speed.y * timeDiff;
    if( this.position.x < 0-this.size){
      this.delete = true;
      // this.game.lives--;
    }
    if(this.position.y > this.gameHeight-this.size || this.position.y < this.size){
      this.speedDir = 2 * Math.PI - this.speedDir
    }
    if(this.explode === true){
      this.size++;
      this.colorNum++;
      this.color = '#4063'+ this.colorNum.toString();
      if(this.size > 60){
        this.delete = true;
        this.colorNum = 93;
      }
    }
  }
}
