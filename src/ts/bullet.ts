export default class Bullet {
  position: { x: number; y: number; };
  gaW: number;
  gaH: number;
  size: number;
  speedNorm: number;
  speed: { x: number; y: number; };
  delete: boolean;
  constructor(game){
    this.position = {
      x: game.gun.position.x + Math.cos(game.gun.angle)*game.gun.gunLength,
      y: game.gun.position.y + Math.sin(game.gun.angle)*game.gun.gunLength
    }
    this.gaW = game.gameWidth;
    this.gaH = game.gameHeight;
    this.size = 3;
    this.speedNorm = 0.3;
    this.speed = {
      x: Math.cos(game.gun.angle) * this.speedNorm,
      y: Math.sin(game.gun.angle) * this.speedNorm
    }
    this.delete = false;
  }
  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, Math.PI*2, 0, false);
    ctx.fillStyle = '#ff9393';
    ctx.fill();
    // ctx.stroke();
  }
  update(timeDiff){
    this.position.x += this.speed.x * timeDiff;
    this.position.y += this.speed.y * timeDiff;
    if( this.position.x > this.gaW || this.position.x < 0 || this.position.y < 0 || this.position.y > this.gaH){
      this.delete = true;
    }
  }
}
