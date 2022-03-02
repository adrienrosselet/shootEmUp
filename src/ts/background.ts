export default class Background{
  gameWidth: number;
  gameHeight: number;
  numberOfStars: number;
  maxSize: number;
  arrayStars: {x: number, y:number, d: number}[];
  constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.numberOfStars = 20;
    this.maxSize = 10;
    this.arrayStars = Array.from({length: this.numberOfStars},()=>{
      return {
        x: Math.random()*this.gameWidth,
        y: Math.random()*this.gameHeight,
        d: Math.random()*this.maxSize
      };
    });
  }
  draw(ctx){
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    this.arrayStars.forEach(e => {
      ctx.fillRect(e.x, e.y, e.d, e.d);
    });
  }
  update(timeDiff){
    this.arrayStars.forEach(e => {
      e.x -= 1/(this.maxSize-e.d+1);
      if(e.x <0) e.x = this.gameWidth;
    });
  }
}
